const express = require('express');
const pdf = require('../controllers/pdf');
const router = express.Router();

router.post('/convert', pdf.convert);

module.exports = router;
