const express = require('express');
const cors = require('cors');
require('dotenv').config();

const symptomCheckerRoute = require('./routes/symptomChecker');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Melahealth Backend Server');
});

app.use('/api/symptom-checker', symptomCheckerRoute);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});