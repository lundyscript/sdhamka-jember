"use client"
import * as z from "zod"
import type { Products } from "@prisma/client"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProductSchema } from "@/schemas"
import { newProductAction, updateProductAction } from "@/actions/products"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CancelButton, LoadingButton, SaveButton } from "@/components/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/utils/heading"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

interface UpdateProductsFormProps {
  initialData: Products
}

export const NewProductForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver:zodResolver(ProductSchema),
    defaultValues:{ name:"", description:"", price: "", stock: ""},
  })
  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    startTransition(() => {
      newProductAction(values).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/products")
    })
  }
  return (
    <>
      <Heading title="Produk Baru." description="Isikan data produk baru."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-96 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Produk</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
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
                <FormLabel>Stok</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            {isPending ? 
              <LoadingButton/>
            :
              <div className="flex gap-4">
                <CancelButton href="/products"/>
                <SaveButton/>
              </div>
            }
          </form>
        </Form>
      </div>
    </>
  )
}

export const UpdateProductForm: React.FC<UpdateProductsFormProps> = ({initialData}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver:zodResolver(ProductSchema),
    defaultValues: initialData,
  })
  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    startTransition(() => {
      updateProductAction(initialData.id, values).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/products")
    })
  }
  return (
    <>
      <Heading title="Ubah Data Produk." description="Isikan data produk dengan benar."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-96 mx-auto justify-center">
      <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Produk</FormLabel>
                <FormControl><Input {...field} disabled/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
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
            {isPending ? 
              <LoadingButton/>
            :
              <div className="flex gap-4">
                <CancelButton href="/products"/>
                <SaveButton/>
              </div>
            }
          </form>
        </Form>
      </div>
    </>
  )
}