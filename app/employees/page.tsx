import { SearchInput } from "@/components/input/search"
import BlurFade from "@/components/magicui/blur-fade"
import { TeacherTableForHomepage } from "@/components/table/teachers"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/utils/heading"
import NavbarComponent from "@/components/utils/navbar"
import { getTeachersData } from "@/data/teachers"

const EmployeesPage = async ({searchParams}:{searchParams?:{ query?: string, page?: string }}) => {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const data = await getTeachersData(query, currentPage)
  return (
    <>
      <NavbarComponent/>
      <section className="w-full py-20 lg:py-28">
        <div className="container px-4 md:px-6">
          <div className="lg:flex lg:flex-row gap-4 pb-10 justify-between">
            <Heading title="Guru dan Karyawan." description="Berikut ini adalah profil Guru dan Karyawan di SD Muhammadiyah Kaliwates Jember."/>
            <Separator orientation="horizontal" className="lg:hidden my-4"/>
            <div className="flex flex-row gap-2">
              <SearchInput label="Cari Guru atau Karyawan"/>
            </div>
          </div>
            <BlurFade delay={0.25} inView>
              {data === 0 ?
                <p>Tidak ada data.</p>
              :
                <>
                  <TeacherTableForHomepage query={query} currentPage={currentPage}/>
                </>
              }
            </BlurFade>
        </div>
      </section>
    </>
  )
}

export default EmployeesPage