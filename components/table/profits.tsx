import { format } from "date-fns"
import { getAllDebtIncome, getAllFullIncome, getAllOperationalSpends, getAllProductionSpends } from "@/data/profits"
import { getAllOrders, getAllProductsOrders } from "@/data/orders"
import { getAllSpends } from "@/data/spends"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { CardProfit } from "@/components/utils/card"
import { Badge } from "@/components/ui/badge"

export const ProfitsTable = async ({query}: {query: string}) => {
  const fullIncome = await getAllFullIncome(query)
  const debtIncome = await getAllDebtIncome(query)
  const orders = await getAllOrders(query)
  let income1 = 0
  for (let i = 0; i < fullIncome.length; i++) {
    income1 += Number(fullIncome[i]["subtotal"])
  }
  let income2 = 0
  for (let i = 0; i < debtIncome.length; i++) {
    income2 += Number(debtIncome[i]["subtotal"])
  }
  let income = income1 + income2

  const operationalspends = await getAllOperationalSpends(query)
  const productionspends = await getAllProductionSpends(query)
  const spends = await getAllSpends(query)
  let spends1 = 0
  for (let i = 0; i < operationalspends.length; i++) {
    spends1 += Number(operationalspends[i]["subtotal"])
  }
  let spends2 = 0
  for (let i = 0; i < productionspends.length; i++) {
    spends2 += Number(productionspends[i]["subtotal"])
  }
  let expenditure = spends1 + spends2
  let profit = income - expenditure
  return (
    <>
      {!profit ?
        <p className="text-sm text-center">Tidak ada data.</p>
      :
      <>
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <CardProfit title={"Total Pendapatan"} data={new Intl.NumberFormat().format(Number(income))}/>
          <CardProfit title={"Total Pengeluaran"} data={new Intl.NumberFormat().format(Number(expenditure))}/>
          <CardProfit title={"Keuntungan"} data={new Intl.NumberFormat().format(Number(profit))}/>
        </div>
        <div className="lg:hidden">
        <Table>
            <TableBody>
              <TableRow className="hover:bg-inherit">
                <TableHead>Rincian Pendapatan</TableHead>
                <TableHead className="text-right">Total (Rp)</TableHead>
              </TableRow>
              <TableRow className="hover:bg-inherit">
                <TableCell className="font-semibold">Penjualan &quot;Lunas&quot;</TableCell>
                <TableCell className="text-right font-semibold">{new Intl.NumberFormat().format(Number(income1))}</TableCell>
              </TableRow>
              <TableRow className="hover:bg-inherit">
                <TableCell className="font-semibold">Penjualan &quot;Belum Lunas&quot;</TableCell>
                <TableCell className="text-right font-semibold">{new Intl.NumberFormat().format(Number(income2))}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>#Invoice <span className="font-normal">|</span> Tanggal <span className="font-normal">|</span> Nama Pembeli</TableHead>
                <TableHead className="text-right">Total (Rp)</TableHead>
              </TableRow>
              {orders?.map((order, index) => (
                <TableRow key={order.invoice}>
                  <TableCell className="align-top">
                    <div className="flex flex-col">
                      <span className="font-semibold">#{order.invoice.substring(0,8)} <span className="font-normal">&nbsp;|&nbsp; {format(order.orderedAt, "dd/MM/yyyy")}</span></span>
                      <span className="font-semibold">{order.buyer}</span>
                      <span>{order.phoneNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell className="align-middle text-right">
                    <div className="flex flex-col items-end">
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Table>
            <TableBody>
              <TableRow className="hover:bg-inherit">
                <TableHead>Rincian Pengeluaran</TableHead>
                <TableHead className="text-right">Total (Rp)</TableHead>
              </TableRow>
              <TableRow className="hover:bg-inherit">
                <TableCell className="font-semibold">Pengeluaran &quot;Operasional&quot;</TableCell>
                <TableCell className="font-semibold text-right">{new Intl.NumberFormat().format(Number(spends1))}</TableCell>
              </TableRow>
              <TableRow className="hover:bg-inherit">
                <TableCell className="font-semibold">Pengeluaran &quot;Produksi&quot;</TableCell>
                <TableCell className="font-semibold text-right">{new Intl.NumberFormat().format(Number(spends2))}</TableCell>
              </TableRow>
              <TableRow><TableCell colSpan={4}></TableCell></TableRow>
              <TableRow>
                <TableHead>Tanggal <span className="font-normal">|</span> Jenis <span className="font-normal">|</span> Nama Pengeluaran</TableHead>
                <TableHead className="text-right">Total (Rp)</TableHead>
              </TableRow>
              {spends?.map((spend, index) => (
                <TableRow key={spend.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">{spend.category} <span className="font-normal">&nbsp;|&nbsp; {format(spend.issuedAt, "dd/MM/yyyy")}</span></span>
                      <span>{spend.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-right">{new Intl.NumberFormat().format(parseInt(spend.subtotal))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="hidden lg:flex lg:flex-row gap-4 py-4">
          <Table>
            <TableBody>
              <TableRow className="hover:bg-inherit">
                <TableHead colSpan={2}>Rincian Pendapatan</TableHead>
                <TableHead colSpan={2} className="text-right">Total (Rp)</TableHead>
              </TableRow>
              <TableRow className="hover:bg-inherit">
                <TableCell colSpan={2} className="font-semibold">Penjualan &quot;Lunas&quot;</TableCell>
                <TableCell colSpan={2} className="text-right font-semibold">{new Intl.NumberFormat().format(Number(income1))}</TableCell>
              </TableRow>
              <TableRow className="hover:bg-inherit">
                <TableCell colSpan={2} className="font-semibold">Penjualan &quot;Belum Lunas&quot;</TableCell>
                <TableCell colSpan={2} className="text-right font-semibold">{new Intl.NumberFormat().format(Number(income2))}</TableCell>
              </TableRow>
              <TableRow><TableCell colSpan={4}></TableCell></TableRow>
              <TableRow>
                <TableHead>#Invoice <span className="font-normal">|</span> Tanggal</TableHead>
                <TableHead className="text-center">Pembayaran</TableHead>
                <TableHead>Nama Pelanggan <span className="font-normal">|</span> Nomor Telepon</TableHead>
                <TableHead className="text-right">Total (Rp)</TableHead>
              </TableRow>
              {orders?.map((order, index) => (
                <TableRow key={order.invoice}>
                  <TableCell className="align-top">
                    <div className="flex flex-col">
                      <span className="font-semibold">#{order.invoice.substring(0,8)}</span>
                      <span className="flex flex-row gap-2">{format(order.orderedAt, "dd/MM/yyyy")}</span>
                    </div>
                  </TableCell>
                  <TableCell className="align-middle text-center">
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
                  <TableCell className="text-right">
                    <TotalProductsOrder invoice={order.invoice}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Table>
            <TableBody>
              <TableRow className="hover:bg-inherit">
                <TableHead colSpan={2}>Rincian Pengeluaran</TableHead>
                <TableHead colSpan={2} className="text-right">Total (Rp)</TableHead>
              </TableRow>
              <TableRow className="hover:bg-inherit">
                <TableCell colSpan={2} className="font-semibold">Pengeluaran &quot;Operasional&quot;</TableCell>
                <TableCell colSpan={2} className="font-semibold text-right">{new Intl.NumberFormat().format(Number(spends1))}</TableCell>
              </TableRow>
              <TableRow className="hover:bg-inherit">
                <TableCell colSpan={2} className="font-semibold">Pengeluaran &quot;Produksi&quot;</TableCell>
                <TableCell colSpan={2} className="font-semibold text-right">{new Intl.NumberFormat().format(Number(spends2))}</TableCell>
              </TableRow>
              <TableRow><TableCell colSpan={4}></TableCell></TableRow>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Nama Barang</TableHead>
                <TableHead className="text-right">Total (Rp)</TableHead>
              </TableRow>
              {spends?.map((spend, index) => (
                <TableRow key={spend.id}>
                  <TableCell>{format(spend.issuedAt, "dd/MM/yyyy")}</TableCell>
                  <TableCell className="font-semibold">{spend.category}</TableCell>
                  <TableCell>{spend.name}</TableCell>
                  <TableCell className="font-semibold text-right">{new Intl.NumberFormat().format(parseInt(spend.subtotal))}</TableCell>
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
