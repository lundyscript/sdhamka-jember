import Link from "next/link"
import Image from "next/image"
import BlurFade from "@/components/magicui/blur-fade"
import NavbarComponent from "@/components/utils/navbar"
import AnimatedGridPattern from "@/components/magicui/animated-grid-pattern"
import AnimatedShinyText from "@/components/magicui/animated-shiny-text"
import { cn } from "@/lib/utils"
import { ChevronRightIcon } from "lucide-react"
import { BorderBeam } from "@/components/magicui/border-beam"
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { getAllProfiles } from "@/data/profiles"
import { getHeadmasterData } from "@/data/teachers"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FaInstagram, FaRegEnvelope, FaWhatsapp } from "react-icons/fa"
import { BentoForHomePage, TeachersCard } from "@/components/card"


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
                    <Image src={profile.image ? `${profile.image}` : "/placeholder.svg"} alt={profile.title ? profile.title : "Hero"} width={0} height={0} sizes="100vw" className="w-full h-auto rounded-md aspect-square overflow-hidden object-cover object-center" />
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
                    <Image src={profile.image ? `${profile.image}` : "/placeholder.svg"} alt={profile.title ? profile.title : "Hero"} width={0} height={0} sizes="100vw" className="w-full h-auto rounded-md aspect-square overflow-hidden object-cover object-center" />
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
          <section className="w-full py-20 lg:py-28">
            <div className="container flex flex-col px-4 md:px-6 items-center text-center space-y-4">
              <BlurFade delay={0.25} inView>
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                  Guru dan Karyawan
                </h1>
                <p className="max-w-4xl text-muted-foreground md:text-sm/relaxed lg:text-md/relaxed xl:text-lg/relaxed">
                  Berikut ini adalah profil Guru dan Karyawan di SD Muhammadiyah Kaliwates Jember
                </p>
              </BlurFade>
              <BlurFade delay={0.35} inView className="w-full">
                <TeachersCard />
              </BlurFade>
            </div>
          </section>
          <section className="w-full py-20 lg:py-28">
            <div className="container flex flex-col items-center max-w-4xl md:w-2xl px-4 md:px-6 text-center space-y-6">
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
          <section className="bg-muted py-12 md:py-16 lg:py-20">
            <div className="container flex flex-col items-center max-w-5xl px-4 md:px-6 text-center space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Hubungi Kami</h2>
                  <p className="max-w-4xl text-muted-foreground md:text-sm/relaxed lg:text-md/relaxed xl:text-lg/relaxed">
                    Jangan sungkan bertanya maupun untuk menyampaikan saran dan kritik dengan menghubungi kami. Kami dengan senang hati akan menerima dan merespon kebutuhan Anda.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                    <div>
                      <h3 className="text-lg font-semibold">Maps</h3>
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.9424828292827!2d113.6806396740569!3d-8.208539282353332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd6971f0ebb06f9%3A0x12a860abbee93147!2sSD%20MUHAMMADIYAH%20KALIWATES!5e0!3m2!1sen!2sid!4v1723915659740!5m2!1sen!2sid" width="420" height="260" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="border rounded-md"></iframe>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">Alamat</h3>
                        <p className="text-muted-foreground">Jl. Moh. Yamin No.9, Berpodak, Tegal Besar, Kec. Kaliwates<br/> Kabupaten Jember, Jawa Timur 68175</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Telepon</h3>
                        <p className="text-muted-foreground">0823 3599 2760</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Email</h3>
                        <p className="text-muted-foreground">info@example.com</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Media Sosial</h3>
                        <div className="flex space-x-2">
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger>
                                <Link href="https://www.youtube.com/@SDMuhammadiyahKaliwates/videos" target="_blank" className="h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
                                  <svg fill="currentColor" width="24" height="24" viewBox="0 -4 32 32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                                    <path d="M30.722,20.579 C30.137,21.894 28.628,23.085 27.211,23.348 C27.066,23.375 23.603,24.000 16.010,24.000 L15.990,24.000 C8.398,24.000 4.932,23.375 4.788,23.349 C3.371,23.085 1.861,21.894 1.275,20.578 C1.223,20.461 0.001,17.647 0.001,12.000 C0.001,6.353 1.223,3.538 1.275,3.421 C1.861,2.105 3.371,0.915 4.788,0.652 C4.932,0.625 8.398,-0.000 15.990,-0.000 C23.603,-0.000 27.066,0.625 27.210,0.651 C28.628,0.915 30.137,2.105 30.723,3.420 C30.775,3.538 32.000,6.353 32.000,12.000 C32.000,17.647 30.775,20.461 30.722,20.579 ZM28.893,4.230 C28.581,3.529 27.603,2.759 26.845,2.618 C26.813,2.612 23.386,2.000 16.010,2.000 C8.615,2.000 5.185,2.612 5.152,2.618 C4.394,2.759 3.417,3.529 3.104,4.234 C3.094,4.255 2.002,6.829 2.002,12.000 C2.002,17.170 3.094,19.744 3.106,19.770 C3.417,20.471 4.394,21.241 5.153,21.382 C5.185,21.388 8.615,22.000 15.990,22.000 L16.010,22.000 C23.386,22.000 26.813,21.388 26.846,21.382 C27.604,21.241 28.581,20.471 28.894,19.766 C28.904,19.744 29.998,17.170 29.998,12.000 C29.998,6.830 28.904,4.255 28.893,4.230 ZM13.541,17.846 C13.379,17.949 13.193,18.000 13.008,18.000 C12.842,18.000 12.676,17.959 12.525,17.875 C12.206,17.699 12.008,17.364 12.008,17.000 L12.008,7.000 C12.008,6.637 12.204,6.303 12.521,6.127 C12.838,5.950 13.227,5.958 13.534,6.149 L21.553,11.105 C21.846,11.286 22.026,11.606 22.027,11.951 C22.028,12.296 21.852,12.618 21.560,12.801 L13.541,17.846 ZM14.009,8.794 L14.009,15.189 L19.137,11.963 L14.009,8.794 Z"/>
                                  </svg>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Youtube</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger>
                                <Link href="https://www.instagram.com/sdmuhammadiyahkaliwates/" target="_blank" className="h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
                                  <FaInstagram size={20}/>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Instagram</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider delayDuration={0}>
                            <Tooltip>
                              <TooltipTrigger>
                                <Link href="https://wa.me/6282335992760" target="_blank" className="h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
                                  <FaWhatsapp size={20}/>
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Whatsapp</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                </div>
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
