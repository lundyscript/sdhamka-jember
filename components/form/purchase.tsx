"use client"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Purchases } from "@prisma/client"
import { PurchaseSchema } from "@/schemas"
import { newPurchaseAction, updatePurchaseAction } from "@/actions/purchases"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CancelButton, LoadingButton, SaveButton } from "@/components/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/utils/heading"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { format } from "date-fns"

interface UpdatePurchasesFormProps {
  initialData: Purchases
}

export const NewPurchaseForm = ({ingredients}: {ingredients: any}) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof PurchaseSchema>>({
    resolver:zodResolver(PurchaseSchema),
    defaultValues:{ name:"", price:"", quantity:"", purchasedAt: new Date()},
  })
  const onSubmit = (values: z.infer<typeof PurchaseSchema>) => {
    startTransition(() => {
      newPurchaseAction(values).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/purchases")
    })
  }
  return (
    <>
      <Heading title="Pembelian Baru." description="Isikan data pembelian bahan baku produksi baru."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-96 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem className="flex flex-col space-y-3 mt-0.5 pt-1">
                <FormLabel>Nama Barang</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" role="combobox" className={cn("justify-between", !field.value && "text-muted-foreground")}>
                        {field.value ? ingredients.find((ingredient: { name: string }) => ingredient.name === field.value )?.name : "Pilih Bahan Baku"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                    <Command>
                      <CommandInput placeholder="Cari bahan baku..." />
                      <CommandEmpty>Tidak ada data.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {ingredients.map((ingredient: { name: string; stock: string }) => (
                            <CommandItem className="hover:cursor-pointer flex flex-row justify-between" value={ingredient.name} key={ingredient.name} onSelect={() => {
                                form.setValue("name", ingredient.name)
                                setOpen(false)
                            }} >
                              <span className="flex flex-row items-center">
                                <Check className={cn("mr-2 h-4 w-4", ingredient.name === field.value ? "opacity-100" : "opacity-0")} />
                                {ingredient.name}
                              </span>
                              <span>Stok : {ingredient.stock}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}/>
            <FormField control={form.control} name="price" render={({ field }) => (
              <FormItem>
                <FormLabel>Harga (Rp)</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="quantity" render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="purchasedAt" render={({ field }) => (
              <FormItem className="col-span-2 flex flex-col space-y-3 mt-0.5 pt-1">
                <FormLabel>Tanggal Pembelian</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? <span>{format(field.value, "dd/MM/yyyy")}</span> : <span>Pilih tanggal</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01") } initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}/>
            {isPending ?
              <div className="flex gap-4 col-span-2">
                <LoadingButton/>
              </div>
            :
              <div className="flex gap-4 col-span-2">
                <CancelButton href="/purchases"/>
                <SaveButton/>
              </div>
            }
          </form>
        </Form>
      </div>
    </>
  )
}

export const UpdatePurchaseForm: React.FC<UpdatePurchasesFormProps> = ({initialData}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof PurchaseSchema>>({
    resolver:zodResolver(PurchaseSchema),
    defaultValues: initialData,
  })
  const onSubmit = (values: z.infer<typeof PurchaseSchema>) => {
    startTransition(() => {
      updatePurchaseAction(initialData.id, values).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/purchases")
    })
  }
  return (
    <>
      <Heading title="Ubah Data Pembelian." description="Isikan data pembelian dengan benar."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="lg:w-96 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Barang</FormLabel>
                <FormControl><Input {...field} disabled /></FormControl>
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
            <FormField control={form.control} name="quantity" render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="purchasedAt" render={({ field }) => (
              <FormItem className="flex flex-col space-y-3 mt-0.5 pt-1">
                <FormLabel>Tanggal Pengeluaran</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? <span>{format(field.value, "dd/MM/yyyy")}</span> : <span>Pilih tanggal</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01") } initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}/>
            {isPending ?
              <div className="flex gap-4 col-span-2">
                <LoadingButton/>
              </div>
            :
              <div className="flex gap-4 col-span-2">
                <CancelButton href="/purchases"/>
                <SaveButton/>
              </div>
            }
          </form>
        </Form>
      </div>
    </>
  )
}