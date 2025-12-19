
# 🗂 Task Management Backend (Node.js + TypeScript)
A scalable, production-grade Task Management Backend built with Node.js, TypeScript, Express, Prisma, and PostgreSQL, featuring real-time updates, audit logging, notifications, and clean architecture.


## 🚀 Features

### ✅ Core Functionality

- Task CRUD (Create, Update, Delete, Fetch)
- Task assignment & reassignment
- Overdue / assigned / created task filtering
- JWT authentication (HTTP-only cookies)

### ⚡ Real-Time

- Socket.IO powered updates
- Live task updates across all connected clients
- Instant assignment notifications



### 🔔 Notifications

- Persistent in-app notifications stored in DB
- Real-time delivery via sockets

### 📝 Audit Logging

- Tracks task status changes only
- Logs(Task, Old status → New status, Updated by)

### 🧪 Testing
- Unit tests with Jest + ts-jest
- Repository layer mocked
## Tech Stack

**Frontend:** React.js, Typescript, React Query,TailwindCSS, Socket.IO, Zod

**Backend:** Node.js, Typescript, Express, Prisma, PostgreSQL (Neon compatible), Socket.IO, Zod, Jest + ts-jest


**Deployment:** Vercel (frontend), Render (backend)







## 📦 Installation & Setup

### 1. Clone the Repository

```bash
 git clone https://github.com/animesh156/Task-Management.git
 cd Task-Management
```

### 2. Backend

#### Install 
```bash
 cd backend
 npm install
```

#### .env file
```bash
PORT = 5897
JWT_SECRET = YOUR_SECRET
DATABASE_URL=your_DB_uri
CLIENT_URL_DEV = 
CLIENT_URL_PROD = 
NODE_ENV = development  
NODE_ENV = production
```

#### Run Server
``` bash
npm run dev
```

### 3. FRONTEND

#### Install 
```bash
 cd frontend
 npm install
```

#### .env file
```bash
VITE_API_BASE_URL=your_backend_url(local or deployed)
 
```

#### Run Frontend
``` bash
npm run dev
```