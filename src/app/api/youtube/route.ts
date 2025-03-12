import { NextResponse } from "next/server";

export async function GET(request: Request) {
    return Response.json({ message: "Hello !"});
}

interface IYt_link {
    yt_link: string
}

export async function POST(request: Request, response: Response) {
    const data: IYt_link = await request.json()
    // verifie que c'est un lien youtube
    const re = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm
    const mt = data.yt_link.match(re)
    if (mt === null)
        return NextResponse.json({ message: "Ceci n'est pas un lien youtube" }, { status: 400 })
    // create
    
    return NextResponse.json({ message: "ok" }, { status: 200 });
}