import { format } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ActionButton } from "@/components/button"
import { getPackages, getPackagesData, getPackagesPages } from "@/data/packages"

export const PackagesTable = async ({query, currentPage}:{query: string, currentPage: number}) => {
  const packages = await getPackages(query, currentPage)
  const totalPages = await getPackagesPages(query)
  const totalData = await getPackagesData()
  return (
    <>
      {!packages?.length ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      :
      <>
        <div className="lg:hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead>Tanggal Pengemasan</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {packages?.map((pack, index) => (
              <TableRow key={pack.id}>
                <TableCell className="text-center">{index+1}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0">
                    <span>{format(pack.packedAt, "dd/MM/yyyy")}</span>
                    <span className="font-semibold">{pack.employee}</span>
                  </div>
                </TableCell>
                <TableCell className="font-semibold">
                  <div className="flex flex-col gap-0">
                    <span>{pack.product}</span>
                    <span>{new Intl.NumberFormat().format(parseInt(pack.quantity))} Dus</span>
                  </div>
                </TableCell>
                <TableCell className="flex justify-center gap-2">
                  <ActionButton data="packaging" id={pack.id} name={"Pengemasan : " + pack.employee}/>
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
                <TableHead>Tanggal Pengemasan</TableHead>
                <TableHead>Nama Karyawan</TableHead>
                <TableHead>Produk</TableHead>
                <TableHead className="text-center">Jumlah Pengemasan</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {packages?.map((pack, index) => (
              <TableRow key={pack.id}>
                <TableCell className="text-center">{index+1}</TableCell>
                <TableCell>{format(pack.packedAt, "dd/MM/yyyy")}</TableCell>
                <TableCell className="font-semibold">{pack.employee}</TableCell>
                <TableCell className="font-semibold">{pack.product}</TableCell>
                <TableCell className="text-center">{new Intl.NumberFormat().format(parseInt(pack.quantity))}</TableCell>
                <TableCell className="flex justify-center gap-2">
                  <ActionButton data="packaging" id={pack.id} name={"Pengemasan : " + pack.employee}/>
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