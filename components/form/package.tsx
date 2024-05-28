"use client"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import type { Packages } from "@prisma/client"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PackagingSchema } from "@/schemas"
import { newPackagingAction, updatePackagingAction } from "@/actions/packages"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CancelButton, LoadingButton, SaveButton } from "@/components/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/utils/heading"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { toast } from "sonner"

interface UpdatePackagingFormProps {
  initialData: Packages
}

export const NewPackagingForm = ({employees, products}: {employees: any, products: any}) => {
  const router = useRouter()
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof PackagingSchema>>({
    resolver:zodResolver(PackagingSchema),
    defaultValues:{ employee:"", quantity:"", packedAt: new Date()  },
  })
  const onSubmit = (values: z.infer<typeof PackagingSchema>) => {
    startTransition(() => {
      newPackagingAction(values).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/packaging")
    })
  }
  return (
    <>
      <Heading title="Pengemasan Baru." description="Isikan data pengemasan baru."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="w-96 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="employee" render={({ field }) => (
              <FormItem className="flex flex-col space-y-3 mt-0.5 pt-1">
                <FormLabel>Nama Karyawan</FormLabel>
                  <Popover open={open1} onOpenChange={setOpen1}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox" className={cn("justify-between", !field.value && "text-muted-foreground")}>
                          {field.value ? employees.find((employee: { name: string }) => employee.name === field.value )?.name : "Pilih Karyawan"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                      <Command>
                        <CommandInput placeholder="Cari karyawan..." />
                        <CommandEmpty>Tidak ada data.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {employees.map((employee: { name: string;}) => (
                              <CommandItem className="hover:cursor-pointer flex flex-row items-center" value={employee.name} key={employee.name} onSelect={() => {
                                form.setValue("employee", employee.name)
                                setOpen1(false)
                              }} >
                                <span className="flex flex-row items-center">
                                  <Check className={cn("mr-2 h-4 w-4", employee.name === field.value ? "opacity-100" : "opacity-0")} />
                                  {employee.name}
                                </span>
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
            <FormField control={form.control} name="product" render={({ field }) => (
              <FormItem className="flex flex-col space-y-3 mt-0.5 pt-1">
                <FormLabel>Nama Produk</FormLabel>
                  <Popover open={open2} onOpenChange={setOpen2}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox" className={cn("justify-between", !field.value && "text-muted-foreground")}>
                          {field.value ? products.find((product: { name: string }) => product.name === field.value )?.name : "Pilih Produk"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                      <Command>
                        <CommandInput placeholder="Cari produk..." />
                        <CommandEmpty>Tidak ada data.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {products.map((product: { name: string; stock: string}) => (
                              <CommandItem className="hover:cursor-pointer flex flex-row justify-between" value={product.name} key={product.name} onSelect={() => {
                                form.setValue("product", product.name)
                                setOpen2(false)
                              }} >
                                <span className="flex flex-row items-center">
                                  <Check className={cn("mr-2 h-4 w-4", product.name === field.value ? "opacity-100" : "opacity-0")} />
                                  {product.name}
                                </span>
                                <span>Stok : {product.stock}</span>
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
            <FormField control={form.control} name="quantity" render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="packedAt" render={({ field }) => (
                <FormItem className="flex flex-col space-y-3 mt-0.5 pt-1">
                  <FormLabel>Tanggal Pengemasan</FormLabel>
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
              <LoadingButton/>
            :
              <div className="flex gap-4">
                <CancelButton href="/packaging"/>
                <SaveButton/>
              </div>
            }
          </form>
        </Form>
      </div>
    </>
  )
}

export const UpdatePackagingForm: React.FC<UpdatePackagingFormProps> = ({initialData}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof PackagingSchema>>({
    resolver:zodResolver(PackagingSchema),
    defaultValues: initialData,
  })
  const onSubmit = (values: z.infer<typeof PackagingSchema>) => {
    startTransition(() => {
      updatePackagingAction(initialData.id, values).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/packaging")
    })
  }
  return (
    <>
      <Heading title="Ubah Data Pengemasan." description="Isikan data pengemasan dengan benar."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="w-96 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="employee" render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Karyawan</FormLabel>
                <FormControl><Input {...field} disabled/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="product" render={({ field }) => (
              <FormItem>
                <FormLabel>Produk</FormLabel>
                <FormControl><Input {...field} disabled/></FormControl>
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
            <FormField control={form.control} name="packedAt" render={({ field }) => (
                <FormItem className="flex flex-col space-y-3 mt-0.5 pt-1">
                  <FormLabel>Tanggal Pengemasan</FormLabel>
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
              <LoadingButton/>
            :
              <div className="flex gap-4">
                <CancelButton href="/packaging"/>
                <SaveButton/>
              </div>
            }
          </form>
        </Form>
      </div>
    </>
  )
}