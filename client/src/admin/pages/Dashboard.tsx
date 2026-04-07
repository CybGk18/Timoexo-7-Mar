import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FileText,
  Eye,
  Users,
  Search,
  MoreVertical,
  Edit,
  Calendar,
  ArrowUpRight,
  Trash2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';
import { api } from '../services/api';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  status: 'published' | 'draft';
  type: string;
  author: string;
  created_at: string;
  views: number;
}

export const Dashboard = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [contentTypeFilter, setContentTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await api.blogs.getAll();
      if (response.success) {
        setBlogPosts(response.data);
      } else {
        toast.error('Failed to load posts');
      }
    } catch (error) {
      toast.error('Error loading posts');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await api.blogs.delete(id);
      if (response.success) {
        setBlogPosts(blogPosts.filter(post => post.id !== id));
        setDeleteId(null);
        toast.success('Post deleted successfully');
      } else {
        toast.error('Failed to delete post');
      }
    } catch (error) {
      toast.error('Error deleting post');
      console.error(error);
    }
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesContentType = contentTypeFilter === 'all' || post.type === contentTypeFilter;
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;

    return matchesSearch && matchesContentType && matchesStatus;
  });

  const totalViews = blogPosts.reduce((sum, post) => sum + (post.views || 0), 0);
  const publishedThisMonth = blogPosts.filter(post => {
    const postDate = new Date(post.created_at);
    const now = new Date();
    return post.status === 'published' &&
      postDate.getMonth() === now.getMonth() &&
      postDate.getFullYear() === now.getFullYear();
  }).length;

  const uniqueAuthors = new Set(blogPosts.map(post => post.author)).size;

  const stats = [
    {
      title: 'Total Articles',
      value: blogPosts.length.toString(),
      icon: FileText,
      trend: 'up'
    },
    {
      title: 'Published This Month',
      value: publishedThisMonth.toString(),
      icon: Calendar,
      trend: 'up'
    },
    {
      title: 'Total Views',
      value: totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}K` : totalViews.toString(),
      icon: Eye,
      trend: 'up'
    },
    {
      title: 'Active Authors',
      value: uniqueAuthors.toString(),
      icon: Users,
      trend: 'neutral'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title} className="border border-gray-200 shadow-md hover:shadow-lg transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className="p-2.5 rounded-lg bg-[#0055ff]/10">
                  <Icon className="h-5 w-5 text-[#0055ff]" />
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Content Overview */}
      <Card className="border border-gray-200 shadow-md">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Content Overview</CardTitle>
              <CardDescription>
                Manage your blog posts, case studies, white papers, and eBooks
              </CardDescription>
            </div>
            <Button
              asChild
              className="w-full sm:w-auto bg-[#0055ff] hover:bg-[#0044cc] shadow-sm hover:shadow-md transition-all"
            >
              <Link to="/admin/content">View All Content</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search content..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={contentTypeFilter} onValueChange={setContentTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Blog Post">Blog Post</SelectItem>
                  <SelectItem value="Case Study">Case Study</SelectItem>
                  <SelectItem value="White Paper">White Paper</SelectItem>
                  <SelectItem value="eBook">eBook</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Content List - Responsive */}
            <div className="space-y-3">
              {loading ? (
                <div className="text-center py-8 text-gray-500">
                  Loading...
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No content found matching your filters.
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900 wrap-break-word">{post.title}</h3>
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                        <Badge variant="outline">{post.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.excerpt}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <span>By {post.author}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{post.views} views</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 justify-end sm:justify-start">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/content/edit/${post.id}`} className="flex items-center cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteId(post.id)}
                            className="text-red-600 cursor-pointer"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )))}
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};