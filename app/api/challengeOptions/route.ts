import db from "@/db/drizzle"
import { challengeOptions } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    if (!getIsAdmin()) {
        return new NextResponse("Unauthorized", {status: 401})
    }
    const { searchParams } = new URL(request.url);
    const sortField = JSON.parse(searchParams.get('sort') || "['id', 'DESC']");
    const sortOrder = sortField[1] === 'DESC' ? 'desc' : 'asc'; 
    const data = await db.query.challengeOptions.findMany({
        orderBy: (challengeOption, {asc, desc}) => [sortOrder === 'desc' ? desc(challengeOption.id) : asc(challengeOption.id)],
    });
    return NextResponse.json(data);
}

export const POST = async (req: Request) => {
    if (!getIsAdmin()) {
        return new NextResponse("Unauthorized", {status: 401})
    }

    const body = await req.json();

    const data = await db.insert(challengeOptions).values({
        ...body
    }).returning()
    
    return NextResponse.json(data[0]);
}