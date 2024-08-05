/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns"
import { ActionButton } from "@/components/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from "@/components/utils/pagination"
import { getAllTeachers, getTeachersAllData, getTeachersData, getTeachersPages } from "@/data/teachers"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export const TeacherTable = async ({query, currentPage}:{query: string, currentPage: number}) => {
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
                <TableHead>Pendidikan</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead>Whatsapp</TableHead>
                <TableHead className="text-center">Tanggal</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {teachers?.map((teacher, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-center">{idx+1}</TableCell>
                <TableCell className="flex flex-row gap-4 items-center font-semibold">
                  <Avatar>
                    <AvatarImage src={teacher.image} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {teacher.name}
                </TableCell>
                <TableCell>{teacher.education}</TableCell>
                <TableCell>{teacher.subjects}</TableCell>
                <TableCell>{teacher.position}</TableCell>
                <TableCell>{teacher.whatsapp}</TableCell>
                <TableCell className="text-center">{format(teacher.createdAt, "dd/MM/yyyy")}</TableCell>
                <TableCell className="text-center items-center justify-center">
                  <ActionButton data="teachers" id={teacher.id} name={"Guru/Karyawan : " + teacher.name}/>
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
