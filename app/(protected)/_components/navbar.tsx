"use client"
import Link from "next/link"
import { NavigationMenuLink, NavigationMenuItem, NavigationMenuList, NavigationMenu } from "@/components/ui/navigation-menu"
import { School } from "lucide-react"
import { DarkLightToggle, UserButton } from "@/components/button"
import { ToggleGroup } from "@/components/ui/toggle-group"

export default function NavbarComponent() {
  return (
    <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6 border-b fixed z-10 backdrop-blur-sm bg-background/50 shadow-sm font-RobotoCondensed text-[15px] tracking-wider">
      <div className="mr-6 hidden lg:flex">
        <span className="flex flex-row gap-2 items-center uppercase font-bold text-lg text-default tracking-tighter">
          <School size={32}/>
        </span>
      </div>
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/profiles" legacyBehavior passHref>
              <NavigationMenuLink className="font-medium uppercase block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-accent-foreground hover:underline hover:underline-offset-4 focus:text-accent-foreground">
                PROFIL
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/teachers" legacyBehavior passHref>
              <NavigationMenuLink className="font-medium uppercase block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-accent-foreground hover:underline hover:underline-offset-4 focus:text-accent-foreground">
                GURU
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/posts" legacyBehavior passHref>
              <NavigationMenuLink className="font-medium uppercase block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-accent-foreground hover:underline hover:underline-offset-4 focus:text-accent-foreground">
                INFORMASI
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/subjects" legacyBehavior passHref>
              <NavigationMenuLink className="font-medium uppercase block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-accent-foreground hover:underline hover:underline-offset-4 focus:text-accent-foreground">
                Ensiklopedia
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/adminppdb" legacyBehavior passHref>
              <NavigationMenuLink className="font-medium uppercase block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-accent-foreground hover:underline hover:underline-offset-4 focus:text-accent-foreground">
                PPDB
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="ml-auto">
        <ToggleGroup variant="outline" type="multiple" className="gap-2">
          <DarkLightToggle/>
          <UserButton/>
        </ToggleGroup>
      </div>
    </header>
  )
}