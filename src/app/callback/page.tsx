'use client'

import { useEffect, useState } from "react"
import { useSearchParam } from "react-use"

type User = {
    nickname: string;
    tag: string;
    id: number;
    locale: string;
    email: string;
    avatar: string;
    nitroStatus: string;
}

export default function Callback() {
    const code = useSearchParam("code")
    const [user, setUser] = useState<User | undefined>()
    const [error, setError] = useState<string | undefined>()

    useEffect(() => {
        const getUser = async () => {

                console.log("getUser...")
    
                const user = await fetch(`/api/callback?code=${code}`).then(r => r.json()).catch(e => console.log(e));
    
                if(user)
                    setUser(user)
                else
                    setError("f") 
    
            
        }

        if(code && !user && !error) getUser()

    }, [])
    return(<>
    <pre>
        {user ? JSON.stringify(user, null, 2): error}
    </pre>
    </>)
}
