"use client"
import * as z from "zod"
import { cn } from "@/lib/utils"
import type { Ingredients } from "@prisma/client"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IngredientSchema } from "@/schemas"
import { newIngredientAction, updateIngredientAction } from "@/actions/ingredients"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CancelButton, LoadingButton, SaveButton } from "@/components/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/utils/heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Check, ChevronsUpDown } from "lucide-react"

interface UpdateIngredientFormProps {
  initialData: Ingredients
}

export const NewIngredientForm = ({products}: {products: any}) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof IngredientSchema>>({
    resolver:zodResolver(IngredientSchema),
    defaultValues:{ name:"", price:"", stock:"" },
  })
  const onSubmit = (values: z.infer<typeof IngredientSchema>) => {
    startTransition(() => {
      newIngredientAction(values).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/ingredients")
    })
  }
  return (
    <>
      <Heading title="Bahan Baku Baru." description="Isikan data bahan baku baru."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-96 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Bahan Baku</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="price" render={({ field }) => (
              <FormItem>
                <FormLabel>Harga (Rp)</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="stock" render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            {isPending ? 
              <LoadingButton/>
            :
              <div className="flex gap-4">
                <CancelButton href="/ingredients"/>
                <SaveButton/>
              </div>
            }
          </form>
        </Form>
      </div>
    </>
  )
}

export const UpdateIngredientForm: React.FC<UpdateIngredientFormProps> = ({initialData}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof IngredientSchema>>({
    resolver:zodResolver(IngredientSchema),
    defaultValues: initialData,
  })
  const onSubmit = (values: z.infer<typeof IngredientSchema>) => {
    startTransition(() => {
      updateIngredientAction(initialData.id, values).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/ingredients")
    })
  }
  return (
    <>
      <Heading title="Ubah Data Bahan Baku." description="Isikan data bahan baku dengan benar."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-96 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Bahan Baku</FormLabel>
                <FormControl><Input {...field} disabled/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="price" render={({ field }) => (
              <FormItem>
                <FormLabel>Harga (Rp)</FormLabel>
                <FormControl><Input {...field} disabled/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="stock" render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            {isPending ? 
              <LoadingButton/>
            :
              <div className="flex gap-4">
                <CancelButton href="/ingredients"/>
                <SaveButton/>
              </div>
            }
          </form>
        </Form>
      </div>
    </>
  )
}