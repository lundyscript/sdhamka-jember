"use client"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spends } from "@prisma/client"
import { SpendSchema } from "@/schemas"
import { newSpendAction, updateSpendAction } from "@/actions/spends"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { CancelButton, LoadingButton, SaveButton } from "@/components/button"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/utils/heading"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

interface UpdateSpendsFormProps {
  initialData: Spends
}

export const NewSpendForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof SpendSchema>>({
    resolver:zodResolver(SpendSchema),
    defaultValues:{ category:"", name:"", price:"", quantity:"", issuedAt: new Date()},
  })
  const onSubmit = (values: z.infer<typeof SpendSchema>) => {
    startTransition(() => {
      newSpendAction(values).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/spends")
    })
  }
  return (
    <>
      <Heading title="Pengeluaran Baru." description="Isikan data pengeluaran operasional atau produksi baru."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="w-96 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-2 grid grid-cols-2 gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Jenis Pengeluaran</FormLabel>
                <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis pengeluaran"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Operasional">Operasional</SelectItem>
                      <SelectItem value="Produksi">Produksi</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Nama Pengeluaran</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="price" render={({ field }) => (
              <FormItem>
                <FormLabel>Harga (Rp)</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="quantity" render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="issuedAt" render={({ field }) => (
              <FormItem className="col-span-2 flex flex-col space-y-3 mt-0.5 pt-1">
                <FormLabel>Tanggal Pengeluaran</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? <span>{format(field.value, "dd/MM/yyyy")}</span> : <span>Pilih tanggal</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01") } initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}/>
            {isPending ?
              <div className="flex gap-4 col-span-2">
                <LoadingButton/>
              </div>
            :
              <div className="flex gap-4 col-span-2">
                <CancelButton href="/spends"/>
                <SaveButton/>
              </div>
            }
          </form>
        </Form>
      </div>
    </>
  )
}

export const UpdateSpendForm: React.FC<UpdateSpendsFormProps> = ({initialData}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof SpendSchema>>({
    resolver:zodResolver(SpendSchema),
    defaultValues: initialData,
  })
  const onSubmit = (values: z.infer<typeof SpendSchema>) => {
    startTransition(() => {
      updateSpendAction(initialData.id, values).then((message) => {
        if (message.error) {
          toast.error("Error!",{description: message.error})
        }
        if (message.success) {
          toast.success("Success!",{description: message.success})
        }
      })
      router.push("/spends")
    })
  }
  return (
    <>
      <Heading title="Ubah Data Pengeluaran." description="Isikan data pengeluaran dengan benar."/>
      <Separator orientation="horizontal" className="my-4"/>
      <div className="w-96 mx-auto justify-center">
        <Form {...form}>
          <form className="space-y-2 grid grid-cols-2 gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Jenis Pengeluaran</FormLabel>
                <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis pengeluaran"/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Operasional">Operasional</SelectItem>
                      <SelectItem value="Produksi">Produksi</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Nama Pengeluaran</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="price" render={({ field }) => (
              <FormItem>
                <FormLabel>Harga (Rp)</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="quantity" render={({ field }) => (
              <FormItem>
                <FormLabel>Jumlah</FormLabel>
                <FormControl><Input {...field} disabled={isPending}/></FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name="issuedAt" render={({ field }) => (
              <FormItem className="col-span-2 flex flex-col space-y-3 mt-0.5 pt-1">
                <FormLabel>Tanggal Pengeluaran</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? <span>{format(field.value, "dd/MM/yyyy")}</span> : <span>Pilih tanggal</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01") } initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}/>
            {isPending ?
              <div className="flex gap-4 col-span-2">
                <LoadingButton/>
              </div>
            :
              <div className="flex gap-4 col-span-2">
                <CancelButton href="/spends"/>
                <SaveButton/>
              </div>
            }
          </form>
        </Form>
      </div>
    </>
  )
}