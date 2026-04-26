StageHub - Internship Applying Platform

StageHub is a full-stack web application for managing internship offers and applications. It allows users to apply for internships and administrators to manage companies, offers, and applications.

Features

User
- Register and login
- View internship offers
- View offer details
- Apply to internships
- Track application status

Admin
- Dashboard with statistics
- Manage companies (create, delete)
- Manage internship offers
- View all applications
- Accept or reject applications

Tech Stack

Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios

Backend
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcryptjs

Project Structure

Internships_applying_platform/
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middlewares/
│   │   └── utils/
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   └── services/
    └── package.json

Backend Setup

cd backend
npm install

Create a .env file:

DATABASE_URL="postgresql://postgres:password@localhost:5432/stagehub_db"
JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN="7d"
PORT=5000

Run Prisma:

npx prisma generate
npx prisma migrate dev

Start backend:

npm run dev

Backend runs on:

http://localhost:5000

Frontend Setup

cd frontend
npm install

Create a .env file:

VITE_API_URL="http://localhost:5000/api"

Start frontend:

npm run dev

Frontend runs on:

http://localhost:5173

API Endpoints

Auth
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me

Companies
GET    /api/companies
POST   /api/companies
DELETE /api/companies/:id

Offers
GET    /api/offers
GET    /api/offers/:id
POST   /api/offers
PUT    /api/offers/:id
DELETE /api/offers/:id

Applications
POST /api/applications
GET  /api/applications/me
GET  /api/applications
PUT  /api/applications/:id/status

Admin
GET /api/admin/stats

Roles

USER
- View offers
- Apply to internships
- Track applications

ADMIN
- Manage companies
- Manage offers
- Manage applications
- View dashboard statistics

Deployment

Frontend can be deployed on Vercel.
Backend can be deployed on Render or Railway.
PostgreSQL can be hosted on Render or Railway.

Author

Oussama Chiguer