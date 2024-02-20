'use client'

import Cookies from "js-cookie";
import { HomeComponent } from "../components/home";
import { Login } from "../components/home/login";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState()

  useEffect(() => {
      const puntoycomadsuCookie = Cookies.get('puntoycomadsu');
      
      if(puntoycomadsuCookie){
        setUser(JSON.parse(puntoycomadsuCookie));
        setAuthenticated(true);
      }

      setTimeout(() =>
        setLoading(false)
      , 1000)


    },[])
    
    if(loading)
      return (<div className="flex flex-col justify-center items-center">
        <Image
          src={'https://assets-global.website-files.com/6257adef93867e50d84d30e2/62a315f45888ab5517509314_b941bc1dfe379db6cc1f2acc5a612f41-p-500.webp'}
          width={160} height={132} alt="discord flying" className="mx-auto animate-bounce"/>
      </div>);


    return (<>
    {
    !authenticated ?
      <Login />
      :
      user ? <HomeComponent user={user}/> : "F"
    }
    </>)
}
