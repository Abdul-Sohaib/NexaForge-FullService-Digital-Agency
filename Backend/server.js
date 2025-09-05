const express = require('express');
   const mongoose = require('mongoose');
   const cors = require('cors');
   const reviewRoutes = require('./routes/reviews');
   const contactRoutes = require('./routes/contact');
   require('dotenv').config();

   const app = express();
   const allowedOrigins = [
     process.env.FRONTEND_URL || 'https://nexa-forge-full-service-digital-age.vercel.app',
    //  process.env.FRONTEND_URL || 'http://localhost:5173',
   ];
   app.use(cors({
     origin: (origin, callback) => {
       if (!origin || allowedOrigins.includes(origin)) {
         callback(null, true);
       } else {
         callback(new Error('Not allowed by CORS'));
       }
     },
     methods: ['GET', 'POST'],
     credentials: true,
   }));
   app.use(express.json());

   const connectDB = async () => {
     try {
       const conn = await mongoose.connect(process.env.MONGO_URI, {
         serverSelectionTimeoutMS: 30000,
         connectTimeoutMS: 30000,
         socketTimeoutMS: 30000,
         retryWrites: true,
         w: 'majority',
       });
       console.log(`MongoDB Connected: ${conn.connection.host}`);
       mongoose.connection.on('error', (err) => {
         console.error('MongoDB connection error:', err);
       });
       mongoose.connection.on('disconnected', () => {
         console.log('MongoDB disconnected');
       });
       mongoose.connection.on('reconnected', () => {
         console.log('MongoDB reconnected');
       });
     } catch (error) {
       console.error('MongoDB connection failed:', error);
       if (error.name === 'MongooseServerSelectionError') {
         console.error('\n Connection Tips:');
         console.error('1. Check if your IP is whitelisted in MongoDB Atlas');
         console.error('2. Verify your username and password in the connection string');
         console.error('3. Ensure your cluster is not paused');
         console.error('4. Check your network connectivity');
       }
       process.exit(1);
     }
   };

   connectDB();

   app.use('/api/reviews', reviewRoutes);
   app.use('/api/contact', contactRoutes);

   app.get('/health', (req, res) => {
     res.json({
       status: 'OK',
       mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
       timestamp: new Date().toISOString(),
     });
   });

   app.use((err, req, res, next) => {
     console.error(err.stack);
     res.status(500).json({ error: 'Something went wrong!' });
   });

   process.on('SIGINT', async () => {
     console.log('\nShutting down gracefully...');
     await mongoose.connection.close();
     console.log('MongoDB connection closed');
     process.exit(0);
   });

   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
     console.log(`Health check available at http://localhost:${PORT}/health`);
   });