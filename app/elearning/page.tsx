/* eslint-disable @next/next/no-img-element */
import { SearchInput } from '@/components/input/search'
import BlurFade from '@/components/magicui/blur-fade'
import { SubjectsCard, SubjectsTable } from '@/components/table/subjects'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/utils/heading'
import NavbarComponent from '@/components/utils/navbar'
import { getSubjectsData } from '@/data/elearning'
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern"
import { cn } from '@/lib/utils'
import { SearchBar } from '@/components/utils/search'


const ElearningPage = async ({searchParams}:{searchParams?:{ query?: string, page?: string }}) => {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const data = await getSubjectsData(query, currentPage)
  return (
    <>
      <NavbarComponent/>
      <section className="w-full py-20 lg:py-28 flex items-center justify-center">
        <div className="flex flex-col gap-4 max-w-4xl px-4 text-center place-content-center">
          <div className="space-y-3">
            <BlurFade delay={0.25} inView>
              <h1 className="text-6xl font-bold tracking-tighter">
                E-Learning Sekolah
              </h1>
            </BlurFade>
            <BlurFade delay={0.25 * 2} inView>
              <p className="mx-auto max-w-[600px] text-base text-muted-foreground">
                Sistem pembelajaran elektronik yang menyediakan informasi pembelajaran daring di SD Muhammadiyah Kaliwates Jember.
              </p>
            </BlurFade>
          </div>
          <BlurFade delay={0.25 * 3} inView>
            <SearchBar/>
          </BlurFade>
        </div>
        <AnimatedGridPattern
          numSquares={50}
          maxOpacity={0.1}
          duration={1}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 -z-10",
          )}
        />
      </section>
      <section className="w-full py-12 md:py-16 lg:py-20">
        <BlurFade delay={0.25 * 4} inView>
          <div className="container grid gap-8 px-4 md:px-6">
            <div className="grid gap-2">
              <h2 className="text-3xl font-bold tracking-tight">Explore Our Courses</h2>
              <p className="text-muted-foreground">Find the perfect course to expand your knowledge and skills.</p>
            </div>
            {!data ? 
              <p className="text-sm text-center">Tidak ada data.</p>
            :
              <SubjectsCard query={query} currentPage={currentPage}/>
            }
          </div>
        </BlurFade>
      </section>
    </>
  )
}

export default ElearningPage