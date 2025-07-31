import { SmartAPI } from 'smartapi-javascript';
import dotenv from 'dotenv';
import { totp } from 'otplib';

dotenv.config();

const smartApi = new SmartAPI({
  api_key: process.env.ANGEL_API_KEY
});

const totpToken = totp.generate(process.env.ANGEL_TOTP_SECRET);

console.log("🔑 TOTP Token:", totpToken);

smartApi.generateSession(process.env.ANGEL_CLIENT_CODE, process.env.ANGEL_CLIENT_SECRET, totpToken)
  .then((response) => {
    console.log("✅ Session Generated:");
    console.log(response);
  })
  .catch((err) => {
    console.error("❌ Error Generating Session:");
    console.error(err);
  });
