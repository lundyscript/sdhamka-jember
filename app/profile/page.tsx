/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils'
import BlurFade from '@/components/magicui/blur-fade'
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern"
import NavbarComponent from '@/components/utils/navbar'
import { getAllProfiles } from '@/data/profiles'
import { BorderBeam } from '@/components/magicui/border-beam'
import { BodyPreview } from '@/components/utils/body'

const ProfilePage = async () => {
  const sejarah = await getAllProfiles("sejarah", 1)
  const visimisi = await getAllProfiles("visi misi", 1)
  return (
    <>
      <NavbarComponent/>
      <section className="w-full py-20 lg:py-28">
        <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <BlurFade delay={0.25} inView className="space-y-4">
            {sejarah.map((profile, index) => (
              <div key={index} className="relative flex p-4 flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                <img src={profile.image ? profile.image : "/placeholder.svg"} alt="Hero" className="lg:mx-auto rounded-md aspect-square overflow-hidden object-cover object-center"/>
                <BorderBeam size={250} duration={12} delay={9} />
              </div>
            ))}
          </BlurFade>
          <BlurFade delay={0.35} inView>
            {sejarah.map((profile, index) => (
              <>
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl" key={index+1}>{profile.title}</h1> 
                <p className="max-w-[600px] pb-4 text-muted-foreground md:text-lg lg:text-base xl:text-xl">
                  {profile.subtitle}
                </p>
                <BodyPreview body={profile.body}/>
              </>
            ))}
            {visimisi.map((profile, index) => (
              <>
                <BodyPreview body={profile.body}/>
              </>
            ))}
          </BlurFade>
        </div>
      </section>
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
    </>
  )
}

export default ProfilePage