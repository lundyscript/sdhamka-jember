"use client"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { payBillsAction } from "@/actions/orders"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Wallet } from "lucide-react"
import { toast } from "sonner"

const FormSchema = z.object({
  invoice: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Pilih minimal satu invoice.",
  }),
  paidAt: z.optional(z.date()),
})

export const BillsTable = ({orders, products}: {orders: any, products: any}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      invoice: [],
      paidAt: undefined
    },
  })
  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(() => {
      payBillsAction(data).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/bills")
    })
  }
  return (
    <>
      {!orders?.length ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      :
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="lg:hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#Invoice Tagihan</TableHead>
                  <TableHead className="text-center">Total (Rp)</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {orders?.map((order: any, index: any) => (
                <TableRow key={order.invoice}>
                  <TableCell className="align-top">
                    <div className="flex flex-col">
                      <span className="font-semibold">#{order.invoice.substring(0,8)} <span className="font-normal">&nbsp;|&nbsp; {format(order.orderedAt, "dd/MM/yyyy")}</span></span>
                      <span className="font-semibold">{order.buyer}</span>
                      <span>{order.phoneNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell className="w-fit">
                    <div className="flex flex-col text-center items-center justify-center">
                      {order.payment == true ?
                        <TooltipProvider delayDuration={0}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant={"outline"} className="w-fit">Lunas</Badge>
                            </TooltipTrigger>
                            <TooltipContent>Dibayar : {order.paidAt ? format(order.paidAt, "dd/MM/yyyy") : ""}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      :
                        <Badge variant={"secondary"} className="w-fit">Belum Lunas</Badge>
                      }
                      <TotalProductsBills products={products} invoice={order.invoice}/>
                    </div>
                  </TableCell>
                  <TableCell className="!pr-2 text-center">
                    <FormField key={order.invoice} control={form.control} name="invoice" render={({ field }) => {
                      return (
                        <FormItem key={order.invoice}>
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(order.invoice)}
                              onCheckedChange={(checked) => {
                                return checked
                                ? field.onChange([...field.value, order.invoice])
                                : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== order.invoice
                                  )
                                )
                              }}
                              disabled={isPending}
                            />
                          </FormControl>
                        </FormItem>
                      )
                    }}/>
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
              <TableFooter>
                <TableRow className="hover:bg-inherit">
                  <TableCell colSpan={7} className="text-right">
                    <div className="flex flex-row gap-2 justify-end items-center" >
                      <FormField control={form.control} name="paidAt" render={({ field }) => (
                        <FormItem className="flex flex-col space-y-3">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant={"outline"} size={"sm"} className={cn("w-64 justify-start text-left font-normal hover:bg-inherit", !field.value && "text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? <span>{format(field.value, "dd/MM/yyyy")}</span> : <span>Tanggal pembayaran</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01") } initialFocus />
                            </PopoverContent>
                          </Popover>
                          <FormMessage/>
                        </FormItem>
                      )}/>
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant={"default"} size={"sm"} disabled={isPending} className="font-medium border">
                              <Wallet size={17} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Bayar tagihan.</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormField control={form.control} name="invoice" render={({ field }) => {
                      return (
                        <FormItem>
                          <FormMessage className="pt-2"/>
                        </FormItem>
                      )
                    }}/>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold w-32">#Invoice <span className="font-normal">|</span> Tanggal</TableHead>
                  <TableHead className="text-center font-bold">Pembayaran</TableHead>
                  <TableHead className="font-bold">Nama Pelanggan <span className="font-normal">|</span> Nomor Telepon</TableHead>
                  <TableHead className="font-bold">Dikirim? <span className="font-normal">|</span> Catatan</TableHead>
                  <TableHead className="text-center font-bold">Produk <span className="font-normal">|</span> Harga (Rp) <span className="font-normal">|</span> Jumlah</TableHead>
                  <TableHead className="text-right font-bold">Total (Rp)</TableHead>
                  <TableHead className="text-center font-bold">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {orders?.map((order: any, index: any) => (
                <TableRow key={order.invoice}>
                  <TableCell className="align-top">
                    <div className="flex flex-col">
                      <span className="font-semibold">#{order.invoice.substring(0,8)}</span>
                      <span className="flex flex-row gap-2">{format(order.orderedAt, "dd/MM/yyyy")}</span>
                    </div>
                  </TableCell>
                  <TableCell className="w-fit text-center align-top">
                    {order.payment == true ? 
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant={"outline"} className="w-fit">Lunas</Badge>
                          </TooltipTrigger>
                          <TooltipContent>Dibayar : {order.paidAt ? format(order.paidAt, "dd/MM/yyyy") : ""}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    :
                      <Badge variant={"secondary"} className="w-fit">Belum Lunas</Badge>
                    }
                  </TableCell>
                  <TableCell className="align-top">
                    <div className="flex flex-col">
                      <span className="font-semibold">{order.buyer}</span>
                      <span>{order.phoneNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell className="align-top">
                    <div className="flex flex-col">
                      <span className="font-semibold">{order.delivery == true ? "Ya" : "Tidak"}</span>
                      <span>{order.notes}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <ProductsBills products={products} invoice={order.invoice}/>
                  </TableCell>
                  <TableCell className="text-right">
                    <TotalProductsBills products={products} invoice={order.invoice}/>
                  </TableCell>
                  <TableCell className="!pr-2 text-center">
                    <FormField key={order.invoice} control={form.control} name="invoice" render={({ field }) => {
                      return (
                        <FormItem key={order.invoice}>
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(order.invoice)}
                              onCheckedChange={(checked) => {
                                return checked
                                ? field.onChange([...field.value, order.invoice])
                                : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== order.invoice
                                  )
                                )
                              }}
                              disabled={isPending}
                            />
                          </FormControl>
                        </FormItem>
                      )
                    }}/>
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
              <TableFooter>
                <TableRow className="hover:bg-inherit">
                  <TableCell colSpan={7} className="text-right">
                    <div className="flex flex-row gap-2 justify-end items-center" >
                      <FormField control={form.control} name="paidAt" render={({ field }) => (
                        <FormItem className="flex flex-col space-y-3">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant={"outline"} size={"sm"} className={cn("w-64 justify-start text-left font-normal hover:bg-inherit", !field.value && "text-muted-foreground")}>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? <span>{format(field.value, "dd/MM/yyyy")}</span> : <span>Tanggal pembayaran</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01") } initialFocus />
                            </PopoverContent>
                          </Popover>
                          <FormMessage/>
                        </FormItem>
                      )}/>
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant={"default"} size={"sm"} disabled={isPending} className="font-medium border">
                              <Wallet size={17} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Bayar tagihan.</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormField control={form.control} name="invoice" render={({ field }) => {
                      return (
                        <FormItem>
                          <FormMessage className="pt-2"/>
                        </FormItem>
                      )
                    }}/>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </form>
      </Form>
      }
    </>
  )
}

export const ProductsBills = ({products, invoice}: {products: any, invoice: string}) => {
  const product = []
  for (let i = 0; i < products.length; i++) {
    if (products[i]['invoice'] === invoice) {
      product.push(products[i])
    }
  }
  return (
    <>
      {product?.map((product, index) => (
        <div key={product.id} className="flex flex-cols-2 justify-between">
          <span className="font-semibold">{product.product}</span>
          <span>{new Intl.NumberFormat().format(Number(product.price))} &nbsp; X &nbsp; {product.quantity}</span>
        </div>
      ))}
    </>
  )
}

export const TotalProductsBills = ({products, invoice}: {products: any, invoice: string}) => {
  let total = 0
  for (let i = 0; i < products.length; i++) {
    if (products[i]['invoice'] === invoice) {
      total += Number(products[i]["subtotal"])
    }
  }
  return (
    <>
      <span className="font-semibold">{new Intl.NumberFormat().format(Number(total))}</span>
    </>
  )
}
