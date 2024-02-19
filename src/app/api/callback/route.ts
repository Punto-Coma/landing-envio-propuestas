// app/api/logto/user/route.ts
import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'edge';

const scope = ['identify'].join(' ');

export interface DiscordUser {
    id: string;
    username: string;
    avatar?: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    locale: string;
    mfa_enabled: boolean;
    premium_type: number;
  }

  
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export async function GET(request: NextRequest, response: NextResponse) {
    if(!CLIENT_ID || !CLIENT_SECRET) throw new Error("missing envs");

    const code = request.nextUrl.searchParams.get("code") ?? '';
    
    if(!code || code === '') return new NextResponse(null, { status: 400, statusText: 'Bad Request, missing params' });

    const body = new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3000',
        code,
        scope
      }).toString();

    console.log(code)

    
    const { access_token = null, token_type = 'Bearer' } = await fetch('https://discord.com/api/oauth2/token', {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        body
    }).then((res) => res.json()).catch(e => console.log(e));

    console.log(access_token)

    if (!access_token || typeof access_token !== 'string') return new NextResponse(null, { status: 401, statusText: 'Unauthorized' }); 

    const me: DiscordUser | { unauthorized: true } = await fetch('https://discord.com/api/users/@me', {
        headers: { Authorization: `${token_type} ${access_token}` }
    }).then((res) => res.json());

    if (!('id' in me)) return new NextResponse(null, { status: 404, statusText: 'User Not Found' });;

    console.log("users/@me call");
    
    // const userObject = {
    //     nickname: me.username, //string
    //     tag: me.discriminator, //string
    //     id: me.id, //string? or number
    //     locale: me.locale, //string
    //     email: me.email, //string
    //     avatar: getAvatar(me), //string
    //     nitroStatus: nitro(me)  //string
    //     // guilds: guilds(response3.data), //[]
    // };

    console.log("Sending response: ", me);
    
    return new NextResponse(JSON.stringify(me));
}

