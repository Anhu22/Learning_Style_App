const express = require('express');
const Results = require('../models/Results');

const router = express.Router();

// Save results route
router.post('/save', async (req, res) => {
  try {
    const {
      schoolname,
      rollno,
      password,
      readWriteScore,
      readWriteTime,
      visualScore,
      visualTime,
      kinestheticScore,
      kinestheticTime,
      audioScore,
      audioTime,
      predictedStyle,
    } = req.body;

    const newResults = new Results({
      schoolname,
      rollno,
      password,
      readWriteScore,
      readWriteTime,
      visualScore,
      visualTime,
      kinestheticScore,
      kinestheticTime,
      audioScore,
      audioTime,
      predictedStyle,
    });

    await newResults.save();

    res.status(201).json({ message: 'Results saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
