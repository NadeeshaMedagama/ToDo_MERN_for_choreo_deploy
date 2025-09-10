# Quick MongoDB Atlas Setup Guide

## 🚨 Current Issue
Your app is trying to connect to `your-cluster.mongodb.net` which is a placeholder. You need to set up MongoDB Atlas.

## 🔧 Quick Fix Steps

### 1. Create MongoDB Atlas Account
1. Go to [https://cloud.mongodb.com/](https://cloud.mongodb.com/)
2. Sign up for a free account
3. Create a new project

### 2. Create a Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0 Sandbox)
3. Select a region close to you
4. Click "Create Cluster"

### 3. Create Database User
1. Go to "Database Access" in the left menu
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and strong password
5. Set privileges to "Read and write to any database"
6. Click "Add User"

### 4. Configure Network Access
1. Go to "Network Access" in the left menu
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 5. Get Connection String
1. Go to "Database" in the left menu
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `todoapp`

### 6. Update Your Config
Update `backend/config.env` with your actual connection string:

```bash
# Replace this line in backend/config.env:
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/todoapp?retryWrites=true&w=majority

# With your actual connection string:
MONGODB_URI=mongodb+srv://nadeeshamedagama:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority
```

## ✅ After Setup
1. Restart your backend server
2. You should see: `MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net`
3. No more connection errors!

## 🔒 Security Note
- Never commit your actual MongoDB credentials to Git
- Use environment variables for production
- The current config.env has safe placeholder values
