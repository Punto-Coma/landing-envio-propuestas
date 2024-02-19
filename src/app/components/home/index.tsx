"use client";
import React, {useState} from "react";
import {BackgroundGradient} from "../ui/background-gradient";
import Image from "next/image";
import {useLocalStorage} from "react-use";

export function HomeComponent() {
    const [loading, setLoading] = useState(false);
    const [ready, setReady] = useState(false);
    const [propuesta, setPropuesta] = useState("");
    const [discordConnected, setDiscordConnected] = React.useState(true);
    const [lsprofile, setLsProfile] = useLocalStorage<any>('DISCORD_PROFILE');

    // validate discord token?
    React.useEffect(() => {
        if (lsprofile) {
            setDiscordConnected(true);
        }
    }, [lsprofile]);


    function handleSubmit() {
        setLoading(true);
    }

    function handleSubmitAgain() {
        setLoading(false)
    }

    function handleChangePropuesta(value: string) {
        setReady(false);
        setPropuesta(value);

        if (value.length > 0 && discordConnected) {
            setReady(true);
        }
    }

    return (
        <>

            {loading ? (
                <>
                    <div className="max-w-2xl mx-auto p-4">
                        <Image
                            src={'https://assets-global.website-files.com/6257adef93867e50d84d30e2/62a315f45888ab5517509314_b941bc1dfe379db6cc1f2acc5a612f41-p-500.webp'}
                            width={320} height={264} alt="discord flying" className="mx-auto animate-pulse"/>
                    </div>
                    <p className="text-white">Propuesta enviada!</p>
                    <button
                        onClick={() => handleSubmitAgain()}
                        className="p-3 mx-auto w-25 rounded-full bg-[#5865f2] text-neutral-50 font-bold text-lg mt-4 hover:opacity-75 z-50 transition-all">
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
                    <BackgroundGradient className="rounded-lg p-0 bg-neutral-950 dark:bg-zinc-900 mt-8">
                        <input
                            type="text"
                            value={propuesta}
                            // this is giving me re renders on BackgroundGradient effect fix
                            placeholder="Ingresá tu propuesta de proyecto"
                            onChange={v => handleChangePropuesta(v.target.value)}
                            className="transition-all p-3 pl-4 rounded-lg border border-neutral-100 focus:ring-2 focus:ring-teal-500  w-full relative z-10   bg-neutral-950 placeholder:text-neutral-400 focus:placeholder:text-neutral-600 text-white"
                        />
                    </BackgroundGradient>
                    <div className="flex justify-between mt-4 pt-10 items-start w-full max-w-2xl mx-auto ">
                        {
                            ready && (
                                <button
                                    onClick={() => handleSubmit()}
                                    className="py-2 mx-auto w-36 rounded-full bg-[#5865f2] text-neutral-50 font-bold text-md mt-4 hover:opacity-75 z-50 transition-all">
                                    Enviar
                                </button>
                            )}
                    </div>
                </div>
                <div
                    className="border-t border-[#5865f2] flex flex-col gap-10 md:flex-row justify-between mt-14 py-10 items-center w-11/12 max-w-2xl">
                    <a data-track="logo" href="/" className="max-w-full inline-block">
                        <Image
                            src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/6257d23c5fb25be7e0b6e220_Open%20Source%20Projects%20_%20Discord-7.svg"
                            alt="Discord footer"
                            className="discord-footer"
                            width={124}
                            height={32}
                        />
                    </a>
                    {discordConnected ? (<>
                        <div className='flex items-center justify-center'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                color="#12d612"
                                className="inline-block w-6 h-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="ml-2 text-lg text-white">Connected to Discord</span>
                        </div>
                        </>
                    ) : null}
                </div>
                <div
                    className="flex flex-col gap-10 md:flex-row justify-between items-center w-11/12 max-w-2xl">
                        <a href="https://discord.gg/EbfYeBRq"
                           className="text-neutral-50 text-md rounded-full w-30 text-center  hover:opacity-75 transition-all z-50">
                            Join Our Discord
                        </a>

                        <a href="https://twitter.com/puntoycomaCo_" target="_blank"
                           className="text-neutral-50 text-md rounded-full w-30 text-center  hover:opacity-75 transition-all z-50">Follow on twitter</a>
                </div>

            </>}

        </>
    );
}
