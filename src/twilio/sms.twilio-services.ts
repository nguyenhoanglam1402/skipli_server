const accountSid = ""; //Account SID of Twilio;
const authToken = ""; //Auth Token of Twilio;

const client = require("twilio")(accountSid, authToken, {
  autoRetry: true,
  maxRetries: 3,
});

export const sendSMSService = (phoneNumber: string, otp: string) => {
  client.messages
    .create({
      body: `Your OTP is ${otp}`,
      from: "+14093598279",
      to: phoneNumber,
    })
    .then((message: any) => {
      console.log(
        "🚀 ~ file: sms.twilio-services.ts:20 ~ sendSMSService ~ message",
        message
      );
    });
};
