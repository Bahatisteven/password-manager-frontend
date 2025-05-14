# Password Manager

A secure, full-stack password manager built with modern technologies. This application enables users to securely store, manage, and retrieve their passwords in an encrypted environment.

## Project Structure

This project is divided into two separate repositories:

- **Frontend**: [`password-manager-frontend`](https://github.com/Bahatisteven/password-manager-frontend)
- **Backend**: [`password-manager`](https://github.com/Bahatisteven/Password-Manager)

---

## Features

- User authentication and registration (JWT-based)
- Secure password storage with encryption
- CRUD operations for vault items
- Search and filter capabilities
- Pagination support
- Role-based access (Admin/User)
- Real-time alerts and user feedback

---

## Tech Stack

### Frontend

- React.js (via `create-react-app`)
- Axios
- React Router
- TailwindCSS / Bootstrap (choose the one you're using)

### Backend

- Node.js
- Express.js
- PostgreSQL with Sequelize ORM
- Argon2 for password hashing
- JWT for authentication
- Winston or Morgan for logging

---

## Getting Started

### Clone Both Repositories

```bash
# Backend
git clone https://github.com/Bahatisteven/Password-Manager.git

# Frontend
git clone https://github.com/Bahatisteven/password-manager-frontend.git
