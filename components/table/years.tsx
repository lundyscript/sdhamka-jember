import { format } from "date-fns"
import { ActionButton } from "@/components/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from "@/components/utils/pagination"
import { getAllYears, getYearsAllData, getYearsData, getYearsPages } from "@/data/years"
import { Badge } from "../ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Button } from "../ui/button"
import { Pencil } from "lucide-react"
import Link from "next/link"

export const YearsTable = async ({query, currentPage}:{query: string, currentPage: number}) => {
  const years = await getAllYears(query, currentPage)
  const totalPages = await getYearsPages(query)
  const data = await getYearsData(query, currentPage)
  const totalData = await getYearsAllData()

  return (
    <>
      {!years?.length ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      :
      <>
        <div>
          <Table>
            <TableCaption><Pagination totalPages={totalPages} data={data} totalData={totalData}/></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Nama Periode</TableHead>
                <TableHead>Tanggal Awal</TableHead>
                <TableHead>Tanggal Akhir</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {years?.map((year, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-center">{idx+1}</TableCell>
                <TableCell><Badge variant={year.status === "A" ? "success" : "destructive"} className="w-fit capitalize">{year.status}</Badge></TableCell>
                <TableCell className="font-semibold">{year.name}</TableCell>
                <TableCell>{format(year.startdate, "dd/MM/yyyy")}</TableCell>
                <TableCell>{format(year.enddate, "dd/MM/yyyy")}</TableCell>
                <TableCell className="text-center items-center justify-center">
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button asChild variant={"ghost"} size={"icon"} className="hover:bg-yellow-600/20 hover:text-yellow-600"><Link href={`/period/edit/${year.id}`}><Pencil size={17}/></Link></Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ubah</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
