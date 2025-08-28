const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// ✅ Define POST /api/feedback route
app.post('/api/feedback', (req, res) => {
  const { category, description, email } = req.body;

  if (!category || !description || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  console.log('Feedback received:', req.body);
  res.status(200).json({ message: 'Feedback received successfully' });
});

// Optional health check route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`✅ Server listening at http://localhost:${port}`);
});
