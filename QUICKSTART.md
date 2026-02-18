# Quick Start Guide - Quantum Valley Platform

## 🚀 Get Started in 5 Minutes

This guide will help you set up and run the Quantum Valley platform locally.

---

## Prerequisites

- Node.js 20+ ([Download](https://nodejs.org/))
- MongoDB (Local or Atlas account)
- Git
- Text editor (VS Code recommended)

---

## Quick Setup

### 1. Clone Repository

```bash
git clone https://github.com/Rocky-sai/ACD-LAB-HUB.git
cd ACD-LAB-HUB
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your credentials:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_string
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Open Application

Visit: http://localhost:5173

---

## Quick MongoDB Setup

### Option A: MongoDB Atlas (Recommended - Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster (M0 Free tier)
4. Create database user
5. Whitelist all IPs (0.0.0.0/0)
6. Get connection string
7. Update `MONGODB_URI` in backend/.env

### Option B: Local MongoDB

```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Ubuntu
sudo apt install mongodb
sudo systemctl start mongodb

# Windows
# Download from mongodb.com/download-center/community
```

Use connection string:
```
MONGODB_URI=mongodb://localhost:27017/quantum-valley
```

---

## First Steps After Setup

### 1. Create Account
- Navigate to `/signup`
- Fill in your details
- Click "Sign Up"

### 2. Explore Dashboard
- View your progress
- Check roadmap overview
- See quick action cards

### 3. Start Learning
- Click "View Roadmap"
- Choose Year 1 - Foundations
- Start with Python Programming

### 4. Track Progress
- Mark topics as complete
- Use weekly planner
- Generate certificates

---

## Troubleshooting

### Backend won't start
```bash
# Check MongoDB connection
# Verify .env file exists
# Check port 5000 is available
lsof -i :5000
```

### Frontend won't build
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS errors
```bash
# Verify backend is running
# Check VITE_API_URL in frontend/.env
```

---

## Common Commands

```bash
# Backend
npm run dev          # Development mode
npm start           # Production mode
node server.js      # Direct start

# Frontend
npm run dev         # Development mode
npm run build       # Production build
npm run preview     # Preview build
```

---

## Development Tips

1. **Auto-reload:** Both servers auto-reload on file changes
2. **Port Changes:** Update ports in .env files if needed
3. **Dark Mode:** Use theme toggle in navbar
4. **Admin Access:** Set user role to 'admin' in MongoDB

---

## Making Your First Admin User

After signup, update user in MongoDB:

```javascript
// In MongoDB Compass or Shell
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

---

## Project Structure

```
├── backend/              # Node.js API
│   ├── server.js        # Entry point
│   └── src/
│       ├── models/      # MongoDB models
│       ├── controllers/ # Route handlers
│       ├── routes/      # API routes
│       └── middleware/  # Auth & validation
│
├── frontend/            # React application
│   └── src/
│       ├── pages/       # Page components
│       ├── components/  # Reusable components
│       ├── context/     # React contexts
│       └── services/    # API calls
│
└── docs/               # Documentation
```

---

## Environment Variables Reference

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://...
JWT_SECRET=random_secret_here
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## Testing the API

```bash
# Health check
curl http://localhost:5000/api/health

# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

---

## Next Steps

1. ✅ Complete setup
2. 📖 Read [README.md](README.md) for full features
3. 🚀 See [DEPLOYMENT.md](DEPLOYMENT.md) for production
4. 📡 Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details

---

## Need Help?

- 📖 Check [README.md](README.md)
- 🐛 Open GitHub issue
- 💬 Contact: support@quantum-valley.com

---

## What's Included?

✅ User authentication  
✅ 3-year learning roadmap  
✅ Progress tracking  
✅ Certificate generation  
✅ Weekly planner  
✅ Dark/light mode  
✅ Admin panel  
✅ SEO optimized  

**Total Setup Time: ~5 minutes** ⚡

---

**Happy Learning! 🌌**
