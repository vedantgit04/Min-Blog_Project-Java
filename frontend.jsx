import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar, User, BookOpen, Save, X } from 'lucide-react';

const BlogApp = () => {
  const [posts, setPosts] = useState([]);
  const [currentView, setCurrentView] = useState('list');
  const [selectedPost, setSelectedPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: '',
    authorname: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock API functions (replace with actual API calls)
  const api = {
    getAllPosts: async () => {
      // Replace with: fetch('http://localhost:8080/api/posts')
      return new Promise(resolve => {
        setTimeout(() => {
          resolve([
            { id: 1, title: 'First Blog Post', content: 'This is the content of the first post...', date: '2024-01-15', authorname: 'John Doe' },
            { id: 2, title: 'React Tutorial', content: 'Learn React step by step...', date: '2024-01-20', authorname: 'Jane Smith' },
            { id: 3, title: 'Spring Boot Guide', content: 'Building REST APIs with Spring Boot...', date: '2024-01-25', authorname: 'Mike Johnson' }
          ]);
        }, 500);
      });
    },
    createPost: async (post) => {
      // Replace with: fetch('http://localhost:8080/api/create', { method: 'POST', body: JSON.stringify(post) })
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ ...post, id: Date.now() });
        }, 500);
      });
    },
    updatePost: async (id, post) => {
      // Replace with: fetch(`http://localhost:8080/api/update/${id}`, { method: 'PUT', body: JSON.stringify(post) })
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ ...post, id });
        }, 500);
      });
    },
    deletePost: async (id) => {
      // Replace with: fetch(`http://localhost:8080/api/delete/${id}`, { method: 'DELETE' })
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await api.getAllPosts();
      setPosts(data);
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!formData.title || !formData.content || !formData.date || !formData.authorname) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const newPost = await api.createPost(formData);
      setPosts([...posts, newPost]);
      setFormData({ title: '', content: '', date: '', authorname: '' });
      setCurrentView('list');
    } catch (err) {
      setError('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePost = async () => {
    if (!formData.title || !formData.content || !formData.date || !formData.authorname) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const updatedPost = await api.updatePost(selectedPost.id, formData);
      setPosts(posts.map(post => post.id === selectedPost.id ? updatedPost : post));
      setFormData({ title: '', content: '', date: '', authorname: '' });
      setSelectedPost(null);
      setCurrentView('list');
    } catch (err) {
      setError('Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setLoading(true);
      try {
        await api.deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
      } catch (err) {
        setError('Failed to delete post');
      } finally {
        setLoading(false);
      }
    }
  };

  const startEdit = (post) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      date: post.date,
      authorname: post.authorname
    });
    setCurrentView('edit');
  };

  const cancelEdit = () => {
    setSelectedPost(null);
    setFormData({ title: '', content: '', date: '', authorname: '' });
    setCurrentView('list');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                My Blog
              </h1>
              <p className="text-gray-600 mt-1">Share your thoughts with the world</p>
            </div>
            {currentView === 'list' && (
              <button
                onClick={() => setCurrentView('create')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
                New Post
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* List View */}
        {currentView === 'list' && (
          <div className="space-y-6">
            {posts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-600 mb-4">Get started by creating your first blog post.</p>
                <button
                  onClick={() => setCurrentView('create')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto transition-colors duration-200"
                >
                  <Plus className="h-4 w-4" />
                  Create Post
                </button>
              </div>
            ) : (
              posts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.authorname}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(post.date)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => startEdit(post)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        title="Edit post"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Delete post"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Create/Edit Form */}
        {(currentView === 'create' || currentView === 'edit') && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {currentView === 'create' ? 'Create New Post' : 'Edit Post'}
              </h2>
              <button
                onClick={cancelEdit}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  placeholder="Enter post title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  placeholder="Write your post content..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    name="authorname"
                    value={formData.authorname}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                    placeholder="Author name..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={currentView === 'create' ? handleCreatePost : handleUpdatePost}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
                >
                  <Save className="h-4 w-4" />
                  {loading ? 'Saving...' : (currentView === 'create' ? 'Create Post' : 'Update Post')}
                </button>
                <button
                  onClick={cancelEdit}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogApp;
