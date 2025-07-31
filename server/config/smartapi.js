const { SmartAPI } = require("smartapi-javascript");
const { totp } = require("otplib");
require("dotenv").config();

const smartApi = new SmartAPI({
  api_key: process.env.ANGEL_API_KEY,
});

async function generateAngelSession() {
  try {
    const totpToken = totp.generate(process.env.ANGEL_TOTP_SECRET);

    // ✅ Debugging Line 1: Console me TOTP print karega
    console.log("🔑 Generated TOTP from env:", totpToken);

    // ✅ Debugging Line 2: Time bhi print karega taaki sync check ho sake
    console.log("🕒 Current System Time:", new Date().toLocaleString());

    const response = await smartApi.generateSession(
      process.env.ANGEL_CLIENT_CODE,
      process.env.ANGEL_CLIENT_SECRET,
      totpToken
    );

    console.log("✅ Session Generated:", response);
    return response;
  } catch (error) {
    console.error("❌ Error generating session:", error);
    throw error;
  }
}

module.exports = { smartApi, generateAngelSession };
