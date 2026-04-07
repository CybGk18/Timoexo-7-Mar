d:\Cybaemtech\imoexo-10am-14Nov\imoexo-10am-14Nov\client\src\admin\pages\ContentEditor.tsximport { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RichTextEditor } from '../components/RichTextEditor';
import { toast } from 'sonner';
import { api } from '../services/api';
import {
    Save,
    Eye,
    ArrowLeft,
    Upload,
    X,
    Plus
} from 'lucide-react';

interface BlogPost {
    id?: number;
    title: string;
    excerpt: string;
    content: string;
    status: 'published' | 'draft';
    type: string;
    author: string;
    featured_image: string;
    tags: string;
    author_title: string;
    author_linkedin: string;
    author_photo: string;
}

export const BlogEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [tagInput, setTagInput] = useState('');

    const [post, setPost] = useState<BlogPost>({
        title: '',
        excerpt: '',
        content: '',
        status: 'draft',
        type: 'Blog Post',
        author: '',
        featured_image: '',
        tags: '',
        author_title: '',
        author_linkedin: '',
        author_photo: ''
    });

    useEffect(() => {
        if (isEdit && id) {
            loadPost(id);
        }
    }, [id, isEdit]);

    const loadPost = async (postId: string) => {
        try {
            setLoading(true);
            const response = await api.blogs.getById(parseInt(postId));

            if (response.success && response.data) {
                setPost({
                    ...response.data,
                    tags: response.data.tags || '',
                    author_title: response.data.author_title || '',
                    author_linkedin: response.data.author_linkedin || '',
                    author_photo: response.data.author_photo || ''
                });
            } else {
                toast.error('Failed to load post');
                navigate('/admin/content');
            }
        } catch (error) {
            console.error('Error loading post:', error);
            toast.error('Failed to load post');
            navigate('/admin/content');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (status?: 'published' | 'draft') => {
        if (!post.title.trim()) {
            toast.error('Title is required');
            return;
        }

        if (!post.content.trim()) {
            toast.error('Content is required');
            return;
        }

        try {
            setSaving(true);
            const saveData = {
                ...post,
                status: status || post.status,
                tags: post.tags
            };

            let response;
            if (isEdit && id) {
                response = await api.blogs.update(parseInt(id), saveData);
            } else {
                response = await api.blogs.create(saveData);
            }

            if (response.success) {
                toast.success(isEdit ? 'Post updated successfully' : 'Post created successfully');
                navigate('/admin/content');
            } else {
                toast.error(response.message || 'Failed to save post');
            }
        } catch (error) {
            console.error('Error saving post:', error);
            toast.error('Failed to save post');
        } finally {
            setSaving(false);
        }
    };

    const handleTagAdd = () => {
        if (tagInput.trim() && !getTagArray().includes(tagInput.trim())) {
            const newTags = post.tags ? `${post.tags},${tagInput.trim()}` : tagInput.trim();
            setPost({ ...post, tags: newTags });
            setTagInput('');
        }
    };

    const handleTagRemove = (tagToRemove: string) => {
        const tags = getTagArray().filter(tag => tag !== tagToRemove);
        setPost({ ...post, tags: tags.join(',') });
    };

    const getTagArray = (): string[] => {
        return post.tags ? post.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleTagAdd();
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/admin/content')}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl font-bold">Loading...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/admin/content')}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">
                            {isEdit ? 'Edit Post' : 'Create New Post'}
                        </h1>
                        <p className="text-gray-600">
                            {isEdit ? 'Update your existing blog post' : 'Write and publish a new blog post'}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() => handleSave('draft')}
                        disabled={saving}
                    >
                        <Save className="mr-2 h-4 w-4" />
                        Save Draft
                    </Button>
                    <Button
                        onClick={() => handleSave('published')}
                        disabled={saving}
                        className="bg-[#0055ff] hover:bg-[#0044cc]"
                    >
                        <Eye className="mr-2 h-4 w-4" />
                        {post.status === 'published' ? 'Update' : 'Publish'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Content</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    value={post.title}
                                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                                    placeholder="Enter post title..."
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label htmlFor="excerpt">Excerpt</Label>
                                <Textarea
                                    id="excerpt"
                                    value={post.excerpt}
                                    onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                                    placeholder="Brief description of the post..."
                                    rows={3}
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label>Content *</Label>
                                <div className="mt-1">
                                    <RichTextEditor
                                        value={post.content}
                                        onChange={(content) => setPost({ ...post, content })}
                                        placeholder="Write your post content here..."
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Author Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Author Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="author">Author Name</Label>
                                    <Input
                                        id="author"
                                        value={post.author}
                                        onChange={(e) => setPost({ ...post, author: e.target.value })}
                                        placeholder="Author name..."
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="author_title">Author Title</Label>
                                    <Input
                                        id="author_title"
                                        value={post.author_title}
                                        onChange={(e) => setPost({ ...post, author_title: e.target.value })}
                                        placeholder="Job title or designation..."
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="author_linkedin">LinkedIn Profile</Label>
                                    <Input
                                        id="author_linkedin"
                                        value={post.author_linkedin}
                                        onChange={(e) => setPost({ ...post, author_linkedin: e.target.value })}
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="author_photo">Author Photo URL</Label>
                                    <Input
                                        id="author_photo"
                                        value={post.author_photo}
                                        onChange={(e) => setPost({ ...post, author_photo: e.target.value })}
                                        placeholder="https://example.com/photo.jpg"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Post Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select value={post.status} onValueChange={(value: 'published' | 'draft') => setPost({ ...post, status: value })}>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="type">Content Type</Label>
                                <Select value={post.type} onValueChange={(value) => setPost({ ...post, type: value })}>
                                    <SelectTrigger className="mt-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Blog Post">Blog Post</SelectItem>
                                        <SelectItem value="Case Study">Case Study</SelectItem>
                                        <SelectItem value="White Paper">White Paper</SelectItem>
                                        <SelectItem value="News">News</SelectItem>
                                        <SelectItem value="eBook">eBook</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="featured_image">Featured Image URL</Label>
                                <Input
                                    id="featured_image"
                                    value={post.featured_image}
                                    onChange={(e) => setPost({ ...post, featured_image: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                    className="mt-1"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tags */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Tags</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Add tag..."
                                    className="flex-1"
                                />
                                <Button size="icon" variant="outline" onClick={handleTagAdd}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {getTagArray().map((tag) => (
                                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                                        {tag}
                                        <X
                                            className="h-3 w-3 cursor-pointer hover:text-red-500"
                                            onClick={() => handleTagRemove(tag)}
                                        />
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};