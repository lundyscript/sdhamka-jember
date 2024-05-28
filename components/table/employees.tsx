import { getEmployees, getEmployeesData, getEmployeesPages } from "@/data/employees"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ActionButton } from "@/components/button"
import { UserRound } from "lucide-react"
import Pagination from "@/components/utils/pagination"

export const EmployeesTable = async ({query, currentPage}:{query: string, currentPage: number}) => {
  const employees = await getEmployees(query, currentPage)
  const totalPages = await getEmployeesPages(query)
  const totalData = await getEmployeesData()
  return (
    <>
      {!employees?.length ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      :
      <>
        <div className="lg:hidden">
          <Table>
            <TableCaption><Pagination totalPages={totalPages} totalData={totalData}/></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead>Nama Karyawan | Jabatan</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {employees?.map((employee, index) => (
              <TableRow key={employee.id}>
                <TableCell className="text-center">{index+1}</TableCell>
                <TableCell className="font-semibold">
                  <div className="flex flex-row gap-4 items-center ">
                    <Avatar>
                      <AvatarImage src={employee.image} />
                      <AvatarFallback><UserRound size={20}/></AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm leading-none">{employee.name}</span>
                      <span className="text-sm font-normal text-muted-foreground">{employee.position}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="flex justify-center gap-2">
                  <ActionButton data="employees" id={employee.id} name={"Karyawan : " + employee.name}/>
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
                <TableHead>Nama Karyawan</TableHead>
                <TableHead>Jabatan</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {employees?.map((employee, index) => (
              <TableRow key={employee.id}>
                <TableCell className="text-center">{index+1}</TableCell>
                <TableCell className="font-semibold">
                  <div className="flex flex-row gap-4 items-center ">
                    <Avatar>
                      <AvatarImage src={employee.image} />
                      <AvatarFallback><UserRound size={20}/></AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium leading-none">{employee.name}</p>
                  </div>
                </TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell className="flex justify-center gap-2">
                  <ActionButton data="employees" id={employee.id} name={"Karyawan : " + employee.name}/>
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