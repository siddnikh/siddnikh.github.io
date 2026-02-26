import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import './App.css';

function Blogs() {
  const [posts, setPosts] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchPosts();
    fetchTags();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*, tags(id, name)')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching posts:', error);
    else setPosts(data);
    setLoading(false);
  };

  const fetchTags = async () => {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name');
    
    if (error) console.error('Error fetching tags:', error);
    else setAllTags(data);
  };

  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags?.some(tag => tag.id === selectedTag.id))
    : posts;

  return (
    <div className="background min-h-screen">
      <Navbar />
      
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in duration-300" 
            alt="zoom"
          />
          <button className="absolute top-8 right-8 text-white vt323 text-4xl hover:text-red-500">[ CLOSE ]</button>
        </div>
      )}

      <div className="pt-32 px-8 pb-16">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-4 md:gap-12 mb-8">
            <img src="/meteor.gif" alt="meteor gif" className="md:h-24 h-12" />
            <p className="vt323 md:text-8xl text-5xl text-purple-600">Blogs</p>
            <img src="/meteor.gif" alt="meteor gif" className="md:h-24 h-12" />
          </div>

          {/* Tag Filter Bar */}
          {!loading && allTags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12 bg-slate-900/40 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-sm w-full">
              <button
                onClick={() => setSelectedTag(null)}
                className={`vt323 text-xl px-6 py-1 rounded-full border transition-all ${
                  !selectedTag 
                    ? 'bg-green-500 text-black border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.4)]' 
                    : 'text-purple-400 border-purple-500/30 hover:border-purple-500 hover:text-white'
                }`}
              >
                ALL
              </button>
              {allTags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => setSelectedTag(tag)}
                  className={`vt323 text-xl px-6 py-1 rounded-full border transition-all ${
                    selectedTag?.id === tag.id 
                      ? 'bg-green-500 text-black border-green-400 shadow-[0_0_15px_rgba(74,222,128,0.4)]' 
                      : 'text-purple-400 border-purple-500/30 hover:border-purple-500 hover:text-white'
                  }`}
                >
                  #{tag.name.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <p className="vt323 text-3xl text-green-400 mt-12 animate-pulse">LOADING DATA...</p>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center mt-12">
              <p className="ps2p text-xl text-red-500 mb-4">No transmissions found.</p>
              <p className="vt323 text-2xl text-white">The signals are quiet... for now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 w-full">
              {filteredPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="bg-slate-900/60 border-2 border-purple-500/30 p-8 rounded-2xl backdrop-blur-md hover:border-purple-500/60 transition-all group"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    {post.image_url && (
                      <div className="md:w-1/3 flex-shrink-0">
                        <img 
                          src={post.image_url} 
                          alt={post.title} 
                          onClick={() => setSelectedImage(post.image_url)}
                          className="w-full h-48 object-cover rounded-xl border border-purple-500/20 group-hover:scale-[1.02] transition-transform cursor-zoom-in"
                        />
                      </div>
                    )}
                    <div className="flex flex-col flex-grow">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags?.map(tag => (
                          <button 
                            key={tag.id} 
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedTag(tag);
                            }}
                            className={`vt323 text-xs px-3 py-0.5 rounded-full border transition-all ${
                              selectedTag?.id === tag.id
                                ? 'bg-green-500 text-black border-green-400'
                                : 'bg-purple-500/10 text-purple-300 border-purple-500/30 hover:border-purple-500 hover:text-white'
                            }`}
                          >
                            #{tag.name.toUpperCase()}
                          </button>
                        ))}
                      </div>
                      <h2 className="vt323 text-4xl text-green-400 mb-2 truncate">{post.title}</h2>
                      <p className="vt323 text-purple-400/60 text-lg mb-4">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                      
                      {/* Description Preview */}
                      <div className="vt323 text-xl text-white leading-relaxed line-clamp-3 mb-6">
                        {post.description || post.content.substring(0, 150) + "..."}
                      </div>

                      <div className="mt-auto pt-6 flex justify-end">
                        <Link to={`/blog/${post.id}`} className="vt323 text-purple-400 group-hover:text-green-400 transition-colors cursor-pointer text-xl">
                          [ READ FULL LOG ]
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
