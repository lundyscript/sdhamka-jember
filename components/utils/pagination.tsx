"use client"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { generatePagination } from "@/lib/utils"
import { ChevronRight, ChevronLeft } from "lucide-react"
import clsx from "clsx"

const Pagination = ({totalPages, totalData}:{totalPages: number, totalData: number}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1
  const createPageURL = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }
  const allPages = generatePagination(currentPage, totalPages)
  const PaginationNumber = ({page,href,position,isActive}:{page: number|string, href:string, position?: "first"|"last"|"middle"|"single", isActive:boolean}) => {
    const className = clsx("flex h-8 w-8 text-black dark:text-white rounded-sm items-center justify-center text-xs",
    {
      "z-10 border-2": isActive,
      "hover:bg-secondary": !isActive && position !== "middle",
      "text-default pointer-events-none": position === "middle"
    })
    return isActive && position === "middle" ? (
      <div className={className}>{page}</div>
    ):(
      <Link href={href} className={className}>{page}</Link>
    )
  }

  const PaginationArrow = ({
    href,direction,isDisabled
  }:{
    href: string,direction: "left" | "right", isDisabled?: boolean
  }) => {
    const className = clsx("flex h-8 w-8 rounded-sm items-center justify-center text-xs text-black dark:text-white",
    {
      "pointer-events-none text-black/25 dark:text-white/25":isDisabled,
      "hover:bg-secondary": !isDisabled,
      "mr-2": direction === "left",
      "ml-2": direction === "right"
    }
    )

    const icon = direction === "left" ? (
      <ChevronLeft size={15}/>
    ):(
      <ChevronRight size={15}/>
    )

    return isDisabled ? (
      <div className={className}>{icon}</div>
    ):(
      <Link href={href} className={className}>{icon}</Link>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <p className="text-xs pr-6">Total : {totalData} items</p>
      <div className="inline-flex items-center ">
        <PaginationArrow direction="left" href={createPageURL(currentPage-1)} isDisabled={currentPage<=1}/>
        <div className="flex -space-s-px gap-1">
          {allPages.map((page,index) => {
            let position: "first"|"last"|"single"|"middle"|undefined
            if(index === 0) position = "first"
            if(index === allPages.length -1) position = "last"
            if(allPages.length === 1) position = "single"
            if(page === "...") position = "middle"
            return (
              <PaginationNumber key={index} href={createPageURL(page)} page={page} position={position} isActive={currentPage === page}/>
            )
          })}
        </div>
        <PaginationArrow direction="right" href={createPageURL(currentPage+1)} isDisabled={currentPage>=totalPages}/>
      </div>
    </div>
  )
}

export default Pagination