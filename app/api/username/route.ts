import { NextResponse } from "next/server"

export async function GET() {
    const res = await fetch("https://api.github.com/search/users?q=richard&per_page=3")
    const data = await res.json()
    return NextResponse.json(data)
}
