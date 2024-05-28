import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getBuyers, getBuyersData, getBuyersPages  } from "@/data/buyers"
import { ActionButton } from "@/components/button"
import Pagination from "@/components/utils/pagination"

export const BuyersTable = async ({query, currentPage}:{query: string, currentPage: number}) => {
  const buyers = await getBuyers(query, currentPage)
  const totalPages = await getBuyersPages(query)
  const totalData = await getBuyersData()
  return (
    <>
      {!buyers?.length ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      :
      <>
        <div className="lg:hidden">
          <Table>
            <TableCaption><Pagination totalPages={totalPages} totalData={totalData}/></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead>Nama Pelanggan | Nomor Telepon</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {buyers?.map((buyer, index) => (
              <TableRow key={buyer.id}>
                <TableCell className="text-center">{index+1}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">{buyer.name}</span>
                    <span className="text-sm text-muted-foreground">{buyer.phoneNumber}</span>
                  </div>
                </TableCell>
                <TableCell className="flex justify-center gap-2">
                  <ActionButton data="buyers" id={buyer.id} name={"Pelanggan : " + buyer.name}/>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </div>
        <div className="hidden lg:block">
          <Table>
            <TableCaption><Pagination totalPages={totalPages} totalData={totalData}/></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead>Nama Pelanggan</TableHead>
                <TableHead>Nomor Telepon</TableHead>
                <TableHead>Alamat Rumah</TableHead>
                <TableHead>Catatan</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {buyers?.map((buyer, index) => (
              <TableRow key={buyer.id}>
                <TableCell className="text-center">{index+1}</TableCell>
                <TableCell className="font-semibold">{buyer.name}</TableCell>
                <TableCell>{buyer.phoneNumber}</TableCell>
                <TableCell>{buyer.address}</TableCell>
                <TableCell>{buyer.notes}</TableCell>
                <TableCell className="flex justify-center gap-2">
                  <ActionButton data="buyers" id={buyer.id} name={"Pelanggan : " + buyer.name}/>
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