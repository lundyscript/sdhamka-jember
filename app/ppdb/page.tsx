/* eslint-disable @next/next/no-img-element */
import BlurFade from '@/components/magicui/blur-fade'
import { BorderBeam } from '@/components/magicui/border-beam'
import NavbarComponent from '@/components/utils/navbar'
import React from 'react'
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern"
import { getAllProfiles } from '@/data/profiles'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ChevronRightIcon } from 'lucide-react'
import { BodyPreview } from '@/components/utils/body'


const PpdbPage = async () => {
  const newsForPPDB = await getAllProfiles("ppdb",1)
  return (
    <>
      <NavbarComponent/>
      <section className="w-full py-20 lg:py-28">
        <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <BlurFade delay={0.25} inView className="space-y-4">
            {newsForPPDB.map((profile, index) => (
              <div key={index} className="relative flex p-4 flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                <img src={profile.image ? profile.image : "/placeholder.svg"} alt="Hero" className="mx-auto rounded-md overflow-hidden object-cover object-center sm:w-full"/>
                <BorderBeam size={250} duration={12} delay={9} />
              </div>
            ))}
          </BlurFade>
          <BlurFade delay={0.35} inView>
            {newsForPPDB.map((profile, index) => (
              <div key={index+1} className="space-y-4 pb-4">
                <h1 className="font-bold tracking-tighter sm:text-3xl md:text-4xl capitalize">{profile.title}</h1> 
                <p className="text-muted-foreground lg:text-md xl:text-lg text-justify">{profile.subtitle}</p>
                <Link href="/ppdb/register" className="group inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" prefetch={false}>
                  Daftar
                  <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <BodyPreview body={profile.body}/>
              </div>
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

export default PpdbPage