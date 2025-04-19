const express = require('express');
const router = express.Router();
const { createEmail, getEmails } = require('../models/emailModel');

// GET all emails
router.get('/', getEmails);

// POST a new email
router.post('/', createEmail);

module.exports = router;
