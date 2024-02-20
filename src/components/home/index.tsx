"use client";

import React, {useState} from "react";
import Image from "next/image";
import { sendMessage } from "@/client/discord/webhook";
import InputProposal from "./InputProposal";
import Cookies from "js-cookie";

type Props = {
    user: {
        id: string,
        avatar: string,
        username: string
        global_name: string
    }
}

export function HomeComponent({user}: Props) {
    const [sent, setSent] = useState(false);
    const [ready, setReady] = useState(false);
    const [error, setError] = useState<boolean>(false)
    const [propuesta, setPropuesta] = useState("");

    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        await sendMessage(propuesta, `${user.username}`, `${user.avatar}`)
        .then(x => {
            setPropuesta('')
            setSent(true);
        })
        .catch(e => {
            setError(true)
        })
    }

    function handleSubmitAgain() {
        setSent(false)
    }

    function handleChangePropuesta(value: string) {
        setReady(false);
        setPropuesta(value);

        if (value.length > 0) {
            setReady(true);
        }
    }

    function exit() {
        Cookies.remove('puntoycomadsu');
        setTimeout(() => 
            window.location.reload()
        ,500)
    }

    return (
        <>

            {sent ? (
                <>
                    <div className="max-w-2xl mx-auto p-4">
                        <Image
                            src={'https://assets-global.website-files.com/6257adef93867e50d84d30e2/62a315f45888ab5517509314_b941bc1dfe379db6cc1f2acc5a612f41-p-500.webp'}
                            width={320} height={264} alt="discord flying" className="mx-auto animate-pulse"/>
                    </div>
                    <span className="text-white mx-auto">Propuesta enviada!</span>
                    <button
                        onClick={() => handleSubmitAgain()}
                        className={`p-3 w-full mt-8 md:w-1/4 flex-shrink rounded-lg bg-[#5865f2] text-neutral-50 font-bold text-md z-50 transition-all hover:bg-[#4553e6]`}>
                        Enviar otra
                    </button>
                </>

            ) : <>
                <div className="max-w-2xl mx-auto p-4">
                    <Image
                        src={'https://assets-global.website-files.com/6257adef93867e50d84d30e2/62a315f45888ab5517509314_b941bc1dfe379db6cc1f2acc5a612f41-p-500.webp'}
                        width={320} height={264} alt="discord flying" className="mx-auto animate-pulse"/>
                    <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-600  text-center font-sans font-bold">
                        {`<Punto&Coma />`}
                    </h1>
                    <p className="text-neutral-500 max-w-lg mx-auto my-2 text-center relative z-10">
                        Comunidad de Discord
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-3 mt-8">
                        <div className="flex-grow">
                            <InputProposal proposal={propuesta} onChange={handleChangePropuesta}/>
                        </div>
                        <button
                            disabled={!ready}
                            onClick={handleSubmit}
                            type="button"
                            className={`p-3 w-full mt-8 md:w-1/4 flex-shrink rounded-lg bg-[#5865f2] text-neutral-50 font-bold text-md z-50 transition-all ${ready ? "hover:bg-[#4553e6]" : "opacity-75"}`}>
                                Enviar
                        </button>
                    </div>
                </div>

                <div className="border-t border-[#5865f2] flex flex-col-reverse gap-10 md:flex-row justify-between mt-14 py-5 items-center w-11/12 max-w-2xl">
                    <div className='flex flex-row items-center justify-center gap-4'>
                        <a href="https://twitter.com/puntoycomaCo_" target="_blank"
                        className="text-neutral-50  rounded-full w-30 text-center text-3xl hover:opacity-75 transition-all z-50">𝕏</a>
                    </div>

                    <div className='flex items-center justify-center'>
                        <span className="border-4 border-green-500 rounded-full" />
                        <span className="mx-2 text-lg text-white">#{user.username}</span>
                        <button onClick={() => exit()} className="mx-2 text-lg text-white absolute bottom-4 right-4">exit</button>
                        <Image
                            src={user.avatar || "https://assets-global.website-files.com/6257adef93867e50d84d30e2/6257d23c5fb25be7e0b6e220_Open%20Source%20Projects%20_%20Discord-7.svg"}
                            alt="Discord footer"
                            className="rounded-full border border-1 border-[#5865f2]"
                            width={48}
                            height={48}
                        />
                    </div>
                </div>

            </>}

        </>
    );
}
