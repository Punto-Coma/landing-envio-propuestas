'use client'

import Cookies from "js-cookie";
import { useEffect, useState } from "react"
import { useSearchParam } from "react-use"
import Image from "next/image";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

export default function Callback() {
    const code = useSearchParam("code")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | undefined>()

    useEffect(() => {
        const getUser = async () => {

                console.log("getUser...")
    
                const user = await fetch(`/api/callback?code=${code}`).then(r => r.json()).catch(e => console.log(e));
    
                if(user){
                    Cookies.set('puntoycomadsu', JSON.stringify(user), { path: '/', expires: 7 });
                    window.location.href = '/';
                } else {
                    setError("f");
                }
                setLoading(false)
        }

        if(code && !error) getUser()

    }, [])

    if(loading) return (<div className="flex flex-col justify-center items-center">
                            <Image
                            src={'https://assets-global.website-files.com/6257adef93867e50d84d30e2/62a315f45888ab5517509314_b941bc1dfe379db6cc1f2acc5a612f41-p-500.webp'}
                            width={160} height={132} alt="discord flying" className="mx-auto animate-bounce"/>
                        </div>);
    
    return (<>
        {error ? 
                <button
                    onClick={() => window.location.href = `https://discord.com/api/oauth2/authorize?client_id=1208381826092240897&redirect_uri=${NEXT_PUBLIC_URL}/callback&response_type=code&scope=identify+email+guilds+guilds.join`}
                    className={`p-3 w-full mt-8 md:w-1/4 flex-shrink rounded-lg bg-[#5865f2] text-neutral-50 font-bold text-md z-50 transition-all hover:bg-[#4553e6]`}>
                    Reintentar
            </button>
            : <></>}
    </>
    )

}
