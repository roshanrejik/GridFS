# GridFS File Upload - MERN Stack

This project demonstrates how to use MongoDB GridFS to store and retrieve large files (images) in a MERN stack application.

## What is GridFS?

GridFS is a specification for storing and retrieving large files in MongoDB. It divides files into smaller chunks (typically 255KB) and stores them as separate documents. This is useful for files larger than the BSON document size limit of 16MB.

## Features

- ✅ Upload large image files to MongoDB using GridFS
- ✅ Store files in chunks automatically
- ✅ Retrieve and display images from GridFS
- ✅ List all uploaded files with metadata
- ✅ Modern, responsive UI with gradient design
- ✅ Real-time upload feedback

## Project Structure

```
├── server/              # Backend (Node.js + Express)
│   ├── index.js        # Server with GridFS configuration
│   ├── package.json
│   └── .env
└── client/             # Frontend (React)
    ├── src/
    │   ├── App.js      # Main component
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

## Installation

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

## Configuration

Edit `server/.env` to configure your MongoDB connection:

```env
MONGODB_URI=mongodb://localhost:27017/gridfs-demo
PORT=5000
```

## Running the Application

### 1. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Or run manually
mongod
```

### 2. Start Backend Server

```bash
cd server
npm start
# or for development with auto-reload
npm run dev
```

The server will start on `http://localhost:5000`

### 3. Start Frontend Client

In a new terminal:

```bash
cd client
npm start
```

The React app will open at `http://localhost:3000`

## How It Works

### Backend (GridFS Implementation)

1. **GridFS Storage Configuration**: Uses `multer-gridfs-storage` to configure Multer to store files in GridFS
2. **File Upload**: Files are automatically chunked and stored in the `uploads.files` and `uploads.chunks` collections
3. **File Retrieval**: Uses GridFSBucket to stream files back to the client

### API Endpoints

- `POST /upload` - Upload a file
- `GET /files` - Get all files metadata
- `GET /files/:filename` - Get specific file metadata
- `GET /image/:filename` - Stream/display an image
- `DELETE /files/:id` - Delete a file

### Frontend (React)

- File selection with validation
- FormData API to send files to backend
- Axios for HTTP requests
- Image gallery displaying uploaded files
- Modern UI with gradients and animations

## Usage

1. Open the application at `http://localhost:3000`
2. Click "Choose File" and select an image
3. Click "Upload Image"
4. The image will appear in the gallery below
5. All images are stored in MongoDB using GridFS

## MongoDB Collections

GridFS creates two collections:

- `uploads.files` - Stores file metadata (filename, size, contentType, etc.)
- `uploads.chunks` - Stores the actual file data in chunks

You can view these in MongoDB Compass or mongo shell:

```bash
mongo
use gridfs-demo
db.uploads.files.find()
db.uploads.chunks.find()
```

## Technologies Used

### Backend
- Express.js - Web framework
- Mongoose - MongoDB ODM
- Multer - File upload middleware
- multer-gridfs-storage - GridFS storage engine for Multer
- gridfs-stream - GridFS streaming
- CORS - Cross-origin resource sharing
- dotenv - Environment variables

### Frontend
- React - UI library
- Axios - HTTP client
- Modern CSS with gradients and animations

## Benefits of GridFS

1. **Large File Support**: Store files larger than 16MB BSON limit
2. **Chunking**: Automatic file chunking for efficient storage
3. **Streaming**: Stream files without loading entire file into memory
4. **Metadata**: Store custom metadata with files
5. **Range Queries**: Retrieve specific chunks or byte ranges

## License

MIT
# GridFS
