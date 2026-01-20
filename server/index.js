const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gridfs-demo';

const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Initialize GridFS
let gridfsBucket;

conn.once('open', () => {
  // Initialize GridFS Bucket
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });

  console.log('GridFS initialized');
});

// Use memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes

// @route   POST /upload
// @desc    Upload file to GridFS
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filename = `${Date.now()}-${req.file.originalname}`;

    // Create upload stream
    const uploadStream = gridfsBucket.openUploadStream(filename, {
      contentType: req.file.mimetype
    });

    // Write file buffer to GridFS
    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', () => {
      res.json({
        success: true,
        file: {
          filename: filename,
          id: uploadStream.id,
          contentType: req.file.mimetype,
          size: req.file.size
        }
      });
    });

    uploadStream.on('error', (error) => {
      res.status(500).json({ error: error.message });
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// @route   GET /files
// @desc    Get all files
app.get('/files', async (req, res) => {
  try {
    const files = await gridfsBucket.find().toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'No files found' });
    }

    return res.json(files);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// @route   GET /files/:filename
// @desc    Get file metadata by filename
app.get('/files/:filename', async (req, res) => {
  try {
    const files = await gridfsBucket.find({ filename: req.params.filename }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    return res.json(files[0]);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// @route   GET /image/:filename
// @desc    Display image
app.get('/image/:filename', async (req, res) => {
  try {
    const files = await gridfsBucket.find({ filename: req.params.filename }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }

    const file = files[0];

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png' || file.contentType === 'image/jpg') {
      // Read output to browser
      const readStream = gridfsBucket.openDownloadStreamByName(req.params.filename);
      readStream.pipe(res);
    } else {
      res.status(404).json({ error: 'Not an image' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// @route   DELETE /files/:id
// @desc    Delete file
app.delete('/files/:id', async (req, res) => {
  try {
    await gridfsBucket.delete(new mongoose.Types.ObjectId(req.params.id));
    res.json({ success: true, message: 'File deleted' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
