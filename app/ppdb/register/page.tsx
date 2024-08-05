/* eslint-disable @next/next/no-img-element */
import BlurFade from '@/components/magicui/blur-fade'
import { BorderBeam } from '@/components/magicui/border-beam'
import NavbarComponent from '@/components/utils/navbar'
import React from 'react'
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern"
import { getAllProfiles } from '@/data/profiles'
import { cn } from '@/lib/utils'
import { NewPPDBForm } from '@/components/form/ppdb'


const PpdbRegisterPage = async () => {
  const newsForPPDB = await getAllProfiles("ppdb",1)
  return (
    <>
      <NavbarComponent/>
      <section className="w-full py-20 lg:py-28">
        <div className="container px-4 md:px-6">
          <BlurFade delay={0.35} inView>
            <NewPPDBForm/>
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

export default PpdbRegisterPage