import { NextResponse } from "next/server";
export async function POST(request){
    const {url} = await request.json();
    const  req = await fetch("http://127.0.0.1:8000/predict",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({url})
    });
    const data = await req.json();
    return NextResponse.json(data);
}