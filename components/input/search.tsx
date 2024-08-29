"use client"
import { Input } from "@/components/ui/input"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader, Search } from "lucide-react"

export function SearchInput({label}: {label: string}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {replace} = useRouter()
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", "1")
    if(term){
      params.set("query", term)
    }else{
      params.delete("query")
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)
  return (
    <div className="relative flex flex-1">
      <Input type="text" onChange={(e) => handleSearch(e.target.value)} defaultValue={searchParams.get("query")?.toString()} placeholder={label} className="w-full lg:w-64 h-9 pl-8 text-s," />
      <MagnifyingGlassIcon className="absolute left-2 top-2 h-5 w-5 text-primary"/>
    </div>
  )
}

export const SearchBar = () => {
  const keywords = [
    { keywords:"1", name:"ilmu pengetahuan alam" },
    { keywords:"2", name:"bahasa inggris" },
    { keywords:"3", name:"afina syahida" },
    { keywords:"4", name:"kelas 2" },
  ]
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {replace} = useRouter()
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if(term){
      params.set("query", term)
    }else{
      params.delete("query")
    }
    replace(`${pathname}?${params.toString()}`)
  }, 0)
  return (
    <div>
      <form className="flex">
        <Input type="search" onChange={(e) => handleSearch(e.target.value)} defaultValue={searchParams.get("query")?.toString()} placeholder="Mau baca bab mata pelajaran apa?" className="w-full rounded-l-lg rounded-r-none min-h-16 px-6 border-none bg-neutral-800 text-primary-foreground dark:text-primary focus-visible:ring-0 text-md"/>
        <Button className="rounded-l-none rounded-r-lg h-16 w-16 border-none bg-neutral-800 dark:text-primary hover:bg-neutral-900"><Search size={20}/></Button>
      </form>
      {!keywords?.length ? 
        <div className="flex flex-col justify-center items-center gap-2 text-sm text-center p-2"><Loader size={17} className="mr-2 animate-spin"/></div>
      :
        <div className="max-w-2xl justify-center space-x-2 space-y-2">
          {keywords?.map((keyword: any, index) => (
            <button key={keyword.keywords} onClick={(e) => handleSearch(keyword.name)}><Badge variant="outline" className="font-RobotoCondensed text-sm uppercase tracking-tight hover:border-primary">{keyword.name} &#x1F865;</Badge></button>
          ))}
        </div>
      }
    </div>
  )
}