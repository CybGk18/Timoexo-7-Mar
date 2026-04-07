
// src/components/BlogPost.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Facebook,
  Linkedin,
  MailPlus,
  MessageCircle,
  Loader2,
  X,
  Clock,
  Eye,
  Share2,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { API_BASE_URL } from "@/config/api";

/**
 * Premium BlogPost component
 * - TypeScript + React.FC
 * - Stable TOC generation + MutationObserver
 * - IntersectionObserver scroll-spy
 * - Accessible buttons and keyboard-friendly interactions
 * - Comments + Comment Form with submit
 */

/* ----------------------------- Type Definitions --------------------------- */
interface BlogPostType {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  type?: string;
  author: string;
  author_linkedin?: string;
  author_title?: string;
  author_photo?: string;
  featured_image?: string;
  views: number;
  created_at: string;
  updated_at?: string;
  tags?: string;
}

interface CommentType {
  id: number;
  blog_post_id: number;
  name: string;
  email: string;
  comment: string;
  status?: string;
  created_at: string;
}

/* ------------------------------- Component -------------------------------- */
const BlogPost: React.FC = () => {
  const { slug, id } = useParams<{ slug?: string; id?: string }>();

  // Core state
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Comments
  const [comments, setComments] = useState<CommentType[]>([]);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentFormData, setCommentFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  /* --------------------------- Fetch blog post --------------------------- */
  useEffect(() => {
    setLoading(true);
    setError(null);
    setPost(null);

    const ac = new AbortController();

    const query = slug ? `slug=${encodeURIComponent(slug)}` : `id=${encodeURIComponent(id || "")}`;

    fetch(`${API_BASE_URL}/public-blogs.php?${query}`, { signal: ac.signal })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`Server responded ${res.status}`);
        }
        const txt = await res.text();
        // Try to parse JSON (some servers respond with text)
        let data;
        try {
          data = JSON.parse(txt);
        } catch {
          throw new Error("Invalid JSON from server");
        }
        if (data.success && data.data) {
          setPost(data.data as BlogPostType);
        } else {
          throw new Error("Blog not found");
        }
      })
      .catch((err: any) => {
        if (err.name === "AbortError") return;
        setError(err.message || "An error occurred while fetching the article.");
      })
      .finally(() => setLoading(false));

    return () => {
      ac.abort();
    };
  }, [slug, id]);

  /* --------------------------- Fetch comments ---------------------------- */
  useEffect(() => {
    if (!post?.id) {
      setComments([]);
      return;
    }
    const ac = new AbortController();

    fetch(`${API_BASE_URL}/comments.php?blog_id=${encodeURIComponent(post.id)}`, { signal: ac.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Comment fetch failed");
        return res.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setComments(data.data as CommentType[]);
        }
      })
      .catch((err: any) => {
        if (err.name === "AbortError") return;
        // Non-fatal — comments may be optional
      });

    return () => ac.abort();
  }, [post?.id]);

  /* --------------------------- Share Article ---------------------------- */
  const shareArticle = (platform: "facebook" | "linkedin" | "whatsapp" | "email") => {
    const url = window.location.href;
    const title = post?.title || "Article";

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${url}`)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    };

    if (platform === "email") {
      window.location.href = urls.email;
    } else {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }
  };

  /* --------------------------- Comment Submit ---------------------------- */
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post?.id) return;
    setSubmittingComment(true);

    try {
      const res = await fetch(`${API_BASE_URL}/comments.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blog_post_id: post.id, ...commentFormData }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Comment submitted successfully!");
        setCommentFormData({ name: "", email: "", comment: "" });
        // Optionally reload comments (lightweight)
        const commentsRes = await fetch(`${API_BASE_URL}/comments.php?blog_id=${encodeURIComponent(post.id)}`);
        const commentsData = await commentsRes.json();
        if (commentsData.success) setComments(commentsData.data || []);
      } else {
        toast.error(data.message || "Could not submit comment");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to submit comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  /* ---------------------------- Back to top ------------------------------ */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* --------------------------- Level padding map ------------------------- */
  // Tailwind cannot compile dynamic classes reliably; use this map
  const levelPadding: Record<number, string> = {
    1: "pl-3",
    2: "pl-6",
    3: "pl-9",
    4: "pl-12",
  };

  /* ----------------------------- Rendering -------------------------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-violet-50 via-blue-50 to-cyan-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-violet-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-violet-50 via-blue-50 to-cyan-50 px-4">
        <div className="text-center max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
            <p className="text-gray-600 mb-6">{error || "The requested article could not be found."}</p>
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-xl hover:bg-violet-700 transition-colors font-medium"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Back to Resources
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------- Main JSX ------------------------------- */
  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-blue-50 to-cyan-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* MAIN CONTENT */}
        <article className="w-full">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
            {/* Content Container */}
            <div className="p-6 sm:p-8 md:p-10 lg:p-12">
              {/* Title */}
              <h1 className="text-3xl sm:text-3xl lg:text-3xl font-bold text-gray-900 leading-tight mb-6">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-violet-500 to-blue-500 overflow-hidden flex items-center justify-center shrink-0">
                    {post.author_photo ? (
                      <img
                        src={post.author_photo}
                        alt={post.author}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white font-bold text-lg">${post.author.charAt(
                              0
                            ).toUpperCase()}</div>`;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold text-lg">
                        {post.author.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    {post.author_linkedin ? (
                      <a
                        href={post.author_linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-gray-900 hover:text-violet-600 transition-colors"
                      >
                        {post.author}
                      </a>
                    ) : (
                      <p className="font-semibold text-gray-900">{post.author}</p>
                    )}
                    {post.author_title && <p className="text-sm text-gray-600">{post.author_title}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 ml-auto">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.views.toLocaleString()} views
                  </span>
                </div>
              </div>

              {/* Share Article Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Share Article</span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => shareArticle("facebook")}
                    aria-label="Share on Facebook"
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => shareArticle("linkedin")}
                    aria-label="Share on LinkedIn"
                    className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => shareArticle("whatsapp")}
                    aria-label="Share on WhatsApp"
                    className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => shareArticle("email")}
                    aria-label="Share via Email"
                    className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <MailPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {post.featured_image && (
                <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                </div>
              )}

              {/* Article content (server-provided HTML) */}
              <div
                className="prose prose-lg max-w-none
                    prose-headings:font-bold prose-headings:text-gray-900
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                    prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-ul:my-4 prose-ol:my-4
                    prose-li:text-gray-700 prose-li:my-2
                    prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                    prose-blockquote:border-l-4 prose-blockquote:border-violet-500 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:my-6
                    prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-violet-600"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.split(",").map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-linear-to-r from-violet-100 to-blue-100 text-violet-700 rounded-full text-sm font-medium hover:from-violet-200 hover:to-blue-200 transition-colors"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-violet-600" />
                  Comments ({comments.length})
                </h3>

                <div className="space-y-4">
                  {comments.length === 0 && <p className="text-gray-500">Be the first to comment.</p>}

                  {comments.map((c) => (
                    <div
                      key={c.id}
                      className="bg-linear-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white font-bold shrink-0">
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-gray-900">{c.name}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(c.created_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <p className="text-gray-700 leading-relaxed">{c.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comment Form */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Leave a Comment</h3>

                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={commentFormData.name}
                      onChange={(e) => setCommentFormData({ ...commentFormData, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all outline-none"
                      aria-label="Your name"
                    />

                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={commentFormData.email}
                      onChange={(e) => setCommentFormData({ ...commentFormData, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all outline-none"
                      aria-label="Your email"
                    />
                  </div>

                  <textarea
                    rows={5}
                    required
                    placeholder="Write your comment... *"
                    value={commentFormData.comment}
                    onChange={(e) => setCommentFormData({ ...commentFormData, comment: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all outline-none resize-none"
                    aria-label="Your comment"
                  />

                  <button
                    type="submit"
                    disabled={submittingComment}
                    className="bg-linear-to-r from-violet-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-violet-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl flex items-center gap-2"
                    aria-disabled={submittingComment}
                  >
                    {submittingComment ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Post Comment"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
