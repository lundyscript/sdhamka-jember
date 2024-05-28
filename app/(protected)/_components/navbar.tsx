"use client"
import Link from "next/link"
import { NavigationMenuLink, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuList, NavigationMenu } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "@/components/ui/collapsible"
import { ChevronRight, Droplet, Menu } from "lucide-react"
import { ModeToggle, UserButton } from "@/components/button"
import { ToggleGroup } from "@/components/ui/toggle-group"

export default function NavbarComponent() {
  return (
    <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6 border-b fixed z-10 bg-background">
      <div className="mr-6 hidden lg:flex">
        <span className="flex flex-row gap-2 font-bold text-lg text-default tracking-tighter"><Droplet/>moyamu</span>
      </div>
      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Transaksi</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <NavigationMenuLink asChild>
                  <Link
                    className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/orders"
                  >
                    <div className="text-sm font-bold leading-none">Penjualan</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Daftar penjualan air minum dalam kemasan Moyamu Jember.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/spends"
                  >
                    <div className="text-sm font-bold leading-none">Pengeluaran</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Daftar pengeluaran operasional dan produksi Moyamu Jember.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/purchases"
                  >
                    <div className="text-sm font-bold leading-none">Pembelian</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Daftar pembelian bahan baku produksi air minum.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/packaging"
                  >
                    <div className="text-sm font-bold leading-none">Pengemasan</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Daftar pengemasan air minum dalam kemasan kardus.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Perhitungan</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                <NavigationMenuLink asChild>
                  <Link
                    className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/profits"
                  >
                    <div className="text-sm font-bold leading-none">Keuntungan</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Perhitungan keuntungan penjualan Moyamu Jember.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/bills"
                  >
                    <div className="text-sm font-bold leading-none">Tagihan</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Daftar tagihan pembayaran penjualan Moyamu Jember.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/salarys"
                  >
                    <div className="text-sm font-bold leading-none">Gaji Karyawan</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Perhitungan gaji karyawan Moyamu Jember.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Pelengkap</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                <NavigationMenuLink asChild>
                  <Link
                    className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/buyers"
                  >
                    <div className="text-sm font-bold leading-none">Pelanggan</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Daftar pembeli air minum dalam kemasan Moyamu Jember.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/products"
                  >
                    <div className="text-sm font-bold leading-none">Produk</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Daftar produk air minum dalam kemasan Moyamu Jember.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/employees"
                  >
                    <div className="text-sm font-bold leading-none">Karyawan</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Daftar karyawan Unit Usaha Moyamu Jember.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    href="/ingredients"
                  >
                    <div className="text-sm font-bold leading-none">Stok Bahan</div>
                    <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Daftar stok bahan baku produksi Moyamu Jember.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="outline">
            <Menu/>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-row gap-4 items-center">
            <Droplet size={30}/>
            <span className="text-xl font-bold tracking-tighter">moyamu</span>
          </div>
          <div className="grid gap-6 py-8">
            <Collapsible className="grid gap-4">
              <CollapsibleTrigger className="flex gap-2 w-full items-center text-xl font-bold tracking-tight transition duration-300 [&[data-state=open]>svg]:rotate-90">
                Transaksi
                <ChevronRight size={17}/>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="-mx-6 grid gap-4 px-6 text-sm">
                  <Link className="group grid h-auto w-full justify-start gap-1" href="/orders">
                    <div className="font-medium group-hover:underline">Penjualan</div>
                    <div className="text-muted-foreground">
                      Daftar penjualan air minum dalam kemasan Moyamu Jember.
                    </div>
                  </Link>
                  <Link className="group grid h-auto w-full justify-start gap-1" href="/spends">
                    <div className="font-medium group-hover:underline">Pengeluaran</div>
                    <div className="text-muted-foreground">
                      Daftar pengeluaran operasional dan produksi Moyamu Jember.
                    </div>
                  </Link>
                  <Link className="group grid h-auto w-full justify-start gap-1" href="/purchases">
                    <div className="font-medium group-hover:underline">Pembelian</div>
                    <div className="text-muted-foreground">
                      Daftar pembelian bahan baku produksi air minum.
                    </div>
                  </Link>
                  <Link className="group grid h-auto w-full justify-start gap-1" href="/packaging">
                    <div className="font-medium group-hover:underline">Pengemasan</div>
                    <div className="text-muted-foreground">
                      Daftar pengemasan air minum dalam kemasan kardus.
                    </div>
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className="grid gap-4">
              <CollapsibleTrigger className="flex gap-2 w-full items-center text-xl font-bold tracking-tight transition duration-300 [&[data-state=open]>svg]:rotate-90">
                Perhitungan
                <ChevronRight size={17}/>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="-mx-6 grid gap-4 px-6 text-sm">
                  <Link className="group grid h-auto w-full justify-start gap-1" href="/profits">
                    <div className="font-medium group-hover:underline">Keuntungan</div>
                    <div className="text-muted-foreground">
                      Perhitungan keuntungan penjualan Moyamu Jember.
                    </div>
                  </Link>
                  <Link className="group grid h-auto w-full justify-start gap-1" href="/bills">
                    <div className="font-medium group-hover:underline">Tagihan</div>
                    <div className="text-muted-foreground">
                      Daftar tagihan pembayaran penjualan Moyamu Jember.
                    </div>
                  </Link>
                  <Link className="group grid h-auto w-full justify-start gap-1" href="/salarys">
                    <div className="font-medium group-hover:underline">Gaji Karyawan</div>
                    <div className="text-muted-foreground">
                      Perhitungan gaji karyawan Moyamu Jember.
                    </div>
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className="grid gap-4">
              <CollapsibleTrigger className="flex gap-2 w-full items-center text-xl font-bold tracking-tight transition duration-300 [&[data-state=open]>svg]:rotate-90">
                Pelengkap
                <ChevronRight size={17}/>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="-mx-6 grid gap-4 px-6 text-sm">
                  <Link className="group grid h-auto w-full justify-start gap-1" href="/buyers">
                    <div className="font-medium group-hover:underline">Pelanggan</div>
                    <div className="text-muted-foreground">
                      Daftar pembeli air minum dalam kemasan Moyamu Jember.
                    </div>
                  </Link>
                  <Link className="group grid h-auto w-full justify-start gap-1" href="/employees">
                    <div className="font-medium group-hover:underline">Karyawan</div>
                    <div className="text-muted-foreground">
                      Daftar karyawan Unit Usaha Moyamu Jember.
                    </div>
                  </Link>
                  <Link className="group grid h-auto w-full justify-start gap-1" href="/products">
                    <div className="font-medium group-hover:underline">Produk</div>
                    <div className="text-muted-foreground">
                      Daftar produk air minum dalam kemasan Moyamu Jember.
                    </div>
                  </Link>
                  <Link className="group grid h-auto w-full justify-start gap-1" href="/ingredients">
                    <div className="font-medium group-hover:underline">Stok Bahan</div>
                    <div className="text-muted-foreground">
                      Daftar stok bahan baku produksi Moyamu Jember.
                    </div>
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </SheetContent>
      </Sheet>
      <div className="ml-auto">
        <ToggleGroup variant="outline" type="multiple" className="gap-2">
          <ModeToggle/>
          <UserButton/>
        </ToggleGroup>
      </div>
    </header>
  )
}