import axios from "axios";

export async function sendSMS(phone, message) {
  await axios.post("https://api.ng.termii.com/api/sms/send", {
    to: phone,
    from: "School",
    sms: message,
    type: "plain",
    channel: "generic",
    api_key: process.env.TERMII_API_KEY,
  });
}
