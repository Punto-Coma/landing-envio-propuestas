"use client"
import { BackgroundGradient } from '../ui/background-gradient'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '../ui/button'

const formSchema = z.object({
  proposal: z.string({
    required_error: "No puede estar vacío",
  })
  .trim()
  .min(10, "Al menos 10 caracteres")
  .max(50, "Máximo 50 caracteres")
})

interface Props {
    onSubmit: (data: { proposal: string }) => void
}

function InputProposal({ onSubmit }: Props ) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

  return (
    <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row md:items-baseline gap-3 mt-20">
          <div className='flex-grow'>
            <FormField
                control={form.control}
                name="proposal"
                render={({ field }) => (
                  <FormItem className='relative'>
                    <FormControl>
                      <BackgroundGradient className="rounded-lg p-0 bg-neutral-950 dark:bg-zinc-900">
                        <input 
                        {...field}
                        autoComplete='off'
                        type='text'
                        placeholder='Ingresá tu propuesta de proyecto...'
                        className="transition-all p-3 pl-4 rounded-lg border border-neutral-100 focus:ring-2 focus:ring-teal-500 w-full z-10 outline-none bg-neutral-950 placeholder:text-neutral-400 focus:placeholder:text-neutral-600 text-white" />
                      </BackgroundGradient>
                    </FormControl>
                    <FormMessage className='absolute -top-9' />
                </FormItem>
                )}
              />
          </div>
          <Button type="submit" className='md:w-1/4 flex-shrink '>
            Enviar
          </Button>
        </form>
    </Form>
  )
}

export default InputProposal