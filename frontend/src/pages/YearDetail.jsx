import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { roadmapAPI, progressAPI } from '../services/api';
import { ExternalLink, CheckCircle, Circle, Book, Award } from 'lucide-react';

const YearDetail = () => {
  const { year } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [year]);

  const loadData = async () => {
    try {
      const [roadmapRes, progressRes] = await Promise.all([
        roadmapAPI.getRoadmapByYear(year),
        progressAPI.getProgress()
      ]);
      setRoadmap(roadmapRes.data);
      setProgress(progressRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const isTopicCompleted = (topicId) => {
    return progress?.completedTopics?.some(t => t.topicId === topicId) || false;
  };

  const handleMarkComplete = async (topicId) => {
    try {
      await progressAPI.updateProgress({ topicId, year: parseInt(year) });
      loadData(); // Reload to get updated progress
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Roadmap not found</h2>
          <Link to="/roadmap" className="btn-primary">
            Back to Roadmap
          </Link>
        </div>
      </div>
    );
  }

  const yearColors = {
    1: { bg: 'from-blue-500 to-blue-700', text: 'text-blue-600', border: 'border-blue-500' },
    2: { bg: 'from-green-500 to-green-700', text: 'text-green-600', border: 'border-green-500' },
    3: { bg: 'from-orange-500 to-orange-700', text: 'text-orange-600', border: 'border-orange-500' },
  };

  const colors = yearColors[year] || yearColors[1];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/roadmap" className="text-purple-600 hover:text-purple-700 mb-4 inline-block">
            ← Back to Roadmap
          </Link>
          <div className={`card bg-gradient-to-r ${colors.bg} text-white`}>
            <h1 className="text-4xl font-bold mb-3">{roadmap.title}</h1>
            <p className="text-xl text-white/90">{roadmap.description}</p>
          </div>
        </motion.div>

        <div className="space-y-8">
          {roadmap.topics?.sort((a, b) => a.order - b.order).map((topic, index) => {
            const completed = isTopicCompleted(topic.id);
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`card ${completed ? 'border-2 border-green-500' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {completed ? (
                        <CheckCircle className="text-green-500" size={28} />
                      ) : (
                        <Circle className="text-gray-400" size={28} />
                      )}
                      <h2 className="text-2xl font-bold">{topic.title}</h2>
                    </div>
                    <p className={`text-sm ${colors.text} font-semibold mb-2`}>
                      {topic.duration}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {topic.description}
                    </p>
                  </div>
                  {!completed && (
                    <button
                      onClick={() => handleMarkComplete(topic.id)}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <CheckCircle size={20} />
                      <span>Mark Complete</span>
                    </button>
                  )}
                  {completed && (
                    <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg font-semibold">
                      ✓ Completed
                    </div>
                  )}
                </div>

                {/* Resources */}
                <div className="mb-4">
                  <h3 className="font-bold text-lg mb-3 flex items-center">
                    <Book className="mr-2" size={20} />
                    Learning Resources
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {topic.resources?.map((resource, idx) => (
                      <a
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition group"
                      >
                        <div>
                          <p className="font-medium">{resource.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{resource.type}</p>
                        </div>
                        <ExternalLink size={18} className="text-gray-400 group-hover:text-purple-600" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                {topic.projects && topic.projects.length > 0 && (
                  <div>
                    <h3 className="font-bold text-lg mb-3 flex items-center">
                      <Award className="mr-2" size={20} />
                      Suggested Projects
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                      {topic.projects.map((project, idx) => (
                        <li key={idx}>{project}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default YearDetail;
