import { CreateButton } from '@/components/button'
import { SearchInput, TASelect } from '@/components/input/search'
import { PPDBTable } from '@/components/table/ppdb'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/utils/heading'
import { RoleGate } from '@/components/utils/role-gate'
import { getAllYearsData } from '@/data/years'

const AdminPPDBPage = async ({searchParams}:{searchParams?:{ query?: string, page?: string }}) => {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const tahunajaran = await getAllYearsData()
  return (
    <RoleGate allowedRole="ADMIN">
      <div className="lg:flex lg:flex-row gap-4 pb-4 justify-between">
        <Heading title="Penerimaan Peserta Didik Baru." description="Daftar penerimaan peserta didik baru SD Muhammadiyah Kaliwates Jember."/>
        <Separator orientation="horizontal" className="lg:hidden my-4"/>
        <div className="flex flex-row gap-2">
          {/* <TASelect label="Tahun Ajaran" tahunajaran={tahunajaran}/> */}
          <SearchInput label="Cari Data Calon Siswa"/>
          <CreateButton label="PPDB" href="/adminppdb/create"/>
        </div>
      </div>
      <PPDBTable query={query} currentPage={currentPage}/>
    </RoleGate>
  )
}

export default AdminPPDBPage