import { format } from "date-fns"
import { ActionButton } from "@/components/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from "@/components/utils/pagination"
import { getAllTeachers, getTeachersAllData, getTeachersData, getTeachersPages } from "@/data/teachers"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Eye, Pencil, User } from "lucide-react"
import { getAllPPDB, getPPDBAllData, getPPDBData, getPPDBPages } from "@/data/ppdb"
import { Badge } from "../ui/badge"
import Link from "next/link"
import { DeleteModal } from "../utils/modal"
import { Button } from "../ui/button"

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
                    <span>{ppdb.id}</span>
                    <Badge variant={ppdb.status === "Terdaftar" ? "success" : "accepted"} className="w-fit">{ppdb.status}</Badge>
                  </div>
                </TableCell>
                <TableCell className="flex flex-row gap-4 items-center font-semibold">
                  <Avatar>
                    <AvatarImage src={ppdb.filesphotos} />
                    <AvatarFallback><User size={24}/></AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-normal">{ppdb.nik}</span>
                    <span>{ppdb.fullname}</span>
                    <span>({ppdb.nickname})</span>
                  </div>
                </TableCell>
                <TableCell>{ppdb.placeofbirth}, {format(ppdb.createdAt, "dd/MM/yyyy")}</TableCell>
                <TableCell>{ppdb.nisn}</TableCell>
                <TableCell>{ppdb.kindergarten}</TableCell>
                <TableCell className="text-center">{format(ppdb.createdAt, "dd/MM/yyyy")}</TableCell>
                <TableCell className="flex flex-row align-middle">
                  <Link href={`/adminppdb/edit/${ppdb.id}`}><Button variant={"ghost"} size={"icon"} className="hover:bg-blue-600/20 hover:text-blue-600"><Eye size={17}/></Button></Link>
                  <Link href={`/adminppdb/edit/${ppdb.id}`}><Button variant={"ghost"} size={"icon"} className="hover:bg-yellow-600/20 hover:text-yellow-600"><Pencil size={17}/></Button></Link>
                  <DeleteModal data="PPDB" id={ppdb.id} name={ppdb.fullname}/>
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

export const TeacherTableForHomepage = async ({query, currentPage}:{query: string, currentPage: number}) => {
  const teachers = await getAllTeachers(query, currentPage)
  const totalPages = await getTeachersPages(query)
  const data = await getTeachersData(query, currentPage)
  const totalData = await getTeachersAllData()

  return (
    <>
      {!teachers?.length ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      :
      <>
        <div>
          <Table>
            <TableCaption><Pagination totalPages={totalPages} data={data} totalData={totalData}/></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Pendidikan Terakhir</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Tugas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {teachers?.map((teacher, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-center">{idx+1}</TableCell>
                <TableCell className="flex flex-row gap-4 items-center font-semibold">
                  <Avatar>
                    <AvatarImage src={teacher.image} />
                    <AvatarFallback><User size={24}/></AvatarFallback>
                  </Avatar>
                  {teacher.name}
                </TableCell>
                <TableCell>{teacher.education}</TableCell>
                <TableCell>{teacher.subjects}</TableCell>
                <TableCell>{teacher.position}</TableCell>
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
