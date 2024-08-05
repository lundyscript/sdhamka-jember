/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils"
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import NavbarComponent from "@/components/utils/navbar"
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern"
import BlurFade from "@/components/magicui/blur-fade"
import { BorderBeam } from "@/components/magicui/border-beam";
import { MarqueeDemo } from "@/components/utils/card";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { AnimatedListDemo } from "@/components/utils/list";
import { getAllProfiles } from "@/data/profiles";
import { BentoForHomePage } from "@/components/utils/grid";
import { getHeadmasterData } from "@/data/teachers";

const HomePage = async () => {
  const sejarah = await getAllProfiles("sejarah", 1)
  const visimisi = await getAllProfiles("visi misi", 1)
  const headmaster = await getHeadmasterData()
  return (
    <>
      { !sejarah.length || !visimisi.length ?
        <div className="h-screen flex items-center justify-center">
          <p className="text-sm text-center">Tidak ada data.</p>
        </div>
      :
        <>
          <NavbarComponent/>
          <section className="w-full py-20 lg:py-28">
            <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
              <BlurFade delay={0.25} inView className="space-y-4">
                {sejarah.map((profile, index) => (
                  <div key={index+1}>
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">{profile.title}</h1> 
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      {profile.subtitle}
                    </p>
                  </div>
                ))}
                <Link href="/profile" className="group inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" prefetch={false}>
                  Selengkapnya
                  <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </BlurFade>
              <BlurFade delay={0.35} inView>
                {sejarah.map((profile, index) => (
                  <div key={index} className="relative flex p-4 flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                    <img src={profile.image ? profile.image : "/placeholder.svg"} alt="Hero" className="lg:mx-auto rounded-md aspect-square lg:overflow-hidden lg:object-cover lg:object-center"/>
                    <BorderBeam size={250} duration={12} delay={9} />
                  </div>
                ))}
              </BlurFade>
            </div>
          </section>
          <section className="w-full">
            <VelocityScroll
              text="Berakhlak • Berprestasi • "
              default_velocity={5}
              className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
            />
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
          <section className="w-full py-20 lg:py-28">
            <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
              <BlurFade delay={0.25} inView>
                {visimisi.map((profile, index) => (
                  <div key={index} className="relative flex p-4 flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                    <img src={profile.image ? profile.image : "/placeholder.svg"} alt="Hero" className="lg:mx-auto rounded-md aspect-square lg:overflow-hidden lg:object-cover lg:object-center"/>
                    <BorderBeam size={250} duration={12} delay={9} />
                  </div>
                ))}
              </BlurFade>
                <BlurFade delay={0.35} inView className="space-y-4">
                  <div className="z-10 flex">
                    <div className={cn( "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",)} >
                      {!headmaster ? 
                        ""
                      : 
                        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                          <span>{headmaster.name} ({headmaster.position})</span>
                          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                        </AnimatedShinyText>
                      }
                    </div>
                  </div>
                  {visimisi.map((profile, index) => (
                    <div key={index+1} className="space-y-2">
                      <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">{profile.title}</h1>
                      <p className="max-w-2xl text-muted-foreground text-justify md:text-sm/relaxed lg:text-md/relaxed xl:text-lg/relaxed">
                        {profile.subtitle}
                      </p>
                    </div>
                  ))}
                  <Link href="/profile" className="group inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" prefetch={false}>
                    Visi dan Misi
                    <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </BlurFade>
            </div>
          </section>
          <section id="#teachers" className="w-full py-20 lg:py-28">
            <div className="container flex flex-col px-4 md:px-6 items-center text-center space-y-4">
              <BlurFade delay={0.25} inView>
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                  Kepala Sekolah dan Staff
                </h1>
                <p className="max-w-4xl text-muted-foreground md:text-sm/relaxed lg:text-md/relaxed xl:text-lg/relaxed">
                  Berikut ini adalah profil Kepala Sekolah dan Staff di SD Muhammadiyah Kaliwates Jember
                </p>
              </BlurFade>
              <BlurFade delay={0.35} inView className="w-full"><MarqueeDemo /></BlurFade>
            </div>
          </section>
          <section className="w-full py-20 lg:py-28">
            <div className="container flex flex-col lg:flex-row gap-10 items-center max-w-4xl px-4 md:px-6 space-y-6">
              <BlurFade delay={0.25} inView className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                  Fasilitas Sekolah
                </h1>
                <p className="max-w-xl text-muted-foreground text-justify md:text-sm/relaxed lg:text-md/relaxed xl:text-lg/relaxed">
                  Fasilitas sekolah sebagai material resources dalam menopang sistem pendidikan sekolah dasar yang bermutu sangatlah penting. Karenanya, guna menunjang kegiatan pembelajaran di sekolah dan menjamin pelayanan yang prima terhadap kebutuhan siswa, SD Negeri Bangirejo 1 dari tahun ke tahun senantiasa menyiapkan dan memperbaharui fasilitas yang ada. Dengan didukung pendanaan dan bantuan dari berbagai banyak pihak, Alhamdulillah sampai pada tahun ajaran 2016/2017 ini SD Begeri Bangirejo 1 telah dilengkapi dengan beberapa fasilitas antara lain:
                </p>
              </BlurFade>
              <BlurFade delay={0.35} inView>
                <div className="relative flex p-4 flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
                  <AnimatedListDemo/>
                  <BorderBeam size={250} duration={12} delay={9} />
                </div>
              </BlurFade>
            </div>
          </section>
          <section className="w-full py-20 lg:py-28">
            <div className="container flex flex-col items-center max-w-4xl px-4 md:px-6 text-center space-y-6">
              <BlurFade delay={0.25} inView>
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                  Informasi Sekolah
                </h1>
                <p className="max-w-4xl text-muted-foreground md:text-sm/relaxed lg:text-md/relaxed xl:text-lg/relaxed">
                  Informasi terbaru terkait kegiatan di SD Muhammadiyah Kaliwates Jember.
                </p>
              </BlurFade>
              <BlurFade delay={0.35} inView className="flex flex-col items-center space-y-4">
                <BentoForHomePage />
                <Link href="/news" className="group inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" prefetch={false}>
                  Selengkapnya
                  <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </BlurFade>
            </div>
          </section>
          <section>
            <div className="w-full h-10 bg-secondary flex items-center justify-center text-center text-sm">© 2024 - All Right Reserved - SD Muhammadiyah Kaliwates Jember</div>
          </section>
        </>
      }
    </>
  );
}

export default HomePage
