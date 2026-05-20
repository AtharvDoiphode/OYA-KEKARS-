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
