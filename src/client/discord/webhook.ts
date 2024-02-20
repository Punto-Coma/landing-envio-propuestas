'use server'
export const sendMessage = async (message: string, author:string, authorImgUrl: string) => {
    if(!process?.env?.DISCORD_WEBHOOK_PROPOSALS) return null
    await fetch(process.env.DISCORD_WEBHOOK_PROPOSALS as string,{
        method: 'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({  "embeds": [
            {
              "title": "✨ Nueva Propuesta ✨ ",
              "description": `*${message}*\n`,
              "timestamp": new Date(),
              "footer": {
                "text": "<Punto&Coma/>"
              },
              "author": {
                "name": `${author ?? ''}`,
                "icon_url": `${authorImgUrl ?? ''}`
              },
              "fields": []
            }
          ],})
    })
}