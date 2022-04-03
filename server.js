const config = require("./config");
const express = require("express");
const { logger } = require("./logger");
const { authkey, port } = config;
const twilio = require("twilio");
const app = express();

app.get("/sendsms", async (req, res) => {
  const { msg, to_num, key, messagingServiceSid, accountSid, authToken } =
    req.query;

  if (!key || key != authkey) {
    logger.warn(`Invalid authkey ${req.ip} - ${key}`);
    return res.status(401).send("auth error");
  }

  try {
    const twilioClient = twilio(accountSid, authToken);
    logger.info(`Auth Success ${req.ip} - Sending SMS to ${to_num}: ${msg}`);

    const message = await twilioClient.messages.create({
      body: msg,
      messagingServiceSid: messagingServiceSid,
      to: to_num,
    });
    logger.info(`SMS Sent! - ${message.sid}`);
    res.status(200).send(`sms sent success: ${message.sid}`);
  } catch (error) {
    logger.error(error);
    res.send("error");
  }
});

app.listen(port,  () =>
  logger.info(`server started on port ${port}`)
);
