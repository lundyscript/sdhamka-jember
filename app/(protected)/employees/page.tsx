import { CreateButton, DownloadButton } from '@/components/button'
import { SearchInput } from '@/components/input/search'
import { EmployeesTable } from '@/components/table/employees'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/utils/heading'
import { getAllEmployees } from '@/data/employees'

const EmployeesPage = async ({searchParams}:{searchParams?:{ query?: string, page?: string }}) => {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const data = await getAllEmployees()
  return (
    <>
    <div className="lg:flex lg:flex-row gap-4 pb-4 justify-between">
      <Heading title="Karyawan." description="Daftar karyawan Unit Usaha Moyamu Jember."/>
      <Separator orientation="horizontal" className="lg:hidden my-4"/>
      <div className="flex flex-row gap-2 justify-end">
        <SearchInput label="Nama Karyawan"/>
        <CreateButton label="karyawan" href="/employees/create"/>
        <DownloadButton label="karyawan" data={data}/>
      </div>
    </div>
    <EmployeesTable query={query} currentPage={currentPage}/>
  </>
  )
}

export default EmployeesPage