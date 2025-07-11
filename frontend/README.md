# User Management System

A full-stack User Management System built with:

## 🛠 Tech Stack

### Frontend
- React (Vite, TypeScript)
- Tailwind CSS
- React Router DOM
- Axios (with JWT token interceptor)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT for authentication
- express-validator for validation
- CORS, dotenv

---

## 📁 Folder Structure

```
assignment-fullstack/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── config/
│   ├── .env.example
│   └── index.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── context/
    │   ├── App.tsx
    │   └── main.tsx
    └── README.md
```

---

## 🚀 Features

### Backend
- User CRUD API (`/api/users`)
- JWT-based authentication (`/api/auth/login`, `/api/auth/signup`)
- Server-side pagination & search
- Input validation with express-validator
- Protected routes with JWT middleware
- MongoDB connection via Mongoose
- CORS for security

### Frontend
- Login & Signup pages
- Dashboard with user list, search, pagination
- Add/Edit user form (modal or page)
- View user details
- Delete user
- Auth context for login/logout state
- Protected routes (dashboard, user details, etc.)
- Axios instance with JWT token
- Responsive UI with Tailwind CSS
- Loading, error, and empty states

---

## ⚡️ Setup Instructions

### 1. Backend
1. `cd backend`
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file (see `.env.example`):
   ```env
   MONGO_URI=your_mongo_url
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the backend:
   ```sh
   npm run dev
   ```

### 2. Frontend
1. `cd frontend`
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm run dev
   ```

---

## 🌐 API Endpoints

### Auth
- `POST /api/auth/login` — Login, returns JWT
- `POST /api/auth/signup` — Signup, returns JWT

### Users (Protected)
- `GET /api/users` — List users (pagination, search)
- `GET /api/users/:id` — Get user by ID
- `POST /api/users` — Add user
- `PUT /api/users/:id` — Update user
- `DELETE /api/users/:id` — Delete user

---

## 📝 Notes
- All protected routes require `Authorization: Bearer <token>` header.
- Frontend uses Axios interceptor to attach token automatically.
- Dashboard and user management features are only accessible when logged in.

---

## 👨‍💻 Author
- Built by [Your Name]
