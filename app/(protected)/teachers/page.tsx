import { CreateButton } from '@/components/button'
import { SearchInput } from '@/components/input/search'
import { TeacherTable } from '@/components/table/teachers'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/utils/heading'
import { RoleGate } from '@/components/utils/role-gate'

const TeacherPage = async ({searchParams}:{searchParams?:{ query?: string, page?: string }}) => {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  return (
    <RoleGate allowedRole="ADMIN">
      <div className="lg:flex lg:flex-row gap-4 pb-4 justify-between">
        <Heading title="Guru dan Karyawan." description="Daftar guru dan karyawan di SD Muhammadiyah Kaliwates Jember."/>
        <Separator orientation="horizontal" className="lg:hidden my-4"/>
        <div className="flex flex-row gap-2">
          <SearchInput label="Cari Guru / Karyawan"/>
          <CreateButton label="guru/karyawan" href="/teachers/create"/>
        </div>
      </div>
      <TeacherTable query={query} currentPage={currentPage}/>
    </RoleGate>
  )
}

export default TeacherPage