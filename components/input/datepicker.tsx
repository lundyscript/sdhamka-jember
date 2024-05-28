"use client"

import * as React from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { format } from "date-fns"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Calendar as CalendarIcon, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"


const DATE_REQUIRED_ERROR = "Date is required.";

const FormSchema = z.object({
  dob: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
}, {required_error: DATE_REQUIRED_ERROR}).refine((date) => {
    return !!date.from;
}, DATE_REQUIRED_ERROR),
})

export function DatePickerWithRange({className}: React.HTMLAttributes<HTMLDivElement>) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dob: {
          from: undefined,
          to: undefined,
      },
  },
  })
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {replace} = useRouter()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const params = new URLSearchParams(searchParams)
    const obj = JSON.stringify(data.dob)
    params.set("query", obj ? obj : "")
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row gap-2 w-full">
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                  <Button
                    id="date"
                    variant={"outline"}
                    size={"sm"}
                    className={cn(
                      "w-full lg:w-64 justify-start text-left font-normal hover:bg-inherit",
                      !field.value.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value.from ? (
                      field.value.to ? (
                        <>
                          {format(field.value.from, "dd/MM/yyyy")} -{" "}
                          {format(field.value.to, "dd/MM/yyyy")}
                        </>
                      ) : (
                        format(field.value.from, "dd/MM/yyyy")
                      )
                    ) : (
                      <span>Pilih tanggal</span>
                    )}
                  </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={field.value.from}
                    selected={{from: field.value.from!, to: field.value.to}}
                    onSelect={field.onChange}
                    numberOfMonths={1}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" variant={"default"} size={"sm"} className="font-medium border"><Search size={17} /></Button>
            </TooltipTrigger>
            <TooltipContent>Cari data.</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
    </Form>
  )
}
