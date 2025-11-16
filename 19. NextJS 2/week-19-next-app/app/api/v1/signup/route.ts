import prismaClient from "../../../lib/db";
import { NextRequest, NextResponse } from "next/server";

/* Import the client */
export async function POST(req: NextRequest) {
    const data = await req.json();

    /* The generated prisma client lets us store the data in the database */
    await prismaClient.user.create({
        data: {
            username: data.username,
            password: data.password
        }
    });

    console.log(data);

    return NextResponse.json({
        message: "You have been signed up"
    })
}

// export async function GET(req: NextRequest) {

// }
