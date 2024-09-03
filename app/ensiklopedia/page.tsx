/* eslint-disable @next/next/no-img-element */
import { SearchBar } from '@/components/input/search'
import BlurFade from '@/components/magicui/blur-fade'
import NavbarComponent from '@/components/utils/navbar'
import { getSubjectById, getSubjectsAllData, getSubjectsData, getSubjectsPages } from '@/data/ensiklopedia'
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern"
import { cn } from '@/lib/utils'
import { SubjectsCard } from '@/components/card'
import Pagination from '@/components/utils/pagination'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { BodyPreview } from '@/components/utils/body'
import GridPattern from '@/components/magicui/grid-pattern'
import { format } from 'date-fns'


const ElearningPage = async ({searchParams}:{searchParams?:{ query?: string, page?: string, read?: string }}) => {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const data = await getSubjectsData(query, currentPage)
  const totalPages = await getSubjectsPages(query)
  const totalData = await getSubjectsAllData()
  const subject = await getSubjectById(searchParams?.read)

  return (
    <>
      <NavbarComponent/>
      {subject == null ?
        <>
          <section className="w-full py-20 lg:py-28 flex items-center justify-center">
            <div className="flex flex-col gap-4 max-w-4xl px-4 text-center place-content-center">
              <div className="space-y-3">
                <BlurFade delay={0.25} inView>
                  <h1 className="text-6xl font-bold tracking-tighter">
                    Ensiklopedia Sekolah
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
                  <>
                    <SubjectsCard query={query} currentPage={currentPage}/>
                    <Pagination totalPages={totalPages} data={data} totalData={totalData}/>
                  </>
                }
              </div>
            </BlurFade>
          </section>
        </>
      :
        <section className="w-full py-20 lg:py-28">
        <div className="container items-center max-w-4xl px-4 md:px-6 space-y-6">
          <div className="text-justify justify-center leading-loose space-y-3 z-50">
            <Link href={{pathname: '/ensiklopedia'}} className="text-sm font-medium text-muted-foreground transition-all duration-200 ease-out hover:text-primary hover:translate-x-1">&#129120; Back to Explorer</Link>
            <BlurFade delay={0.25} inView>
              <div className="relative my-4 h-52 w-full">
                <Image src={subject?.image ? `/${subject.image}` : "/placeholder.svg"} alt={subject?.subject ? subject.subject : "Cover"} layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
              </div>
              <div className="flex flex-row gap-4 items-center pb-2">
                <p className="text-sm text-muted-foreground">{subject?.createdAt ? format(subject.createdAt, "dd/MM/yyyy") : ""}</p>
                <Badge variant={"default"} className="text-sm capitalize">{subject?.classroom}</Badge>
                <Badge variant={"default"} className="text-sm">{subject?.teacher.name}</Badge>
              </div>
              <h3 className="pb-4 text-2xl font-bold tracking-tight capitalize">{subject?.subject}</h3>
              <BodyPreview body={subject?.body ? subject.body : ""}/>
            </BlurFade>
          </div>
        </div>
        <GridPattern
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
            "-z-10"
          )}
        />
        </section>
      }
    </>
  )
}

export default ElearningPage