import { ActionButton } from "@/components/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from "@/components/utils/pagination"
import { getAllSubjects, getSubjectsAllData, getSubjectsData, getSubjectsPages } from "@/data/ensiklopedia"

export const SubjectsTable = async ({query, currentPage}:{query: string, currentPage: number}) => {
  const subjects = await getAllSubjects(query, currentPage)
  const totalPages = await getSubjectsPages(query)
  const data = await getSubjectsData(query, currentPage)
  const totalData = await getSubjectsAllData()
  return (
    <>
      {!subjects?.length ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      :
      <>
        <div>
          <Table>
            <TableCaption><Pagination totalPages={totalPages} data={data} totalData={totalData}/></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Guru</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead className="w-1/2">Materi Pembahasan</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {subjects?.map((subject, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-center">{idx+1}</TableCell>
                <TableCell className="font-semibold">{subject.classroom}</TableCell>
                <TableCell>{subject.teacher.name}</TableCell>
                <TableCell className="capitalize">{subject.subject}</TableCell>
                <TableCell><div dangerouslySetInnerHTML={{ __html: subject.body.substring(0,200) + " ..." }} /></TableCell>
                <TableCell className="text-center items-center justify-center">
                  <ActionButton data="subjects" id={subject.id} name={"Mata Pelajaran : " + subject.subject}/>
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
