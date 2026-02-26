import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import './App.css';

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [zoomImage, setZoomImage] = useState(false);
  
  // Comment states
  const [comments, setComments] = useState([]);
  const [authorName, setAuthorName] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*, tags(id, name)')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching post:', error);
    } else {
      setPost(data);
    }
    setLoading(false);
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: false });

    if (error) console.error('Error fetching comments:', error);
    else setComments(data);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    setSubmitting(true);
    const { error } = await supabase
      .from('comments')
      .insert([
        { 
          post_id: id, 
          author_name: authorName.trim() || 'Anonymous', 
          content: commentContent.trim() 
        }
      ]);

    if (error) {
      alert('Error posting comment!');
      console.error(error);
    } else {
      setAuthorName('');
      setCommentContent('');
      fetchComments(); // Refresh comments
    }
    setSubmitting(false);
  };

  const scrollToComments = () => {
    const section = document.getElementById('comment-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="background min-h-screen">
        <Navbar />
        <div className="pt-32 flex justify-center items-center">
          <p className="vt323 text-3xl text-green-400 animate-pulse">LOADING DATA...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="background min-h-screen">
        <Navbar />
        <div className="pt-32 flex flex-col justify-center items-center">
          <p className="ps2p text-xl text-red-500 mb-4">POST NOT FOUND</p>
          <Link to="/blogs" className="vt323 text-2xl text-purple-400 hover:text-white">
            [ BACK TO TRANSMISSIONS ]
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="background min-h-screen pb-20">
      <Navbar />
      
      {/* Floating Comment Button - Pixelated Style */}
      <button 
        onClick={scrollToComments}
        className="fixed bottom-12 right-12 z-[90] vt323 text-3xl bg-green-500 text-black px-8 py-4 rounded-md border-b-8 border-r-8 border-green-700 shadow-[8px_8px_0_rgba(0,0,0,0.5)] hover:bg-green-400 hover:translate-x-1 hover:translate-y-1 hover:border-b-4 hover:border-r-4 transition-all active:translate-x-2 active:translate-y-2 active:border-0 group overflow-hidden"
      >
        <span className="relative z-10 font-bold italic tracking-tighter">COMMENT +</span>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
      </button>

      {/* Zoom Modal */}
      {zoomImage && post.image_url && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoomImage(false)}
        >
          <img src={post.image_url} className="max-w-full max-h-full object-contain animate-in fade-in zoom-in duration-300" alt="zoom" />
        </div>
      )}

      <div className="pt-32 px-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/blogs" className="vt323 text-2xl text-purple-400 hover:text-white mb-8 inline-block transition-colors">
            [ BACK TO TRANSMISSIONS ]
          </Link>

          <article className="bg-slate-900/60 border-2 border-purple-500/30 p-8 md:p-12 rounded-3xl backdrop-blur-md mb-12">
            {post.image_url && (
              <img 
                src={post.image_url} 
                alt={post.title} 
                onClick={() => setZoomImage(true)}
                className="w-full h-64 md:h-96 object-cover rounded-2xl border border-purple-500/20 mb-8 cursor-zoom-in hover:brightness-110 transition-all"
              />
            )}
            
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags?.map(tag => (
                <span key={tag.id} className="vt323 text-sm bg-purple-500/20 text-purple-300 px-4 py-1 rounded-full border border-purple-500/30">
                  #{tag.name.toUpperCase()}
                </span>
              ))}
            </div>

            <h1 className="vt323 text-5xl md:text-7xl text-green-400 mb-2 leading-tight">{post.title}</h1>
            
            <p className="vt323 text-purple-400/60 text-xl mb-4 border-b border-purple-500/20 pb-4">
              TIMESTAMP: {new Date(post.created_at).toLocaleString()}
            </p>

            {post.description && (
              <p className="vt323 text-2xl text-purple-400 italic mb-12 leading-relaxed bg-purple-900/10 p-6 rounded-xl border-l-4 border-purple-500">
                {post.description}
              </p>
            )}

            <div className="vt323 text-2xl text-white leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </article>

          {/* Comment Section */}
          <section id="comment-section" className="bg-slate-900/40 border-2 border-green-500/20 p-8 rounded-3xl backdrop-blur-md">
            <h3 className="vt323 text-4xl text-green-400 mb-8 underline decoration-green-500/30 underline-offset-8">COMMENTS ({comments.length})</h3>
            
            <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4 mb-12 bg-black/30 p-6 rounded-2xl border border-green-500/10">
              <input
                type="text"
                placeholder="YOUR IDENTITY (OPTIONAL)"
                className="bg-black/50 border border-green-500/30 p-3 rounded text-green-400 vt323 text-xl focus:outline-none focus:border-green-400"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
              <textarea
                placeholder="TRANSMIT YOUR FEEDBACK..."
                required
                className="bg-black/50 border border-green-500/30 p-3 rounded text-green-400 vt323 text-xl focus:outline-none focus:border-green-400 min-h-[100px]"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />
              <button
                type="submit"
                disabled={submitting}
                className="vt323 text-2xl bg-green-500 text-black py-2 rounded-xl hover:bg-green-400 transition-colors disabled:opacity-50"
              >
                {submitting ? 'TRANSMITTING...' : '[ SUBMIT TRANSMISSION ]'}
              </button>
            </form>

            <div className="flex flex-col gap-6">
              {comments.length === 0 ? (
                <p className="vt323 text-2xl text-purple-400/40 text-center italic">The terminal is quiet... leave a signal.</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="border-b border-green-500/10 pb-6 last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="vt323 text-2xl text-green-400">{comment.author_name.toUpperCase()}</span>
                      <span className="vt323 text-lg text-purple-400/40">
                        • {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="vt323 text-xl text-white/80 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
