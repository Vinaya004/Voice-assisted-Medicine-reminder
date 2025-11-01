const twilio = require('twilio');
require('dotenv').config(); // Load .env variables

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);

const sendSMS = async (numbers, message) => {
  try {
    const sendPromises = numbers.map(number =>
      client.messages.create({
        body: message,
        from: fromNumber,
        to: number
      })
    );

    await Promise.all(sendPromises);
    console.log("SMS sent successfully!");
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw new Error("Failed to send SMS");
  }
};

module.exports = sendSMS;
