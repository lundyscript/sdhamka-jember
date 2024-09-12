"use client"
import Link from "next/link"
import Image from "next/image"
import { DarkLightToggle, UserButton } from "@/components/button"
import { ToggleGroup } from "@/components/ui/toggle-group"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"


export default function NavbarComponent() {
  return (
    <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6 border-b fixed z-10 backdrop-blur-sm bg-background/50 shadow-sm font-RobotoCondensed text-[15px] tracking-wider">
      <div className="mr-6 hidden lg:flex">
        <span className="flex flex-row gap-2 items-center uppercase font-bold text-lg text-default tracking-tighter">
          <Image
            src="/img/logo.png"
            width={44}
            height={44}
            alt="Logo"
          />
        </span>
      </div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>PROFIL</MenubarTrigger>
          <MenubarContent>
            <Link href="/profiles"><MenubarItem>PROFIL SEKOLAH</MenubarItem></Link>
            <Link href="/teachers"><MenubarItem>KARYAWAN SEKOLAH</MenubarItem></Link>
            <Link href="/posts"><MenubarItem>INFORMASI SEKOLAH</MenubarItem></Link>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger><Link href="/subjects">ENSIKLOPEDIA</Link></MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>PPDB</MenubarTrigger>
          <MenubarContent>
            <Link href="/period"><MenubarItem>PERIODE</MenubarItem></Link>
            <Link href="/registration"><MenubarItem>PENDAFTARAN</MenubarItem></Link>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="ml-auto">
        <ToggleGroup variant="outline" type="multiple" className="gap-2">
          <DarkLightToggle/>
          <UserButton/>
        </ToggleGroup>
      </div>
    </header>
  )
}