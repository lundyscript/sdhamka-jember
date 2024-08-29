/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from "@/components/utils/pagination"
import { getAllProfiles, getProfilesAllData, getProfilesData, getProfilesPages } from "@/data/profiles"
import Link from "next/link"
import { Button } from "../ui/button"
import { Pencil } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

export const ProfilesTable = async ({query, currentPage}:{query: string, currentPage: number}) => {
  const profiles = await getAllProfiles(query, currentPage)
  const totalPages = await getProfilesPages(query)
  const data = await getProfilesData(query, currentPage)
  const totalData = await getProfilesAllData()
  return (
    <>
      {!profiles?.length ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      :
      <>
        <div>
          <Table>
            <TableCaption><Pagination totalPages={totalPages} data={data} totalData={totalData}/></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Judul dan Subjudul</TableHead>
                <TableHead className="w-1/3">Isi</TableHead>
                <TableHead className="text-center">Tanggal</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {profiles?.map((profile, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-center">{idx+1}</TableCell>
                <TableCell className="uppercase font-semibold">{profile.section}</TableCell>
                <TableCell>
                  <p className="font-semibold capitalize">{profile.title}</p>
                  {profile.subtitle}
                </TableCell>
                <TableCell><div dangerouslySetInnerHTML={{ __html: profile.body.substring(0,200) + " ..." }} /></TableCell>
                <TableCell className="text-center">{format(profile.createdAt, "dd/MM/yyyy")}</TableCell>
                <TableCell className="text-center items-center justify-center">
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button asChild variant={"ghost"} size={"icon"} className="hover:bg-yellow-600/20 hover:text-yellow-600"><Link href={`/profiles/edit/${profile.id}`}><Pencil size={17}/></Link></Button>
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
