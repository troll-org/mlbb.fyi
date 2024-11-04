import { NextResponse } from "next/server";
import getHeroes from "../../../lib/actions/getHeroes";

export async function GET(request: Request) {
  const heroes = await getHeroes();

  return NextResponse.json(heroes, {
    status: 200,
  });
}
