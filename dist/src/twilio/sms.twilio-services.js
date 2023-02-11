"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMSService = void 0;
const accountSid = "ACc1c1b5bcd3596df5fd128cb030f0f422";
const authToken = "f9cd1352eb759ec3209a6f54b2069a55";
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
