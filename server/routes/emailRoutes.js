const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to the emails.json file
const emailsFilePath = path.join(__dirname, '../emails.json');

// GET all emails
router.get('/', (req, res) => {
  fs.readFile(emailsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading emails' });
    }
    res.json(JSON.parse(data));
  });
});

// POST a new email
router.post('/', (req, res) => {
  const { from, to, subject, body } = req.body;

  if (!from || !to || !subject || !body) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newEmail = {
    id: Date.now(),
    from,
    to,
    subject,
    body
  };

  fs.readFile(emailsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading emails' });
    }
    
    const emails = JSON.parse(data);
    emails.push(newEmail);

    fs.writeFile(emailsFilePath, JSON.stringify(emails, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error saving email' });
      }
      res.status(201).json(newEmail);
    });
  });
});

module.exports = router;
