import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/actions/user";

export async function GET() {
  try {
    const user = await getCurrentUser();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
