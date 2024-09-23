import { cn } from "@/lib/utils"
import Marquee from "@/components/magicui/marquee"
import Image from "next/image"
import { getAllTeachersData } from "@/data/teachers"
import { getAllSubjects, getSubjectsAllData, getSubjectsData, getSubjectsPages } from "@/data/ensiklopedia"
import { getAllPosts, getFourPosts } from "@/data/posts"
import { ArrowRightIcon } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { Badge } from "../ui/badge"

export const TeachersCard = async () => {
  const teachers = await getAllTeachersData()
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:50s]">
        {teachers.map((teacher) => (
          <div key={teacher.id}>
            <figure className={cn("relative w-56 lg:w-80 rounded-lg cursor-pointer overflow-hidden border p-4 space-y-4","border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]","dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",)}>
              <Image src={teacher.image ? `${teacher.image}` : "/placeholder.svg"} alt={teacher.name ? teacher.name : "Employee"} width={0} height={0} sizes="100vw" className="w-full h-auto rounded-md overflow-hidden object-cover object-center transition-all duration-300 ease-out hover:scale-105 hover:shadow-md" />
              <figcaption className="text-lg font-semibold text-primary leading-5">
                {teacher.name}
                <p className="text-base text-muted-foreground md:text-sm/relaxed lg:text-md/relaxed xl:text-lg/relaxed">{teacher.position}</p>
              </figcaption>
            </figure>
          </div>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 lg:w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 lg:w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}


export const SubjectsCard = async ({query, currentPage}:{query: string, currentPage: number}) => {
  const subjects = await getAllSubjects(query, currentPage)
  return (
    <>
      {!subjects?.length ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      :
        <div className={cn( "grid auto-rows-[22rem] lg:grid-cols-3 gap-6")} >
          {subjects.map((subject, idx) => (
            <div key={idx} className={cn("group relative flex flex-col justify-between overflow-hidden rounded-xl text-left","bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]","transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]")}>
              <div>
                <Image src={subject.image ? `/${subject.image}` : "/placeholder.svg"} alt={subject.subject} width={0} height={0} sizes="100vw" className="w-full h-full absolute rounded-md object-cover object-center border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] group-hover:scale-105" />
              </div>
              <div className="z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
                <div className="flex flex-row gap-4 pb-2">
                  <Link href={{pathname: '/ensiklopedia', query: { query: subject.classroom.toLowerCase() }}}><Badge variant={"default"} className="text-sm font-normal hover:cursor-pointer">{subject.classroom}</Badge></Link>
                  <Link href={{pathname: '/ensiklopedia', query: { query: subject.teacher.name.toLowerCase() }}}><Badge variant={"default"} className="text-sm font-normal hover:cursor-pointer">{subject.teacher.name}</Badge></Link>
                </div>
                <Link href={`/ensiklopedia?read=${subject.id}`}><h3 className="capitalize text-xl font-bold tracking-tight hover:text-primary/70">{subject.subject}</h3></Link>
                <div className="max-w-lg text-muted-foreground tracking-tight" dangerouslySetInnerHTML={{ __html: subject.body.substring(0,100) + "..." }} />
              </div>
              <div className={cn("pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",)}>
                <Button variant="ghost" asChild size="sm" className="pointer-events-auto"><Link href={`/ensiklopedia?read=${subject.id}`}>Selengkapnya<ArrowRightIcon className="ml-2 h-4 w-4" /></Link></Button>
              </div>
              <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
            </div>
          ))}
        </div>
      }
    </>
  )
}

export const BentoForHomePage = async () => {
    const news = await getFourPosts()
    return (
      <div className={cn( "grid w-full auto-rows-[22rem] lg:grid-cols-3 gap-6")} >
        {news.map((post, idx) => (
          <div key={idx} className={cn(idx === 0 || idx === 3 ? "lg:col-span-2" : "col-span-1","group relative flex flex-col justify-between overflow-hidden rounded-xl text-left","bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]","transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]")}>
            <div>
              <Image src={post.image ? `${post.image}` : "/placeholder.svg"} alt={post.title} width={0} height={0} sizes="100vw" className="w-full h-full absolute rounded-md object-cover object-center border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] group-hover:scale-105" />
            </div>
            <div className="z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
              <Link href={`/news?read=${post.id}`}><h3 className="text-xl font-semibold text-primary">{post.title}</h3></Link>
              <div className="max-w-lg text-muted-foreground" dangerouslySetInnerHTML={{ __html: post.body.substring(0,100) + "..." }} />
            </div>
            <div className={cn("pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",)}>
              <Button variant="ghost" asChild size="sm" className="pointer-events-auto"><Link href={`/news?read=${post.id}`}>Selengkapnya<ArrowRightIcon className="ml-2 h-4 w-4" /></Link></Button>
            </div>
            <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
          </div>
        ))}
      </div>
    );
  }

export const BentoForNewsPage = async ({query, currentPage}:{query: string, currentPage: number}) => {
  const news = await getAllPosts(query, currentPage)
  return (
    <div className={cn( "grid auto-rows-[22rem] lg:grid-cols-4 gap-6")} >
      {news.map((post, idx) => (
        <div key={idx}className={cn("group relative flex flex-col justify-between overflow-hidden rounded-xl text-left","bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]","transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]")}>
          <div>
            <Image src={post.image ? `${post.image}` : "/placeholder.svg"} alt={post.title} width={0} height={0} sizes="100vw" className="w-full h-full absolute rounded-md object-cover object-center border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] group-hover:scale-105" />
          </div>
          <div className="z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
            <Link href={`/news?read=${post.id}`}><h3 className="capitalize text-xl font-semibold text-primary">{post.title}</h3></Link>
            <div className="max-w-lg text-muted-foreground" dangerouslySetInnerHTML={{ __html: post.body.substring(0,100) + "..." }} />
          </div>
          <div className={cn( "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",)}>
            <Button variant="ghost" asChild size="sm" className="pointer-events-auto"><Link href={`/news?read=${post.id}`}>Selengkapnya<ArrowRightIcon className="ml-2 h-4 w-4" /></Link></Button>
          </div>
          <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
        </div>
      ))}
    </div>
  );
}