import { format } from "date-fns"
import NavbarComponent from '@/components/utils/navbar'
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils";
import GridPattern from "@/components/magicui/grid-pattern";
import BlurFade from "@/components/magicui/blur-fade";
import { BodyPreview } from "@/components/utils/body";
import Image from "next/image";
import { getSubjectById } from "@/data/elearning";

const SubjectPage = async ({searchParams}:{searchParams?:{ q?: string }}) => {
  const subject = await getSubjectById(searchParams?.q)
  return (
    <>
      <NavbarComponent/>
      <section className="w-full py-20 lg:py-28">
      <div className="container items-center max-w-4xl px-4 md:px-6 space-y-6">
        <div className="text-justify justify-center leading-loose space-y-3 z-50">
          <Link href={{pathname: '/elearning'}} className="text-sm font-medium text-muted-foreground transition-all duration-200 ease-out hover:text-primary hover:translate-x-1">&#129120; Back to Explorer</Link>
          <BlurFade delay={0.25} inView>
            <div className="relative my-4 h-52 w-full">
              <Image src={subject?.image ? `/${subject.image}` : "/placeholder.svg"} alt={subject?.subject ? subject.subject : "Cover"} layout="fill" sizes="100vw" priority className="rounded-md object-cover" />
            </div>
            <div className="flex flex-row gap-4 items-center pb-2">
              <p className="text-sm text-muted-foreground">{subject?.createdAt ? format(subject.createdAt, "dd/MM/yyyy") : ""}</p>
              <Badge variant={"default"} className="text-sm">{subject?.classroom}</Badge>
              <Badge variant={"default"} className="text-sm">{subject?.teacher.name}</Badge>
            </div>
            <h3 className="pb-4 text-2xl font-bold tracking-tight">{subject?.subject}</h3>
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
    </>
  )
}

export default SubjectPage