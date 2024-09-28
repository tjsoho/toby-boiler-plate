import { Database } from "@/libs/database";
import { NextResponse, NextRequest } from "next/server";

// Route to capture email addresses
export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const db = new Database();
    const userFound = await db.getUserByEmail(email);

    if (!userFound) {
      await db.createWaitlistUser(email);
      // User is added to the "waitlist" in DB. You can send email confirmation from here, etc.
    }

    return NextResponse.json({});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
