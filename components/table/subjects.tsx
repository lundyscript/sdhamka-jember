import { ActionButton } from "@/components/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Pagination from "@/components/utils/pagination"
import { getAllSubjects, getSubjectsAllData, getSubjectsData, getSubjectsPages } from "@/data/elearning"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { ArrowRightIcon } from "lucide-react"
import { Badge } from "../ui/badge"

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
                <TableHead className="w-1/3">Isi Informasi</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {subjects?.map((subject, idx) => (
              <TableRow key={idx}>
                <TableCell className="text-center">{idx+1}</TableCell>
                <TableCell className="font-semibold">{subject.classroom}</TableCell>
                <TableCell>{subject.teacher.name}</TableCell>
                <TableCell>{subject.subject}</TableCell>
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



export const SubjectsCard = async ({query, currentPage}:{query: string, currentPage: number}) => {
  const subjects = await getAllSubjects(query, currentPage)
  const totalPages = await getSubjectsPages(query)
  const data = await getSubjectsData(query, currentPage)
  const totalData = await getSubjectsAllData()
  return (
    <>
      {!subjects?.length ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      :
        <div className={cn( "grid auto-rows-[22rem] lg:grid-cols-3 gap-6")} >
          {subjects.map((subject, idx) => (
            <div
              key={idx}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-xl text-left",
                // light styles
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                // dark styles
                "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
              )}
            >
              <div>
                <Image src={subject.image ? `/${subject.image}` : "/placeholder.svg"} alt={subject.subject} layout="fill" sizes="100vw" priority className="absolute rounded-md object-cover border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] group-hover:scale-105" />
              </div>
              <div className="z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
                <div className="flex flex-row gap-4 pb-2">
                  <Link href={{pathname: '/elearning', query: { query: subject.classroom.toLowerCase() }}}><Badge variant={"default"} className="text-sm font-normal hover:cursor-pointer">{subject.classroom}</Badge></Link>
                  <Link href={{pathname: '/elearning', query: { query: subject.teacher.name.toLowerCase() }}}><Badge variant={"default"} className="text-sm font-normal hover:cursor-pointer">{subject.teacher.name}</Badge></Link>
                </div>
                <Link href={{pathname: '/elearning/mapel', query: { q: subject.id }}}>
                  <h3 className="text-xl font-bold tracking-tight hover:text-primary/70">
                    {subject.subject}
                  </h3>
                </Link>
                <div className="max-w-lg text-muted-foreground tracking-tight" dangerouslySetInnerHTML={{ __html: subject.body.substring(0,100) + "..." }} />
              </div>

              <div
                className={cn(
                  "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
                )}
              >
                  <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
                    <Link href={{pathname: '/elearning/mapel', query: { q: subject.id }}}>
                      Selengkapnya
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
              </div>
              <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
            </div>
          ))}
        </div>
      }
    </>
  )
}