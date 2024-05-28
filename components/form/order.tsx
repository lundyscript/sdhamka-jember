"use client"
import * as z from "zod"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { OrderSchema } from "@/schemas"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { newOrderAction } from "@/actions/orders"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { CancelButton, LoadingButton, SaveButton } from "@/components/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/utils/heading"
import { toast } from "sonner"
import { CalendarIcon, Check, ChevronsUpDown, Minus, Plus } from "lucide-react"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"

export const NewOrderForm = ({buyers, products}: {buyers: any, products: any}) => {
  
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver:zodResolver(OrderSchema),
    defaultValues:{
      buyer:"",
      phoneNumber:"",
      notes:"",
      orderedAt: new Date(),
      delivery: true,
      payment: true
    },
  })
  
  for (var i = 0; i < products.length; i++) {
    Object.assign(products[i], {qty: 0, subtotal: 0})
  }
  const [cart, setCart] = useState(products)
  const [total, setTotal] = useState(0)
  let htgtotal = 0

  function addQty(id: string) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]["id"] === id) {
        cart[i]["qty"] = cart[i]["qty"] + 1
        cart[i]["subtotal"] = cart[i]["qty"] * cart[i]["price"]
      }
      htgtotal += cart[i]["subtotal"]
    }
    const product = JSON.stringify(cart)
    const products = JSON.parse(product)
    setCart(products)
    setTotal(htgtotal)
  }
  
  const minQty = (id: string) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]["id"] === id) {
        cart[i]["qty"] = cart[i]["qty"] - 1
        cart[i]["subtotal"] = cart[i]["qty"] * cart[i]["price"]
        htgtotal = total - cart[i]["price"]
      }
    }
    const product = JSON.stringify(cart)
    const products = JSON.parse(product)
    setCart(products)
    setTotal(htgtotal)
  }

  const inpQty = (id: string,e: any) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]["id"] === id) {
        cart[i]["qty"] = e.target.value
        cart[i]["subtotal"] = cart[i]["qty"] * cart[i]["price"]
      }
      htgtotal += cart[i]["subtotal"]
    }
    const product = JSON.stringify(cart)
    const products = JSON.parse(product)
    setCart(products)
    setTotal(htgtotal)
  }

  const onSubmit = (values: z.infer<typeof OrderSchema>) => {
    startTransition(() => {
      newOrderAction(values, cart).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/orders")
    })
  }
  return (
    <>
      <div className="flex flex-col gap-2 lg:flex-row lg:gap-8">
        <div className="lg:w-1/2">
          <h2 className="mb-4 text-muted-foreground tracking-tighter font-semibold">Produk Pemesanan.</h2>
          <div className="lg:hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama dan Harga (Rp) Produk</TableHead>
                  <TableHead className="text-center">Jumlah</TableHead>
                  <TableHead className="text-right">Subtotal (Rp)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {cart.map((product: { id: string; name: string; description: string; price: string, stock: string, qty: string, subtotal: string }, index: number) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">{product.name}</span>
                      <span>{new Intl.NumberFormat().format(parseInt(product.price))}</span>
                    </div>
                  </TableCell>
                  <TableCell className="flex justify-center place-items-center">
                    <div className="flex flex-row py-0 items-center">
                      {product.qty == "0" ? 
                        <Button disabled variant={"outline"} size={"icon"} className="w-10 h-10 rounded-r-none border-r-0"><Minus size={15}/></Button>
                      : 
                        <Button onClick={() => minQty(product.id)} variant={"outline"} size={"icon"} className="w-10 h-10 rounded-r-none border-r-0"><Minus size={15}/></Button>
                      }
                      {product.stock == "0" ?
                        <>
                          <Input disabled  className="px-1.5 w-10 text-xs text-center rounded-none focus-visible:ring-0"/>
                          <Button disabled variant={"outline"} size={"icon"} className="w-10 h-10 rounded-l-none border-l-0"><Plus size={15}/></Button>
                        </>
                      :
                        <>
                          <Input value={product.qty} onChange={(e) => inpQty(product.id,e)}  className="px-1.5 w-10 text-xs text-center rounded-none focus-visible:ring-0"/>
                          <Button onClick={() => addQty(product.id)} variant={"outline"} size={"icon"} className="w-10 h-10 rounded-l-none border-l-0"><Plus size={15}/></Button>
                        </>
                      }
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{new Intl.NumberFormat().format(parseInt(product.subtotal))}</TableCell>
                </TableRow>
              ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} className="text-right text-xs font-bold text-muted-foreground">Total (Rp)</TableCell>
                  <TableCell className="text-right font-semibold">{new Intl.NumberFormat().format(total)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10 text-center font-bold">#</TableHead>
                  <TableHead className="font-bold">Nama Produk  </TableHead>
                  <TableHead className="text-right font-bold">Harga (Rp)</TableHead>
                  <TableHead className="text-center font-bold">Stok</TableHead>
                  <TableHead className="text-center font-bold">Jumlah</TableHead>
                  <TableHead className="text-right font-bold">Subtotal (Rp)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {cart.map((product: { id: string; name: string; description: string; price: string, stock: string, qty: string, subtotal: string }, index: number) => (
                <TableRow key={product.id}>
                  <TableCell className="text-center">{index+1}</TableCell>
                  <TableCell className="font-semibold">{product.name}</TableCell>
                  <TableCell className="text-right">{new Intl.NumberFormat().format(parseInt(product.price))}</TableCell>
                  <TableCell className="text-center">{product.stock}</TableCell>
                  <TableCell className="flex justify-center place-items-center">
                    <div className="flex flex-row py-0 items-center">
                      {product.qty == "0" ? 
                        <Button disabled variant={"outline"} size={"icon"} className="w-10 h-10 rounded-r-none border-r-0"><Minus size={15}/></Button>
                      : 
                        <Button onClick={() => minQty(product.id)} variant={"outline"} size={"icon"} className="w-10 h-10 rounded-r-none border-r-0"><Minus size={15}/></Button>
                      }
                      {product.stock == "0" ?
                        <>
                          <Input disabled  className="px-1.5 w-10 text-xs text-center rounded-none focus-visible:ring-0"/>
                          <Button disabled variant={"outline"} size={"icon"} className="w-10 h-10 rounded-l-none border-l-0"><Plus size={15}/></Button>
                        </>
                      :
                        <>
                          <Input value={product.qty} onChange={(e) => inpQty(product.id,e)}  className="px-1.5 w-10 text-xs text-center rounded-none focus-visible:ring-0"/>
                          <Button onClick={() => addQty(product.id)} variant={"outline"} size={"icon"} className="w-10 h-10 rounded-l-none border-l-0"><Plus size={15}/></Button>
                        </>
                      }
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{new Intl.NumberFormat().format(parseInt(product.subtotal))}</TableCell>
                </TableRow>
              ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={5} className="text-right text-xs font-bold text-muted-foreground">Total (Rp)</TableCell>
                  <TableCell className="text-right font-semibold">{new Intl.NumberFormat().format(total)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
        <div className="lg:w-1/2">
          <h2 className="mb-4 text-muted-foreground tracking-tighter font-semibold">Informasi Pemesanan.</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
              <FormField control={form.control} name="buyer" render={({ field }) => (
                <FormItem className="flex flex-col space-y-3 mt-0.5 pt-1">
                  <FormLabel>Pelanggan</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" role="combobox" className={cn("justify-between", !field.value && "text-muted-foreground")}>
                          {field.value ? buyers.find((buyer: { name: string }) => buyer.name === field.value )?.name : "Pilih Pelanggan"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                      <Command>
                        <CommandInput placeholder="Cari pelanggan..." />
                        <CommandEmpty>Tidak ada data.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {buyers.map((buyer: { name: string; phoneNumber: string }) => (
                              <CommandItem className="hover:cursor-pointer" value={buyer.name} key={buyer.name} onSelect={() => {
                                  form.setValue("buyer", buyer.name)
                                  form.setValue("phoneNumber", buyer.phoneNumber)
                                  setOpen(false)
                              }} >
                                <Check className={cn("mr-2 h-4 w-4", buyer.name === field.value ? "opacity-100" : "opacity-0")} />
                                {buyer.name}
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
              <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl><Input {...field} disabled className="disabled:cursor-default disabled:opacity-100"/></FormControl>
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
              <FormField control={form.control} name="orderedAt" render={({ field }) => (
                <FormItem className="flex flex-col space-y-3 mt-0.5 pt-1">
                  <FormLabel>Tanggal Order</FormLabel>
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
              <FormField control={form.control} name="delivery" render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0 5">
                    <FormLabel>Dikirim?</FormLabel>
                    <FormDescription>{field.value ? "Ya, pesanan akan dikirim." : "Tidak, pesanan akan diambil."}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange}/>
                  </FormControl>
                </FormItem>
              )}/>
              <FormField control={form.control} name="payment" render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0 5">
                    <FormLabel>Pembayaran</FormLabel>
                    <FormDescription>{field.value ? "Lunas" : "Belum Lunas"}</FormDescription>
                  </div>
                  <FormControl>
                    <Switch disabled={isPending} checked={field.value} onCheckedChange={field.onChange}/>
                  </FormControl>
                </FormItem>
              )}/>
              {isPending ? 
                <div className="flex gap-4 col-span-2">
                  <LoadingButton/>
                </div>
              :
                <div className="flex gap-4 col-span-2">
                  <CancelButton href="/orders"/>
                  <SaveButton/>
                </div>
              }
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
