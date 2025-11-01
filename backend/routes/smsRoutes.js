// const express = require('express');
// const sendSMS = require('../utils/sendMsg');
// const router = express.Router();

// router.post('/send', async (req, res) => {
//   try {
//     const { numbers, message } = req.body; // Receive numbers and message from frontend
//     await sendSMS(numbers, message);
//     res.status(200).json({ success: true, message: "SMS sent successfully!" });
//   } catch (error) {
//     // res.status(500).json({ success: false, error: error.message });
//   }
// });

// module.exports = router;


const express = require('express');
const sendSMS = require('../utils/sendMsg');
const router = express.Router();

router.post('/send', async (req, res) => {
  try {
    const { numbers, message } = req.body;

    if (!numbers || !message) {
      return res.status(400).json({ success: false, error: "Missing numbers or message!" });
    }

    await sendSMS(numbers, message);
    res.status(200).json({ success: true, message: "SMS sent successfully!" });
  } catch (error) {
    console.error("SMS sending error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
