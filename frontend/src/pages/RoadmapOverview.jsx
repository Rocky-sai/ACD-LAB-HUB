import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Code, Briefcase, ArrowRight } from 'lucide-react';

const RoadmapOverview = () => {
  const years = [
    {
      year: 1,
      title: 'Year 1 — Foundations',
      description: 'Build strong foundations in Python, Mathematics, and Quantum Physics',
      icon: BookOpen,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-700',
    },
    {
      year: 2,
      title: 'Year 2 — Quantum Development',
      description: 'Master quantum programming frameworks and quantum machine learning',
      icon: Code,
      color: 'green',
      gradient: 'from-green-500 to-green-700',
    },
    {
      year: 3,
      title: 'Year 3 — Industry & Job Preparation',
      description: 'Cloud computing, AI/ML integration, cybersecurity, and research',
      icon: Briefcase,
      color: 'orange',
      gradient: 'from-orange-500 to-orange-700',
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-gradient">3-Year Quantum Mastery Roadmap</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your complete journey from beginner to Quantum Valley Engineer
          </p>
        </motion.div>

        <div className="space-y-8">
          {years.map((year, index) => {
            const Icon = year.icon;
            return (
              <motion.div
                key={year.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Link to={`/roadmap/${year.year}`}>
                  <div className={`card hover:shadow-2xl cursor-pointer border-l-8 border-${year.color}-500`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className={`w-20 h-20 bg-gradient-to-br ${year.gradient} rounded-xl flex items-center justify-center`}>
                          <Icon size={40} className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold mb-2">{year.title}</h2>
                          <p className="text-gray-600 dark:text-gray-400 text-lg">
                            {year.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight size={32} className="text-gray-400 flex-shrink-0" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 card bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
          <p className="mb-6 text-lg">
            Begin your quantum computing journey with Year 1 foundations
          </p>
          <Link to="/roadmap/1" className="inline-block px-8 py-3 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100 transition">
            Start Year 1 <ArrowRight className="inline ml-2" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default RoadmapOverview;
