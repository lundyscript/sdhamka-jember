import BlurFade from "@/components/magicui/blur-fade"
import GridPattern from "@/components/magicui/grid-pattern"
import { PPDBError } from "@/components/notification/card"
import NavbarComponent from "@/components/utils/navbar"
import { cn } from "@/lib/utils"

const PPDBErrorPage = () => {
  return (
    <>
      <NavbarComponent/>
      <section className="w-full py-20 lg:py-28">
        <div className="lg:flex w-full items-center justify-center px-4 md:px-6">
          <BlurFade delay={0.35} inView>
            <PPDBError/>
          </BlurFade>
        </div>
      </section>
      <GridPattern
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "-z-10"
        )}
      />
    </>
  )
}

export default PPDBErrorPage