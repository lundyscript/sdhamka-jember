import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ActionButton } from "@/components/button"
import { getAllSpends } from "@/data/spends"
import { format } from "date-fns"

export const SpendsTable = async ({query}: {query: string}) => {
  const spends = await getAllSpends(query)
  return (
    <>
      {!spends?.length ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      :
      <>
        <div className="lg:hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 text-center">#</TableHead>
              <TableHead>Tanggal Pengeluaran</TableHead>
              <TableHead>Total (Rp)</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {spends?.map((spend, index) => (
            <TableRow key={spend.id}>
              <TableCell className="text-center">{index+1}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-0">
                  <span>{format(spend.issuedAt, "dd/MM/yyyy")}</span>
                  <span className="font-semibold">{spend.category}</span>
                  <span className="font-semibold">{spend.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-0">
                  <span>{new Intl.NumberFormat().format(parseInt(spend.price))} x {spend.quantity}</span>
                  <span className="font-semibold">{new Intl.NumberFormat().format(parseInt(spend.subtotal))}</span>
                </div>
              </TableCell>
              <TableCell className="flex justify-center gap-2">
                <ActionButton data="spends" id={spend.id} name={"Pengeluaran : " + spend.name}/>
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
                <TableHead>Tanggal Pengeluaran</TableHead>
                <TableHead>Jenis Pengeluaran</TableHead>
                <TableHead>Nama Barang</TableHead>
                <TableHead className="text-right">Harga (Rp)</TableHead>
                <TableHead className="text-center">Jumlah</TableHead>
                <TableHead className="text-right">Total (Rp)</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {spends?.map((spend, index) => (
              <TableRow key={spend.id}>
                <TableCell className="text-center">{index+1}</TableCell>
                <TableCell>{format(spend.issuedAt, "dd/MM/yyyy")}</TableCell>
                <TableCell className="font-semibold">{spend.category}</TableCell>
                <TableCell>{spend.name}</TableCell>
                <TableCell className="text-right">{new Intl.NumberFormat().format(parseInt(spend.price))}</TableCell>
                <TableCell className="text-center">{spend.quantity}</TableCell>
                <TableCell className="text-right font-semibold">{new Intl.NumberFormat().format(parseInt(spend.subtotal))}</TableCell>
                <TableCell className="flex justify-center gap-2">
                  <ActionButton data="spends" id={spend.id} name={"Pengeluaran : " + spend.name}/>
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