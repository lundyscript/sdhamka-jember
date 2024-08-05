/* eslint-disable @next/next/no-img-element */
import { format } from "date-fns"
import NavbarComponent from '@/components/utils/navbar'
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils";
import GridPattern from "@/components/magicui/grid-pattern";
import { getPostById } from "@/data/posts";
import BlurFade from "@/components/magicui/blur-fade";
import { BodyPreview } from "@/components/utils/body";

const TopicPage = async ({searchParams}:{searchParams?:{ q?: string }}) => {
  const topic = await getPostById(searchParams?.q)
  return (
    <>
      <NavbarComponent/>
      <section className="w-full py-20 lg:py-28">
      <div className="container items-center max-w-4xl px-4 md:px-6 space-y-6">
        <div className="text-justify justify-center leading-loose space-y-3 z-50">
          <Link href={{pathname: '/news'}} className="text-sm font-medium text-muted-foreground transition-all duration-200 ease-out hover:text-primary hover:translate-x-1">&#129120; Back to All News</Link>
          <BlurFade delay={0.25} inView>
            <img src={topic?.image ? topic.image : "/placeholder.svg"} alt="Topic image" height={300} className="h-[200px] w-full my-8 object-cover transition-all" />
            <div className="flex flex-row gap-4 items-center">
              <p className="text-sm text-muted-foreground">{topic?.createdAt ? format(topic.createdAt, "dd/MM/yyyy") : ""}</p>
              <Badge variant={"outline"} className="text-sm">{topic?.category}</Badge>
            </div>
            <h3 className="pb-4 text-2xl font-bold tracking-tight">{topic?.title}</h3>
            <BodyPreview body={topic?.body ? topic.body : ""}/>
          </BlurFade>
        </div>
      </div>
        <GridPattern
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          )}
        />
      </section>
    </>
  )
}

export default TopicPage