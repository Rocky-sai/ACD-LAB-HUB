import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { roadmapAPI } from '../services/api';
import { Shield, Plus, Edit, Trash2, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    loadRoadmaps();
  }, [user, navigate]);

  const loadRoadmaps = async () => {
    try {
      const response = await roadmapAPI.getAllRoadmaps();
      setRoadmaps(response.data);
    } catch (error) {
      console.error('Error loading roadmaps:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            <Shield className="inline mr-3 text-purple-600" size={40} />
            <span className="text-gradient">Admin Panel</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Manage roadmap content and resources
          </p>
        </motion.div>

        <div className="card mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome, Admin</h2>
          <p className="text-purple-100">
            You have administrative access to manage all roadmap content.
          </p>
        </div>

        <div className="space-y-6">
          {roadmaps.map((roadmap, index) => (
            <motion.div
              key={roadmap._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{roadmap.title}</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditing(roadmap._id)}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Edit size={20} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {roadmap.description}
              </p>
              <div className="text-sm text-gray-500">
                {roadmap.topics?.length || 0} topics
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 card text-center"
        >
          <h3 className="text-xl font-bold mb-3">Admin Features</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            More admin features coming soon! Including user management, analytics, and more.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;
