const express = require('express');
const app = express();
const port = 3000;

// Custom middleware to check working hours
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hourOfDay = now.getHours();

  // Check if it's Monday to Friday and between 9 and 17 (5 PM)
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.send('The web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

// Apply the custom middleware to all routes
app.use(workingHoursMiddleware);

// Set up static files (CSS)
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
