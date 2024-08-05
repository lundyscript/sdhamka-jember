/* eslint-disable @next/next/no-img-element */
import { SearchInput } from '@/components/input/search'
import BlurFade from '@/components/magicui/blur-fade'
import { Separator } from '@/components/ui/separator'
import { BentoForNewsPage } from '@/components/utils/grid'
import { Heading } from '@/components/utils/heading'
import NavbarComponent from '@/components/utils/navbar'
import Pagination from '@/components/utils/pagination'
import { getPostsAllData, getPostsData, getPostsPages } from '@/data/posts'

const AllNewsPage = async ({searchParams}:{searchParams?:{ query?: string, page?: string }}) => {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const totalPages = await getPostsPages(query)
  const data = await getPostsData(query, currentPage)
  const totalData = await getPostsAllData()
  return (
    <>
      <NavbarComponent/>
      <section className="w-full py-20 lg:py-28">
        <div className="container px-4 md:px-6">
          <div className="lg:flex lg:flex-row gap-4 pb-10 justify-between">
            <Heading title="Informasi Sekolah." description="Informasi terbaru terkait kegiatan di SD Muhammadiyah Kaliwates Jember."/>
            <Separator orientation="horizontal" className="lg:hidden my-4"/>
            <div className="flex flex-row gap-2">
              <SearchInput label="Cari Informasi"/>
            </div>
          </div>
          <div className="flex flex-col items-center text-center space-y-6">
            <BlurFade delay={0.25} inView className="space-y-4">
              {data === 0 ?
                <p>Tidak ada data.</p>
              :
                <>
                  <BentoForNewsPage query={query} currentPage={currentPage}/>
                  <Pagination totalPages={totalPages} data={data} totalData={totalData}/>
                </>
              }
            </BlurFade>
          </div>
        </div>
      </section>
    </>
  )
}

export default AllNewsPage