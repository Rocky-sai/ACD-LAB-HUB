import Roadmap from '../models/Roadmap.js';

const roadmapData = [
  {
    year: 1,
    title: "Year 1 — Foundations",
    description: "Build strong foundations in Python, Mathematics, and Quantum Physics",
    topics: [
      {
        id: "python",
        title: "Python Programming",
        duration: "Months 1-2",
        description: "Master Python fundamentals including NumPy, Pandas, and Matplotlib",
        resources: [
          { title: "Python Official Documentation", url: "https://www.python.org/doc/", type: "documentation" },
          { title: "GeeksforGeeks Python", url: "https://www.geeksforgeeks.org/python-programming-language/", type: "tutorial" },
          { title: "NumPy Tutorial", url: "https://numpy.org/learn/", type: "tutorial" },
          { title: "Pandas Documentation", url: "https://pandas.pydata.org/docs/", type: "documentation" },
          { title: "Matplotlib Tutorials", url: "https://matplotlib.org/stable/tutorials/", type: "tutorial" }
        ],
        projects: ["Data Analysis Project", "Visualization Dashboard"],
        order: 1
      },
      {
        id: "math",
        title: "Mathematics for Quantum Computing",
        duration: "Months 3-4",
        description: "Linear Algebra, Complex Numbers, and Probability Theory",
        resources: [
          { title: "3Blue1Brown Linear Algebra", url: "https://www.3blue1brown.com/linear-algebra", type: "video" },
          { title: "Khan Academy Linear Algebra", url: "https://www.khanacademy.org/math/linear-algebra", type: "course" },
          { title: "MIT OCW Linear Algebra", url: "https://ocw.mit.edu/courses/18-06-linear-algebra/", type: "course" }
        ],
        projects: ["Matrix Operations Library", "Linear Transformation Visualizer"],
        order: 2
      },
      {
        id: "physics",
        title: "Physics & Quantum Basics",
        duration: "Months 5-12",
        description: "Classical Physics, Quantum Mechanics Fundamentals, and Quantum States",
        resources: [
          { title: "Qiskit Textbook", url: "https://qiskit.org/textbook", type: "textbook" },
          { title: "IBM Quantum Learning", url: "https://learning.quantum.ibm.com/", type: "platform" }
        ],
        projects: ["Quantum State Simulator", "Quantum Gate Visualizer"],
        order: 3
      },
      {
        id: "foundations-project",
        title: "Year 1 Capstone Project",
        duration: "Month 12",
        description: "Combine all Year 1 knowledge into a comprehensive project",
        resources: [
          { title: "Qiskit Documentation", url: "https://qiskit.org/documentation/", type: "documentation" }
        ],
        projects: ["Build a Simple Quantum Circuit Simulator"],
        order: 4
      }
    ]
  },
  {
    year: 2,
    title: "Year 2 — Quantum Development",
    description: "Master quantum programming frameworks and quantum machine learning",
    topics: [
      {
        id: "qiskit",
        title: "Qiskit Framework",
        duration: "Months 1-3",
        description: "IBM's quantum programming framework and quantum algorithms",
        resources: [
          { title: "Qiskit Official Site", url: "https://qiskit.org/", type: "platform" },
          { title: "IBM Quantum Learning", url: "https://learning.quantum.ibm.com/", type: "course" }
        ],
        projects: ["Quantum Teleportation", "Grover's Algorithm Implementation"],
        order: 1
      },
      {
        id: "cirq",
        title: "Google Cirq",
        duration: "Months 4-6",
        description: "Google's quantum computing framework",
        resources: [
          { title: "Cirq Documentation", url: "https://quantumai.google/cirq", type: "documentation" }
        ],
        projects: ["QAOA Implementation", "VQE Algorithm"],
        order: 2
      },
      {
        id: "azure-quantum",
        title: "Azure Quantum",
        duration: "Months 7-9",
        description: "Microsoft's quantum development kit and Q# language",
        resources: [
          { title: "Azure Quantum Docs", url: "https://learn.microsoft.com/azure/quantum/", type: "documentation" }
        ],
        projects: ["Quantum Cryptography Demo", "Quantum Simulation"],
        order: 3
      },
      {
        id: "qml",
        title: "Quantum Machine Learning",
        duration: "Months 10-12",
        description: "Combine quantum computing with machine learning",
        resources: [
          { title: "PennyLane", url: "https://pennylane.ai/", type: "platform" },
          { title: "TensorFlow Quantum", url: "https://www.tensorflow.org/quantum", type: "framework" }
        ],
        projects: ["Quantum Neural Network", "Quantum Data Classification"],
        order: 4
      }
    ]
  },
  {
    year: 3,
    title: "Year 3 — Industry & Job Preparation",
    description: "Cloud computing, AI/ML integration, cybersecurity, and research",
    topics: [
      {
        id: "cloud",
        title: "Cloud Computing",
        duration: "Months 1-3",
        description: "AWS, Azure, and Google Cloud platforms",
        resources: [
          { title: "AWS Training", url: "https://aws.amazon.com/training/", type: "course" },
          { title: "Azure Learning", url: "https://learn.microsoft.com/azure", type: "course" },
          { title: "Google Cloud Training", url: "https://cloud.google.com/training", type: "course" }
        ],
        projects: ["Deploy Quantum App on Cloud", "Cloud-Based Quantum API"],
        order: 1
      },
      {
        id: "ai-ml",
        title: "AI/ML Integration",
        duration: "Months 4-6",
        description: "TensorFlow, PyTorch, and advanced machine learning",
        resources: [
          { title: "TensorFlow", url: "https://www.tensorflow.org/", type: "framework" },
          { title: "PyTorch", url: "https://pytorch.org/", type: "framework" },
          { title: "Kaggle Competitions", url: "https://www.kaggle.com/", type: "platform" }
        ],
        projects: ["Hybrid Classical-Quantum ML Model", "Quantum-Enhanced AI"],
        order: 2
      },
      {
        id: "cybersecurity",
        title: "Quantum Cybersecurity",
        duration: "Months 7-9",
        description: "Post-quantum cryptography and quantum security",
        resources: [
          { title: "NIST PQC", url: "https://csrc.nist.gov/projects/post-quantum-cryptography", type: "documentation" }
        ],
        projects: ["Quantum Key Distribution System", "Post-Quantum Encryption"],
        order: 3
      },
      {
        id: "research",
        title: "Research & Publications",
        duration: "Months 10-12",
        description: "Academic research and contribution to quantum computing field",
        resources: [
          { title: "arXiv", url: "https://arxiv.org/", type: "research" },
          { title: "Google Scholar", url: "https://scholar.google.com/", type: "research" }
        ],
        projects: ["Research Paper", "Open Source Contribution", "Portfolio Website"],
        order: 4
      }
    ]
  }
];

export const seedRoadmap = async () => {
  try {
    const count = await Roadmap.countDocuments();
    
    if (count === 0) {
      await Roadmap.insertMany(roadmapData);
      console.log('Roadmap data seeded successfully');
    } else {
      console.log('Roadmap data already exists');
    }
  } catch (error) {
    console.error('Error seeding roadmap data:', error);
  }
};
