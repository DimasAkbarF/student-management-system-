# 🎓 Student Management System - UNPAM

A modern, professional Student Management Dashboard built with **Next.js 15** and **MongoDB**.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Features

- 📊 **Dashboard** - Overview with statistics and quick actions
- 👨‍🎓 **Student CRUD** - Create, Read, Update, Delete students
- 🔍 **Search** - Linear, Binary, and Sequential search algorithms
- 📑 **Sort** - Multiple sorting algorithms (Insertion, Bubble, Selection, Merge, Shell)
- 📥 **Import/Export** - JSON file support
- 🌙 **Dark Mode** - Elegant dark theme
- 🔐 **Authentication** - Login system with session management
- 📱 **Responsive** - Works on desktop and mobile

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd student-app
npm install
```

### 2. Setup MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) and create a **free account**
2. Create a new **Cluster** (choose the FREE tier)
3. Click **"Connect"** on your cluster
4. Choose **"Connect your application"**
5. Copy the connection string

### 3. Configure Environment

Create a `.env.local` file in the root folder:

```env
# MongoDB Connection (replace with your actual connection string)
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/student-app?retryWrites=true&w=majority

# JWT Secret (use any random string)
JWT_SECRET=your-secret-key-here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Seed Initial Data

After the app is running, visit:
```
http://localhost:3000/api/seed
```

Or use POST request to seed data:
```bash
curl -X POST http://localhost:3000/api/seed
```

This will create:
- 30 sample students
- Admin user (username: `admin`, password: `admin123`)

## 🌐 Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add Environment Variables:
   - `MONGODB_URI` = your MongoDB connection string
   - `JWT_SECRET` = your secret key
4. Click **Deploy**

### 3. Seed Production Database

After deployment, visit:
```
https://your-app.vercel.app/api/seed
```

## 📂 Project Structure

```
src/
├── app/
│   ├── (dashboard)/      # Protected dashboard pages
│   │   ├── dashboard/    # Main dashboard
│   │   ├── students/     # Student management
│   │   ├── search/       # Search page
│   │   └── sort/         # Sort page
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication
│   │   ├── students/     # Student CRUD
│   │   └── seed/         # Database seeding
│   └── login/            # Login page
├── components/           # Reusable components
├── lib/                  # Database utilities
│   ├── mongodb.ts        # MongoDB connection
│   └── models/           # Mongoose models
└── styles/               # Global CSS
```

## 🔑 Default Login

- **Username:** `admin`
- **Password:** `admin123`

## 🛠️ Technologies

- **Framework:** Next.js 15 (App Router)
- **Database:** MongoDB Atlas (Free tier)
- **ODM:** Mongoose
- **Styling:** CSS with CSS Variables
- **Language:** TypeScript

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/students | Get all students |
| POST | /api/students | Create student |
| GET | /api/students/[id] | Get single student |
| PUT | /api/students/[id] | Update student |
| DELETE | /api/students/[id] | Delete student |
| GET | /api/students/stats | Get statistics |
| POST | /api/students/import | Import students |
| GET | /api/students/export | Export students |
| POST | /api/auth/login | Login |
| POST | /api/auth/logout | Logout |
| POST | /api/seed | Seed database |

## 📄 License

MIT License - Feel free to use for educational purposes.

---

Made with ❤️ for UNPAM
