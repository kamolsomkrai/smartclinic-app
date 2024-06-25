// app/api/tambon/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_revert_tambon_with_amphure_province.json"
  );
  const data = await response.json();
  return NextResponse.json(data);
}
