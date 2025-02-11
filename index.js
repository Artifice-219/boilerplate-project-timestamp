// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

app.get('/api/:date?', (req, res) => {
  let date = req.params.date;

  // If no date is provided, use the current date and time
  if (!date) {
    date = Date.now();
  }

  // Check if the dateParam is a valid Unix timestamp (a number and not NaN)
  let dateObj;

  if (!isNaN(date)) {
    // If it's a valid number, treat it as a Unix timestamp
    dateObj = new Date(Number(date));
  } else {
    // Otherwise, treat it as a date string
    dateObj = new Date(date);
  }

  // If the date is invalid, return an error message
  if (isNaN(dateObj.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Construct the response with both Unix and UTC time
  const unixTimestamp = dateObj.getTime();
  const utcString = dateObj.toUTCString();

  res.json({
    unix: unixTimestamp,
    utc: utcString
  });
});



var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
