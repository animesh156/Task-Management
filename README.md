
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

**Frontend:**
  - React (Vite)
  - TypeScript
  - Tailwind CSS
  - React Query (server state, caching, invalidation)
  - React Hook Form + Zod (forms & validation)
  - Socket.IO Client

**Backend:** 
  - Node.js + Express
  - TypeScript (ESM)
  - Prisma ORM
  - PostgreSQL (Neon)
  - Socket.IO
  - JWT Authentication (HTTP-only cookies)
  - Zod (DTO validation)
  - Jest (unit testing)


**Deployment:** 
  - Vercel (frontend)
  - Render (backend)







## 🗄️ Database Choice & Justification

#### PostgreSQL was chosen over MongoDB because:

- Strong relational integrity (tasks ↔ users ↔ audits ↔ notifications)
- Better fit for audit logs and strict schemas
- Prisma offers first-class support with type safety
## 🧠 Architecture Overview

### The backend follows a clean, layered architecture:
```
Routes → Controllers → Services → Repositories → Prisma → Database

```

### Responsibilities
- **Controller**: HTTP layer, request/response, side effects
- **Service**: Business logic and validation
- **Repository**: Database access only (Prisma)
- **DTOs**: Input validation using Zod

This ensures:
 - High testability
 - Clear separation of concerns
 - Easy future scalability
## 🔐 Authentication & Authorization
 ### Features
 - User registration & login
 - Password hashing using bcrypt
 - JWT-based authentication
 - JWT stored in HTTP-only cookies
 - Protected routes via middleware


 ## ✅ Task Management (CRUD)
 Each task includes:
   - **title** :- string (max 100 chars)
   - **description** :- string
     - **dueDate** :- Date
      - **priority** :- Low / Medium / High / Urgent
       - **status** :- To Do / In Progress / Review / Completed
        - **creatorId** :- User ID
        - **assignedToId** :- User ID

Supported Operations
- Create task
- Update task
- Delete task
- Fetch tasks:
     - Assigned to user
     - Created by user
     - Overdue tasks
- Filter by status and priority
- Sort by due date


## ⏰ Overdue Task Logic
A task is considered overdue if:
 - dueDate < current time
 - status NOT IN (Completed, Cancelled)
 Overdue is treated as a derived state and not stored in the database, preventing inconsistency.

## ⚡ Real-Time Collaboration (Socket.IO)
#### Live Updates
When a task’s:
 - status
 - priority
 - assignee
is updated → all connected users instantly see the change.
```
io.emit("task:updated", updatedTask);
```

#### Assignment Notifications
When a task is assigned:
- A persistent notification is saved in the database
- A real-time socket event is sent to the assigned user
```
io.to(userId).emit("task:assigned", {
  taskId,
  message,
});
```
Users join a socket room based on their userId, ensuring targeted delivery.


#### 📝 Audit Logging (Status Changes)
The system automatically records status changes only.

**Captured Data**
- Task ID
- Old status → New status
- Updated by (user)
- Timestamp

**Database Model**
```
model TaskStatusAudit {
  id        String   @id @default(uuid())
  taskId    String
  updatedBy String
  oldStatus TaskStatus
  newStatus TaskStatus
  createdAt DateTime @default(now())

  task Task @relation(fields: [taskId], references: [id])
  user User @relation(fields: [updatedBy], references: [id])
}
```

**API Response (Resolved Names)**
```
[
  {
    "taskTitle": "Fix login bug",
    "updatedByName": "Animesh",
    "oldStatus": "IN_PROGRESS",
    "newStatus": "COMPLETED",
    "updatedAt": "2025-12-19T17:31:23.727Z"
  }
]
```
IDs are stored internally; names are resolved dynamically using Prisma relations.


#### 📊 User Dashboard
Each user has a personalized dashboard showing:
- Tasks assigned to them
- Tasks created by them
- Overdue tasks

Includes:
- Filtering by status & priority
- Sorting by due date
- Responsive UI (mobile + desktop)
- Real-time updates without refresh

## 🎨 Frontend UX & Data Management
- Fully responsive layout using Tailwind CSS
- Skeleton loaders for async data
- Optimistic updates with React Query
- Automatic cache invalidation on socket events
- Clean form handling with validation errors
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
## 🧪 Testing Strategy
**What Is Tested**
- ```
    TaskService.createTask
    ```
    - Valid input → success
    - Past due date → error
    - Repository failure → propagated error

**What Is Mocked**
- Repository layer only

**What Is NOT Used**
- Database
- Socket.IO
- Notifications

This ensures fast, deterministic unit tests.

## 🐳 Docker Support
The project includes Docker and Docker Compose support to spin up:
- Frontend
- Backend
- (Database handled by Neon)
```
docker compose up --build
```