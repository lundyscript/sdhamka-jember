import { format } from "date-fns"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from "@/components/utils/pagination"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Eye, User } from "lucide-react"
import { getAllPPDB, getPPDBAllData, getPPDBData, getPPDBPages } from "@/data/ppdb"
import { Badge } from "../ui/badge"
import Link from "next/link"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { ActionButton } from "../button"

export const PPDBTable = async ({query, currentPage}:{query: string, currentPage: number}) => {
  const ppdbs = await getAllPPDB(query, currentPage)
  const totalPages = await getPPDBPages(query)
  const data = await getPPDBData(query, currentPage)
  const totalData = await getPPDBAllData()
  return (
    <>
      {!ppdbs?.length ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      :
      <>
        <div>
          <Table>
            <TableCaption><Pagination totalPages={totalPages} data={data} totalData={totalData}/></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead>Nomor Pendaftar | Status</TableHead>
                <TableHead>NIK | Nama Calon Siswa</TableHead>
                <TableHead>Tempat, Tanggal Lahir</TableHead>
                <TableHead>NISN</TableHead>
                <TableHead>Asal Sekolah</TableHead>
                <TableHead className="text-center">Tanggal Daftar</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {ppdbs?.map((ppdb, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-center">{idx+1}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>TA {ppdb.tahunajaran.name}</span>
                    <span className="font-semibold uppercase">#{ppdb.registernumber}</span>
                    <Badge variant={ppdb.status === "diterima" ? "success" : ppdb.status === "ditolak" ? "destructive" : "accepted"} className="w-fit capitalize">{ppdb.status}</Badge>
                  </div>
                </TableCell>
                <TableCell className="flex flex-row gap-4 items-center font-semibold capitalize">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={ppdb.filesphotos}/>
                    <AvatarFallback><User size={24}/></AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-normal">{ppdb.nik}</span>
                    <span>{ppdb.fullname}</span>
                    <span>({ppdb.nickname})</span>
                  </div>
                </TableCell>
                <TableCell className="capitalize">{ppdb.placeofbirth}, {format(ppdb.dateofbirth, "dd/MM/yyyy")}</TableCell>
                <TableCell>{ppdb.nisn}</TableCell>
                <TableCell className="capitalize">{ppdb.kindergarten}</TableCell>
                <TableCell className="text-center">{format(ppdb.createdAt, "dd/MM/yyyy")}</TableCell>
                <TableCell>
                  <span className="flex flex-row justify-center items-center text-center">
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button asChild variant={"ghost"} size={"icon"} className="hover:bg-blue-600/20 hover:text-blue-600"><Link href={`/registration/read/${ppdb.id}`}><Eye size={19}/></Link></Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Lihat</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <ActionButton data="registration" id={ppdb.id} name={"Calon Siswa : " + ppdb.fullname}/>
                  </span>
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
