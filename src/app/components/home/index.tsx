"use client";
import React, {useState} from "react";
import {BackgroundBeams} from "../ui/background-beams";
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
        <div className="h-screen w-full rounded-md relative flex flex-col items-center justify-center antialiased">
            <BackgroundBeams className="bg-neutral-950 -z-50"/>

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
                            ) : (
                                <a
                                    href={`https://discord.com/api/oauth2/authorize?client_id=908033603190013952&redirect_uri=https%3A%2F%2Fstarhorizonsdemo.web.app%2Fcallback&response_type=code&scope=identify%20email%20guilds%20guilds.join`}
                                    target="_blank"
                                    className="flex justify-between btn btn-ghost items-center" rel="noreferrer"
                                >
                                    <svg width={71} height={55} viewBox="0 0 71 55" fill="none"
                                         xmlns="http://www.w3.org/2000/svg"
                                         className="inline-block w-6 h-6 stroke-current">
                                        <g clipPath="url(#clip0)">
                                            <path
                                                d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                                                fill="#ffffff"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width={71} height={55} fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span className="ml-2 text-lg text-white">Connect with Discord</span>
                                </a>
                            )}

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

        </div>
    );
}
