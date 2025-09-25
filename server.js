import express from "express";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// API Route to verify Google Token
app.post("/auth/google", express.json(), async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload(); // user info: email, name, picture
    res.json({ user: payload });
  } catch (error) {
    res.status(401).json({ error: "Invalid Google Token" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
