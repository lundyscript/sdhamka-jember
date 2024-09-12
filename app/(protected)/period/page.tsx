import { CreateButton } from '@/components/button'
import { SearchInput } from '@/components/input/search'
import { YearsTable } from '@/components/table/years'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/utils/heading'
import { RoleGate } from '@/components/utils/role-gate'

const YearsPage = async ({searchParams}:{searchParams?:{ query?: string, page?: string }}) => {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  return (
    <RoleGate allowedRole="ADMIN">
      <div className="lg:flex lg:flex-row gap-4 pb-4 justify-between">
        <Heading title="Periode PPDB." description="Daftar periode Penerimaan Peserta Didik Baru di SD Muhammadiyah Kaliwates Jember."/>
        <Separator orientation="horizontal" className="lg:hidden my-4"/>
        <div className="flex flex-row gap-2">
          <SearchInput label="Cari periode ppdb"/>
          <CreateButton label="periode ppdb" href="/period/create"/>
        </div>
      </div>
      <YearsTable query={query} currentPage={currentPage}/>
    </RoleGate>
  )
}

export default YearsPage