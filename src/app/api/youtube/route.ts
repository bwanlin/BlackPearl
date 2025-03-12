import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

interface IYt_link {
    yt_link: string
}

export async function GET(_request: Request) {
    // faire des trucs avec le header peut etre genre verifier la presence d'un token
    // ce renseigner sur les sessions
    try {
        const data = await prisma.ytlink.findMany()
        return Response.json({ message: "ok", data: data }, { status: 200 });
    } catch(err) {
        return Response.json({ message: "error findmany youtube" }, { status: 500 });
    }
}

export async function POST(request: Request, response: Response) {
    const data: IYt_link = await request.json()
    // verifie que c'est un lien youtube
    const re = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm
    const mt = data.yt_link.match(re)
    if (mt === null)
        return NextResponse.json({ message: "Ceci n'est pas un lien youtube" }, { status: 400 })
    // create
    try {
        const created = await prisma.ytlink.create({
            data: {
                url: data.yt_link
            }
        })
        return NextResponse.json({ message: "ok", id: created.id }, { status: 200 });
    } catch(err) {
        return NextResponse.json({ message: "failed to create url from yt_link" }, { status: 500 });
    }

}