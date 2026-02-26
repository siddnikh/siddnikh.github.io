import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import './App.css';

const Admin = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  // Tagging states
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTagName, setNewTagName] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchPosts();
      fetchTags();
    }
  }, [session]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*, tags(id, name)')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching posts:', error);
    else setPosts(data);
  };

  const fetchTags = async () => {
    const { data, error } = await supabase.from('tags').select('*').order('name');
    if (error) console.error('Error fetching tags:', error);
    else setAllTags(data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    setLoading(false);
  };

  const handleAddTag = async () => {
    if (!newTagName.trim()) return;
    const name = newTagName.trim().toLowerCase();
    
    const existing = allTags.find(t => t.name === name);
    if (existing) {
      if (!selectedTags.find(t => t.id === existing.id)) {
        setSelectedTags([...selectedTags, existing]);
      }
    } else {
      const { data, error } = await supabase.from('tags').insert([{ name }]).select().single();
      if (error) alert(error.message);
      else {
        setAllTags([...allTags, data].sort((a, b) => a.name.localeCompare(b.name)));
        setSelectedTags([...selectedTags, data]);
      }
    }
    setNewTagName('');
  };

  const toggleTag = (tag) => {
    if (selectedTags.find(t => t.id === tag.id)) {
      setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = '';
    if (image) {
      setUploading(true);
      const fileExt = image.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, image);

      if (uploadError) {
        alert('Error uploading image!');
        setUploading(false);
        setLoading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);
      
      imageUrl = publicUrl;
      setUploading(false);
    }

    const { data: postData, error: postError } = await supabase
      .from('posts')
      .insert([
        { title, description, content, image_url: imageUrl, user_id: session.user.id }
      ]).select().single();

    if (postError) {
      alert(postError.message);
      setLoading(false);
      return;
    }

    if (selectedTags.length > 0) {
      const junctionData = selectedTags.map(tag => ({
        post_id: postData.id,
        tag_id: tag.id
      }));
      const { error: tagError } = await supabase.from('post_tags').insert(junctionData);
      if (tagError) console.error('Error assigning tags:', tagError);
    }

    setTitle('');
    setDescription('');
    setContent('');
    setImage(null);
    setSelectedTags([]);
    fetchPosts();
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this post?')) {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchPosts();
    }
  };

  if (!session) {
    return (
      <div className="background h-screen flex flex-col items-center justify-center p-4">
        <Navbar />
        <div className="bg-slate-900 border-2 border-green-400 p-8 rounded-xl w-full max-w-md shadow-[0_0_20px_rgba(74,222,128,0.3)]">
          <h2 className="vt323 text-4xl text-green-400 mb-6 text-center">ADMIN ACCESS</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="bg-black border border-green-400/50 p-3 rounded text-green-400 focus:outline-none focus:border-green-400 vt323 text-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-black border border-green-400/50 p-3 rounded text-green-400 focus:outline-none focus:border-green-400 vt323 text-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="vt323 text-2xl bg-green-400 text-black py-2 rounded-xl hover:bg-green-300 transition-colors disabled:opacity-50 mt-4"
            >
              {loading ? 'AUTHENTICATING...' : 'LOGIN'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="background min-h-screen p-8 pt-32">
      <Navbar />
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="bg-slate-900/80 border-2 border-green-400 p-8 rounded-xl backdrop-blur-sm">
          <h2 className="vt323 text-4xl text-green-400 mb-6">NEW POST</h2>
          <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
            <input
              placeholder="Title"
              className="bg-black border border-green-400/30 p-3 rounded text-green-400 vt323 text-xl"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            
            <input
              placeholder="Short Description (Summary)"
              className="bg-black border border-green-400/30 p-3 rounded text-green-400 vt323 text-xl"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            {/* Tag Selection */}
            <div className="flex flex-col gap-2 border border-green-400/10 p-4 rounded bg-black/30">
              <label className="vt323 text-green-400 text-xl">TAGS</label>
              <div className="flex flex-wrap gap-2 mb-4 text-xs">
                {allTags.map(tag => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`vt323 px-3 py-1 rounded-full border transition-all ${
                      selectedTags.find(t => t.id === tag.id) 
                        ? 'bg-green-400 text-black border-green-400' 
                        : 'text-green-400/50 border-green-400/30 hover:border-green-400'
                    }`}
                  >
                    {tag.name.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  placeholder="New tag..."
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="bg-black border border-green-400/30 p-2 rounded text-green-400 vt323 text-lg flex-grow"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                />
                <button 
                  type="button" 
                  onClick={handleAddTag}
                  className="vt323 bg-green-400/20 text-green-400 border border-green-400/40 px-4 rounded hover:bg-green-400/40"
                >
                  ADD
                </button>
              </div>
            </div>

            <textarea
              placeholder="Full Content..."
              className="bg-black border border-green-400/30 p-3 rounded text-green-400 vt323 text-xl min-h-[200px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <div className="flex flex-col gap-2">
              <label className="vt323 text-green-400 text-xl">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                className="text-green-400 vt323"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button
              type="submit"
              disabled={loading || uploading}
              className="vt323 text-2xl bg-green-400 text-black py-2 rounded-xl hover:bg-green-300 transition-colors disabled:opacity-50 mt-4"
            >
              {loading || uploading ? 'PUBLISHING...' : 'PUBLISH POST'}
            </button>
          </form>
        </div>

        <div className="bg-slate-900/80 border-2 border-green-400 p-8 rounded-xl backdrop-blur-sm">
          <h2 className="vt323 text-4xl text-green-400 mb-6">MANAGE POSTS</h2>
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <div key={post.id} className="border border-green-400/30 p-4 rounded-lg flex flex-col gap-2 bg-black/50">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    {post.image_url && <img src={post.image_url} className="h-12 w-12 object-cover rounded" alt="" />}
                    <span className="vt323 text-2xl text-green-400">{post.title}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="vt323 text-xl text-red-500 hover:text-red-400 p-2"
                  >
                    [DELETE]
                  </button>
                </div>
                <p className="vt323 text-sm text-white/50 truncate italic">{post.description}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map(tag => (
                    <span key={tag.id} className="text-[10px] vt323 bg-purple-600/20 text-purple-400 px-2 rounded-full border border-purple-500/30">
                      {tag.name.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
