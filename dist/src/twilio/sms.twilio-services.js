"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMSService = void 0;
const accountSid = ""; //Account SID of Twilio;
const authToken = ""; //Auth Token of Twilio;
const client = require("twilio")(accountSid, authToken, {
    autoRetry: true,
    maxRetries: 3,
});
const sendSMSService = (phoneNumber, otp) => {
    client.messages
        .create({
        body: `Your OTP is ${otp}`,
        from: "+14093598279",
        to: phoneNumber,
    })
        .then((message) => {
        console.log("🚀 ~ file: sms.twilio-services.ts:20 ~ sendSMSService ~ message", message);
    });
};
exports.sendSMSService = sendSMSService;
