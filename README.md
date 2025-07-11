# Contact Management System

## Overview

The Contact Management System is a full-stack web application that allows users to manage their contacts efficiently. It provides a clean, intuitive interface for creating, viewing, updating, and deleting contact information. Built with modern technologies, the application features responsive design and real-time updates.

## Features

- **Full CRUD Operations**: Create, Read, Update, and Delete contacts
- **Responsive UI**: Works seamlessly on desktop and mobile devices
- **Modern Design**: Clean interface with PrimeReact components
- **Real-time Updates**: Instant UI feedback after operations
- **Form Validation**: Ensures data integrity with client-side validation
- **User Feedback**: Toast notifications and confirmation dialogs
- **Search & Sort**: Easily find and organize contacts

## Technology Stack

### Frontend
- **React** (v18) - UI library
- **React Router** (v6) - Routing
- **PrimeReact** - UI component library
- **PrimeFlex** - CSS utility library
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## Project Structure

```
contact-management-system/
├── backend/                  # Backend server
│   ├── app.js                # Main server file
│   ├── routes/               # API routes
│   ├── model/                # Database models
│   └── .env                  # Environment variables
│
├── frontend/                 # Frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── api/              # API service
│   │   ├── App.js            # Main component
│   │   └── index.js          # Entry point
│   └── package.json
│
├── .gitignore
└── README.md                 # This file
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- Git

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hasithamanohara/fonixss.git
   cd contact-management-system
   ```

2. **Set up the backend**:
   ```bash
   cd backend
   npm install
   cp .env.example .env 
   ```

3. **Set up the frontend**:
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment variables**:
   - In `backend/.env`:
     ```
     MONGO_URL=mongodb://localhost:27017/contactdb
     PORT=5000
     ```

## Running the Application

1. **Start the backend server**:
   ```bash
   cd backend
   npm start
   # Server will run on http://localhost:5000
   ```

2. **Start the frontend application**:
   ```bash
   cd ../frontend
   npm start
   # Application will run on http://localhost:3000
   ```

3. **Access the application**:
   Open your browser and visit: http://localhost:3000

3. **Api URL For Testing**:
   Open your browser and visit: https://fonixss-api.onrender.com

## API Documentation

The backend provides the following REST API endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contacts` | GET | Get all contacts |
| `/api/contacts` | POST | Create new contact |
| `/api/contacts/:id` | PUT | Update contact |
| `/api/contacts/:id` | DELETE | Delete contact |

For detailed API documentation, see the [API Documentation](./backend/API_DOCS.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For any questions or issues, please [open an issue](https://github.com/hasithamanohara/fonixss.git/issues) on GitHub.