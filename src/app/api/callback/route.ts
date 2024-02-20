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

function getAvatar (user: any) {
    if (user.avatar) {
        if (user.avatar.startsWith('a_')) {
            return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=2048`;
        } else {
            return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg?size=2048`;
        }
    } else {
        return `https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png?size=2048`;
    }
}

  
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

export async function GET(request: NextRequest, response: NextResponse) {
    if(!CLIENT_ID || !CLIENT_SECRET) throw new Error("missing envs");

    const code = request.nextUrl.searchParams.get("code") ?? '';
    
    if(!code || code === '') return new NextResponse(null, { status: 400, statusText: 'Bad Request, missing params' });

    const body = new URLSearchParams({
        grant_type: 'authorization_code',
        redirect_uri: `${NEXT_PUBLIC_URL}/callback`,
        code,
        scope
      }).toString();

    console.log(code)


    const responseToken = await fetch('https://discord.com/api/oauth2/token', {
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
         },
        method: 'POST',
        body
    }).then((res) => res.json()).catch(e => console.log(e));


    console.log(responseToken)

    // if (!access_token || typeof access_token !== 'string') return new NextResponse(null, { status: 401, statusText: 'Unauthorized' }); 

    const me: DiscordUser | { unauthorized: true } = await fetch('https://discord.com/api/v10/users/@me', {
        headers: { Authorization: `Bearer ${responseToken.access_token}` }
    }).then((res) => res.json());

    if (!('id' in me)) return new NextResponse(null, { status: 404, statusText: 'User Not Found' });;

    console.log("users/@me call");
    
    const userObject = {
        ...me,
        avatar: getAvatar(me), //string
    };

    return new NextResponse(JSON.stringify(userObject));
}

