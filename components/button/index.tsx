"use client"
import * as React from "react"
import * as XLSX from "xlsx"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useSearchParams } from "next/navigation"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useCurrentRole } from "@/hooks/use-current-role"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { signIn } from "next-auth/react"
import { logoutAction } from "@/actions/logout"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { DeleteModal } from "@/components/utils/modal"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sun, Moon, Laptop, UserRound, LogOut, Settings, ShieldQuestion, ServerCog, MonitorSmartphone, Plus, ArrowDownToLine, Pencil, Loader } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { useEffect, useState } from "react"

export const ActionButton = ({data, id, name}: {data: string, id: string, name: string}) => {
  return (
    <>
      <Link href={`/${data}/edit/${id}`}><Button variant={"ghost"} size={"icon"} className="hover:bg-yellow-600/20 hover:text-yellow-600"><Pencil size={17}/></Button></Link>
      <DeleteModal data={data} id={id} name={name}/>
    </>
  )
}

export const CreateButton = ({href, label}: {href: string, label: string}) => {
  return ( 
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant={"default"} size={"sm"} className="font-medium border">
            <Link href={href}><Plus size={17} /></Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Tambah data {label} baru.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export const DownloadButton = ({data, label}: {data: any, label: string}) => {
  const filename = label + ".xlsx"
  const onClick = () => {
    const jsonstrg = JSON.stringify(data)
    const jsondata = JSON.parse(jsonstrg)
    const worksheet = XLSX.utils.json_to_sheet(jsondata)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
    XLSX.writeFile(workbook, filename, { compression: true })
  }
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={onClick} variant={"secondary"} size={"sm"} className="border">
            <ArrowDownToLine size={17}/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Unduh data {label}.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const SaveButton = () => {
  return (
    <Button type="submit" variant={"default"} className="font-medium w-full">Simpan</Button>
  )
}

export const ResetPasswordButton = ({label}: {label: string}) => {
  return (
    <Button type="submit" variant={"default"} className="font-medium w-full">{label}</Button>
  )
}

export const RegisterButton = () => {
  return (
    <Button type="submit" variant={"default"} className="font-medium w-full">Create an Account</Button>
  )
}

export const LoginButton = ({label}: {label: string}) => {
  return (
    <Button type="submit" variant={"default"} className="font-medium w-full">{label}</Button>
  )
}

export const LogoutButton = ({children}: {children?: React.ReactNode}) => {
  const onClick = () => {
    logoutAction()
  }
  return (
    <span onClick={onClick}>
      {children}
    </span>
  )
}

export const LoadingButton = () => {
  return (
    <Button disabled variant={"default"} className="w-full">
      <Loader size={17} className="mr-2 animate-spin"/>
      Loading
    </Button>
  )
}

export const LinkButton = ({href, label, description}: {href: string, label: string, description: string}) => {
  return (
      <div className="flex flex-row text-sm items-center gap-2 font-normal py-1">
        <p>{description}</p>
        <Link href={href} className="font-semibold hover:underline underline-offset-4">{label}</Link>
      </div>
  )
}

export const SocialButton = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
    });
  }
  return ( 
    <div className="flex items-center w-full gap-x-2 pb-4">
      <Button variant={"outline"} onClick={ () => onClick("google") } className="w-full">
        <FcGoogle className="w-5 h-5"/>
      </Button>
      <Button variant={"outline"} onClick={ () => onClick("github") } className="w-full">
        <FaGithub className="w-5 h-5"/>
      </Button>
    </div>
  );
}

export const UserButton = () => {
  const user = useCurrentUser()
  const role = useCurrentRole()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:cursor-pointer">
        <Avatar>
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback><UserRound size={20}/></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {role === "ADMIN" ?
          <>
            <Link href="/server"><DropdownMenuItem className="gap-2"><ServerCog size={17}/>Server</DropdownMenuItem></Link>
            <Link href="/client"><DropdownMenuItem className="gap-2"><MonitorSmartphone size={17}/>Client</DropdownMenuItem></Link>
            <Link href="/admin"><DropdownMenuItem className="gap-2"><ShieldQuestion size={17}/>Admin</DropdownMenuItem></Link>
            <Link href="/settings"><DropdownMenuItem className="gap-2"><Settings size={17}/>Settings</DropdownMenuItem></Link>
          </>
        :
          <>
            <Link href="/settings"><DropdownMenuItem className="gap-2"><Settings size={17}/>Settings</DropdownMenuItem></Link>
          </>
        }
        <DropdownMenuSeparator />
        <LogoutButton>
          <DropdownMenuItem className="gap-2 text-red-700 focus:bg-destructive/20 focus:text-red-700"><LogOut size={17}/>Logout</DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ModeToggle() {
  const { setTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 focus-visible:ring-offset-0 focus-visible:ring-0">
          <Sun size={22} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon size={21} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} className="gap-3">
          <Sun size={17}/>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="gap-3">
          <Moon size={17}/>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="gap-3">
          <Laptop size={17}/>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const DarkLightToggle = () => {
  const { theme, setTheme } = useTheme()
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  return (
    <Button variant={"ghost"} size={"icon"} onClick={() => setTheme(theme == "light" ? "dark" : "light")}>
      {hasMounted && theme == "light" ? <Moon size={19}/> : <Sun size={19}/> }
    </Button>
  )
}