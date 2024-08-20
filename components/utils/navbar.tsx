import Link from "next/link"
import { ChevronRight, Menu } from "lucide-react"
import { FaInstagram, FaRegEnvelope, FaWhatsapp } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { DarkLightToggle } from "@/components/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import ShinyButton from "@/components/magicui/shiny-button";
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function NavbarComponent() {
  return (
    <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6 fixed z-10 backdrop-blur-sm bg-background/50 font-RobotoCondensed text-[15px] tracking-wider">
      <div className="mr-6 hidden lg:flex space-x-6 items-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image
            src="/studying-student-svgrepo-com.svg"
            width={44}
            height={44}
            alt="Logo"
          />
          <div className="font-medium text-base leading-4 tracking-tighter">
            <p>SD MUHAMMADIYAH</p>
            <p>KALIWATES JEMBER</p>
          </div>
        </Link>
        <Link href="/profile" className="font-medium hover:underline hover:underline-offset-4">PROFIL</Link>
        <Link href="/employees" className="font-medium hover:underline hover:underline-offset-4">GURU</Link>
        <Link href="/news" className="font-medium hover:underline hover:underline-offset-4">INFORMASI</Link>
        <Link href="/elearning" className="font-medium hover:underline hover:underline-offset-4">E-LEARNING</Link>
        <Link href="/ppdb"><ShinyButton text="PPDB ONLINE"/></Link>
      </div>
      <Sheet>
        <div className="lg:hidden w-full flex gap-4 justify-between">
          <SheetTrigger asChild>
            <div className="inline-flex gap-4 items-center">
              <Button size="icon" variant="outline">
                <Menu/>
              </Button>
              <Link href="/" className="inline-flex items-center">
                <div className="font-medium text-base leading-4 tracking-tighter">
                  <p>SD MUHAMMADIYAH</p>
                  <p>KALIWATES JEMBER</p>
                </div>
              </Link>
            </div>
          </SheetTrigger>
          <Link href="/ppdb"><ShinyButton text="PPDB ONLINE"/></Link>
        </div>
        <SheetContent side="left">
          <div className="flex flex-col h-full justify-between">
            <div className="grid gap-6 py-8">
              <div className="inline-flex gap-4">
                <Image
                  src="/studying-student-svgrepo-com.svg"
                  width={44}
                  height={44}
                  alt="Logo"
                />
                <Link href="/" className="inline-flex items-center">
                  <div className="font-medium text-base leading-4 tracking-tighter">
                    <p>SD MUHAMMADIYAH</p>
                    <p>KALIWATES JEMBER</p>
                  </div>
                </Link>
              </div>
              <Link href="/profile" className="text-xl font-bold tracking-tight">PROFIL</Link>
              <Link href="/employees" className="text-xl font-bold tracking-tight">GURU</Link>
              <Link href="/news" className="text-xl font-bold tracking-tight">INFORMASI</Link>
              <Link href="/elearning" className="text-xl font-bold tracking-tight">E-LEARNING</Link>
              <Link href="/ppdb" className="text-xl font-bold tracking-tight">PPDB ONLINE</Link>
            </div>
            <div>
              <p className="py-4">Temukan Kami :</p>
              <div className="flex items-center justify-between">
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
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link href="/" target="_blank" className="h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
                        <FaRegEnvelope size={18}/>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Email</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <DarkLightToggle/>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="ml-auto hidden lg:flex space-x-0 items-center">
        <p className="pr-2">Temukan Kami :</p>
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
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <Link href="/" target="_blank" className="h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
                <FaRegEnvelope size={18}/>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Email</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DarkLightToggle/>
      </div>
    </header>
  )
}