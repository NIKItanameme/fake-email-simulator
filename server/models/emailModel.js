// server/models/emailModel.js
const fs = require('fs');
const path = require('path');

const emailFilePath = path.join(__dirname, '..', 'emails.json');

// Function to create a fake email
const createEmail = (req, res) => {
  const { sender, recipient, subject, message } = req.body;

  const newEmail = {
    sender,
    recipient,
    subject,
    message,
    dateSent: new Date().toISOString(),
  };

  // Read existing emails from the file
  fs.readFile(emailFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading emails.' });
    }

    const emails = data ? JSON.parse(data) : [];
    emails.push(newEmail);

    // Save new emails back to the file
    fs.writeFile(emailFilePath, JSON.stringify(emails, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error saving email.' });
      }

      res.status(201).json({ message: 'Email created!', email: newEmail });
    });
  });
};

// Function to get all emails
const getEmails = (req, res) => {
  fs.readFile(emailFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading emails.' });
    }

    const emails = data ? JSON.parse(data) : [];
    res.status(200).json({ emails });
  });
};

module.exports = { createEmail, getEmails };
