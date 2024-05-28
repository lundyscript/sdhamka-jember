"use client"
import * as z from "zod"
import type { Buyers } from "@prisma/client"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { BuyerSchema } from "@/schemas"
import { newBuyerAction, updateBuyerAction } from "@/actions/buyers"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CancelButton, LoadingButton, SaveButton } from "@/components/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/utils/heading"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface UpdateBuyerFormProps {
  initialData: Buyers
}

export const NewBuyerForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof BuyerSchema>>({
    resolver:zodResolver(BuyerSchema),
    defaultValues:{ name:"", phoneNumber: "", address:"", notes:"" },
  })
  const onSubmit = (values: z.infer<typeof BuyerSchema>) => {
    startTransition(() => {
      newBuyerAction(values).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/buyers")
    })
  }
  return (
    <>
      <Heading title="Pelanggan Baru." description="Isikan data pelanggan baru."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-96 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Pelanggan</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="phoneNumber" render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="address" render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Rumah</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="notes" render={({ field }) => (
              <FormItem>
                <FormLabel>Catatan</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            {isPending ? 
              <LoadingButton/>
            :
              <div className="flex gap-4">
                <CancelButton href="/buyers"/>
                <SaveButton/>
              </div>
            }
          </form>
        </Form>
      </div>
    </>
  )
}

export const UpdateBuyerForm: React.FC<UpdateBuyerFormProps> = ({initialData}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof BuyerSchema>>({
    resolver:zodResolver(BuyerSchema),
    defaultValues: initialData,
  })
  const onSubmit = (values: z.infer<typeof BuyerSchema>) => {
    startTransition(() => {
      updateBuyerAction(initialData.id, values).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/buyers")
    })
  }
  return (
    <>
      <Heading title="Ubah Data Pelanggan." description="Isikan data pelanggan dengan benar."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-96 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Pelanggan</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="phoneNumber" render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="address" render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Rumah</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="notes" render={({ field }) => (
              <FormItem>
                <FormLabel>Catatan</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            {isPending ? 
              <LoadingButton/>
            :
              <div className="flex gap-4">
                <CancelButton href="/buyers"/>
                <SaveButton/>
              </div>
            }
          </form>
        </Form>
      </div>
    </>
  )
}