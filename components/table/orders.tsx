import { format } from "date-fns"
import { getAllOrders, getAllProductsOrders } from "@/data/orders"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DeleteModal } from "@/components/utils/modal"
import { Badge } from "@/components/ui/badge"

export const OrdersTable = async ({query}: {query: string}) => {
  const orders = await getAllOrders(query)
  return (
    <>
      {!orders?.length ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      :
      <>
        <div className="lg:hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#Invoice Pembeli</TableHead>
              <TableHead className="text-center">Total (Rp)</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {orders?.map((order, index) => (
            <TableRow key={order.invoice}>
              <TableCell className="align-top">
                <div className="flex flex-col">
                  <span className="font-semibold">#{order.invoice.substring(0,8)} <span className="font-normal">&nbsp;|&nbsp; {format(order.orderedAt, "dd/MM/yyyy")}</span></span>
                  <span className="font-semibold">{order.buyer}</span>
                  <span>{order.phoneNumber}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col text-center items-center">
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
                  <TotalProductsOrder invoice={order.invoice}/>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <DeleteModal data="orders" id={order.invoice} name={"Invoice : #" + order.invoice.substring(0,8)}/>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
        </div>
        <div className="hidden lg:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">#Invoice <span className="font-normal">|</span> Tanggal</TableHead>
                <TableHead className="text-center">Pembayaran</TableHead>
                <TableHead className="">Nama Pelanggan <span className="font-normal">|</span> Nomor Telepon</TableHead>
                <TableHead className="">Dikirim? <span className="font-normal">|</span> Catatan</TableHead>
                <TableHead className="text-center">Produk <span className="font-normal">|</span> Harga (Rp) <span className="font-normal">|</span> Jumlah</TableHead>
                <TableHead className="text-right">Total (Rp)</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {orders?.map((order, index) => (
              <TableRow key={order.invoice}>
                <TableCell className="align-top">
                  <div className="flex flex-col">
                    <span className="font-semibold">#{order.invoice.substring(0,8)}</span>
                    <span className="flex flex-row gap-2">{format(order.orderedAt, "dd/MM/yyyy")}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center align-top">
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
                  <ProductsOrder invoice={order.invoice}/>
                </TableCell>
                <TableCell className="text-right">
                  <TotalProductsOrder invoice={order.invoice}/>
                </TableCell>
                <TableCell className="text-center">
                  <DeleteModal data="orders" id={order.invoice} name={"Invoice : #" + order.invoice.substring(0,8)}/>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </div>
      </>
      }
    </>
  )
}

export const ProductsOrder = async ({invoice}: {invoice: string}) => {
  const products = await getAllProductsOrders(invoice)
  return (
    <>
      {products?.map((product, index) => (
        <div key={product.id} className="flex flex-cols-2 justify-between">
          <span className="font-semibold">{product.product}</span>
          <span>{new Intl.NumberFormat().format(Number(product.price))} &nbsp; X &nbsp; {product.quantity}</span>
        </div>
      ))}
    </>
  )
}

export const TotalProductsOrder = async ({invoice}: {invoice: string}) => {
  const products = await getAllProductsOrders(invoice)
  let total = 0
  for (let i = 0; i < products.length; i++) {
    total += Number(products[i]["subtotal"])
  }
  return (
    <>
      <span className="font-semibold">{new Intl.NumberFormat().format(Number(total))}</span>
    </>
  )
}
