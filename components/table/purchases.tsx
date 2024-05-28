import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ActionButton } from "@/components/button"
import { getAllPurchases } from "@/data/purchases"
import { format } from "date-fns"

export const PurchasesTable = async ({query}: {query: string}) => {
  const purchases = await getAllPurchases(query)
  return (
    <>
      {!purchases?.length ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      :
      <>
        <div className="lg:hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 text-center">#</TableHead>
              <TableHead>Tanggal Pembelian</TableHead>
              <TableHead>Total (Rp)</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {purchases?.map((purchase, index) => (
            <TableRow key={purchase.id}>
              <TableCell className="text-center">{index+1}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-0">
                  <span>{format(purchase.purchasedAt, "dd/MM/yyyy")}</span>
                  <span className="font-semibold">{purchase.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-0">
                  <span>{new Intl.NumberFormat().format(parseInt(purchase.price))} x {purchase.quantity}</span>
                  <span className="font-semibold">{new Intl.NumberFormat().format(parseInt(purchase.subtotal))}</span>
                </div>
              </TableCell>
              <TableCell>
                <ActionButton data="purchases" id={purchase.id} name={"Pembelian : " + purchase.name}/>
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
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead>Tanggal Pembelian</TableHead>
                <TableHead>Nama Barang</TableHead>
                <TableHead className="text-right">Harga (Rp)</TableHead>
                <TableHead className="text-center">Jumlah</TableHead>
                <TableHead className="text-right">Total (Rp)</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {purchases?.map((purchase, index) => (
              <TableRow key={purchase.id}>
                <TableCell className="text-center">{index+1}</TableCell>
                <TableCell>{format(purchase.purchasedAt, "dd/MM/yyyy")}</TableCell>
                <TableCell className="font-semibold">{purchase.name}</TableCell>
                <TableCell className="text-right">{new Intl.NumberFormat().format(parseInt(purchase.price))}</TableCell>
                <TableCell className="text-center">{purchase.quantity}</TableCell>
                <TableCell className="text-right font-semibold">{new Intl.NumberFormat().format(parseInt(purchase.subtotal))}</TableCell>
                <TableCell className="flex justify-center gap-2">
                  <ActionButton data="purchases" id={purchase.id} name={"Pembelian : " + purchase.name}/>
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