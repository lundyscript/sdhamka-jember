"use client"
import { Input } from "@/components/ui/input"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
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