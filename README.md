# MERN Stack Todo Application

A modern, full-stack todo application built with MongoDB, Express.js, React, and Node.js. Features a clean, professional UI with Tailwind CSS and complete CRUD functionality.

## Features

- ✅ **Create, Read, Update, Delete** todos
- ✅ **Mark todos as complete/incomplete**
- ✅ **Priority levels** (Low, Medium, High)
- ✅ **Due dates** for todos
- ✅ **Filter todos** (All, Pending, Completed)
- ✅ **Responsive design** with Tailwind CSS
- ✅ **Real-time statistics** dashboard
- ✅ **Professional UI/UX** with modern design
- ✅ **TypeScript support** for better development experience

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Lucide React** - Icon library

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB Atlas account** (free tier available)

## Setup Instructions

### 1. Clone and Navigate to Project

```bash
cd "/home/nadeeshame/Documents/ToDo App"
```

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up MongoDB Atlas:
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account
   - Create a new cluster
   - Get your connection string

4. Update the database configuration:
   - Open `backend/config.env`
   - Replace the `MONGODB_URI` with your actual MongoDB Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/todoapp?retryWrites=true&w=majority
   ```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Todos
- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get single todo
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion status

### Health Check
- `GET /api/health` - Server health status

## Project Structure

```
ToDo App/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── todoController.js
│   ├── models/
│   │   └── Todo.js
│   ├── routes/
│   │   └── todos.js
│   ├── config.env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.tsx
│   │   │   ├── TodoItem.tsx
│   │   │   └── TodoList.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── todo.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── index.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Usage

1. **Adding a Todo**: Click the "Add Todo" button in the header
2. **Editing a Todo**: Click the edit icon on any todo item
3. **Marking Complete**: Click the circle icon next to any todo
4. **Deleting a Todo**: Click the trash icon and confirm deletion
5. **Filtering**: Use the filter buttons to view All, Pending, or Completed todos

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start  # Starts development server with hot reload
```

### Building for Production

#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd frontend
npm run build
```

## Environment Variables

### Backend (`backend/config.env`)
```
PORT=5000
MONGODB_URI=your-mongodb-atlas-connection-string
NODE_ENV=development
```

### Frontend (`frontend/.env`)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Troubleshooting

### Common Issues

1. **Backend not connecting to MongoDB**
   - Check your MongoDB Atlas connection string
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Verify your database credentials

2. **Frontend not connecting to backend**
   - Ensure backend is running on port 5000
   - Check the REACT_APP_API_URL in frontend/.env
   - Verify CORS is enabled in backend

3. **Dependencies issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).


