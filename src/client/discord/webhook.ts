'use server'
export const sendMessage = async (message: string) => {
    await fetch(process.env.DISCORD_WEBHOOK_PROPOSALS as string,{
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({content:message})
    })
}