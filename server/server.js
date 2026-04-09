javascript
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

// ডটএনভ কনফিগ
dotenv.config();

// ডাটাবেস কানেক্ট
connectDB();

const app = express();

// মিডলওয়্যার
app.use(cors()); // এটি ফ্রন্টএন্ডকে ব্যাকএন্ডে রিকোয়েস্ট করার পারমিশন দেবে
app.use(express.json()); // JSON ডাটা রিসিভ করার জন্য

// রাউটস
app.use('/api/auth', authRoutes);

// টেস্ট রাউট
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
