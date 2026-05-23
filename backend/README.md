# Oya Kekars - Backend

## Overview
Backend API for the Oya Kekars bakery website.

## Planned Features
- **Admin Panel API** — CRUD for cakes, prices, photos
- **Contact Form** — Store form submissions
- **Newsletter** — Email signup storage
- **Reviews** — Manage customer reviews

## Frontend Integration Points
The frontend expects the following data from the backend (currently mocked in `frontend/src/lib/constants.js`):

| Endpoint (suggested) | Data |
|---|---|
| `GET /api/cakes` | Cake catalog (name, price, image, description, ingredients, sizes) |
| `GET /api/cakes/:id` | Single cake details |
| `GET /api/reviews` | Customer reviews |
| `POST /api/contact` | Contact form submission |
| `POST /api/newsletter` | Newsletter signup |

## WhatsApp Number
Currently hardcoded in `frontend/src/lib/constants.js` as `WHATSAPP_NUMBER`. The backend can serve this dynamically via a config endpoint.

## Getting Started
TBD — Set up your preferred stack here (Node.js + Express + MongoDB recommended).



Oya Kekars Backend Documentation
Project Overview

Oya Kekars is a bakery catalog and WhatsApp ordering platform built using the MERN stack architecture.

The backend handles:

Admin authentication
Cake management
Secure APIs
Image uploads
Database storage
Dynamic catalog management

The frontend displays cakes dynamically and customers order directly through WhatsApp.

Tech Stack
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
bcryptjs
Multer
Cloudinary
Features Implemented
Authentication System
Admin login system
JWT token generation
Protected admin routes
Password hashing using bcrypt
Cake Management System (CRUD)

Implemented complete CRUD operations for cakes:

Create Cake

Admin can add:

name
category
price
weight
description
image
Read Cakes

Public API to fetch all cakes for frontend catalog display.

Update Cake

Admin can:

edit price
update details
change image
modify availability
Delete Cake

Admin can remove cakes from catalog.

Protected Routes

JWT middleware added to secure:

Add Cake
Update Cake
Delete Cake

Public users can only:

fetch cakes
Cloudinary Image Upload

Integrated:

Cloudinary
Multer
Multer Storage Cloudinary

Features:

image upload from Postman/admin panel
cloud-hosted optimized images
image URL stored in MongoDB
Project Structure
backend/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── cakeController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── Admin.js
│   │   └── Cake.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── cakeRoutes.js
│   │
│   ├── createAdmin.js
│   │
│   └── server.js
│
├── .env
├── package.json
Installed Packages
Main Dependencies
npm install express mongoose dotenv cors bcryptjs jsonwebtoken cookie-parser multer cloudinary multer-storage-cloudinary
Dev Dependency
npm install nodemon --save-dev
Environment Variables
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=oyakekarssecret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
Database Collections
Admin Collection
{
   email,
   password
}
Cakes Collection
{
   name,
   category,
   price,
   weight,
   description,
   image,
   available
}
API Endpoints
Authentication APIs
Login Admin
POST
/api/auth/login
Body
{
   "email": "admin@oyakekars.com",
   "password": "admin123"
}
Cake APIs
Get All Cakes
GET
/api/cakes

Public Route.

Add Cake
POST
/api/cakes

Protected Route.

Uses:

JWT token
form-data
image upload
Update Cake
PUT
/api/cakes/:id

Protected Route.

Delete Cake
DELETE
/api/cakes/:id

Protected Route.

Authentication Flow
Admin logs in.
Backend verifies credentials.
JWT token generated.
Token sent to frontend/Postman.
Protected routes require authorization header.

Example:

authorization: JWT_TOKEN
Cloudinary Integration

Image Upload Flow:

Admin uploads image →
Multer processes file →
Cloudinary uploads image →
Cloudinary URL returned →
MongoDB stores image URL →
Frontend displays image dynamically.

WhatsApp Ordering Flow

Customer visits catalog →
Selects cake →
Clicks “Order on WhatsApp” →
Auto-generated message opens →
Owner confirms order on WhatsApp.

Example generated message:

Hi Oya Kekars,
I want to order:

Cake: Chocolate Cake
Price: ₹1200
Weight: 1 KG
Security Features
JWT Authentication
Password Hashing
Protected Admin Routes
Cloud Image Storage
Environment Variables for Secrets
Tools Used
Postman for API testing
MongoDB Compass for database visualization
MongoDB Atlas for cloud database
Cloudinary for image hosting
Future Improvements
Frontend API integration
Admin dashboard UI
Blog management system
Contact form backend
Deployment on Render and Vercel
Review system
Category management
Analytics dashboard
Current Project Status

Backend Completed:

Server setup
MongoDB connection
Authentication
JWT protection
Cake CRUD
Cloudinary image upload
Secure API architecture

Next Phase:

Frontend integration with backend APIs
Admin panel frontend
Deployment and production optimization
