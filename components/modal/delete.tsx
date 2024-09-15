"use client"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "@/components/button"
import { Trash2 } from "lucide-react"
import { deletePostAction } from "@/actions/posts"
import { toast } from "sonner"
import { deleteTeacherAction } from "@/actions/teachers"
import { deleteSubjectAction } from "@/actions/elearning"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { deletePPDBAction } from "@/actions/ppdb"
export const DeleteModal = ({data, id, name}: {data: string, id: string, name: string}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const deleteDataWithId = () => {
    if (data === "posts") {
      startTransition(() => {
        deletePostAction(id).then((message) => {
          if (message.error) {
            toast.error("Error!",{description: message.error})
          }
          if (message.success) {
            toast.success("Success!",{description: message.success})
          }
        })
        document.getElementById("closeDialog")?.click()
        document.getElementById("actionButton")?.click()
        router.push("/posts")
      })
    }
    if (data === "teachers") {
      startTransition(() => {
        deleteTeacherAction(id).then((message) => {
          if (message.error) {
            toast.error("Error!",{description: message.error})
          }
          if (message.success) {
            toast.success("Success!",{description: message.success})
          }
        })
        document.getElementById("closeDialog")?.click()
        document.getElementById("actionButton")?.click()
        router.push("/teachers")
      })
    }
    if (data === "subjects") {
      startTransition(() => {
        deleteSubjectAction(id).then((message) => {
          if (message.error) {
            toast.error("Error!",{description: message.error})
          }
          if (message.success) {
            toast.success("Success!",{description: message.success})
          }
        })
        document.getElementById("closeDialog")?.click()
        document.getElementById("actionButton")?.click()
        router.push("/subjects")
      })
    }
    if (data === "registration") {
      startTransition(() => {
        deletePPDBAction(id).then((message) => {
          if (message.error) {
            toast.error("Error!",{description: message.error})
          }
          if (message.success) {
            toast.success("Success!",{description: message.success})
          }
        })
        document.getElementById("closeDialog")?.click()
        document.getElementById("actionButton")?.click()
        router.push("/registration")
      })
    }
  }
  return (
    <Dialog>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button variant={"ghost"} size={"icon"} className="hover:bg-destructive/20 hover:text-red-700"><Trash2 size={17}/></Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent>
            <p>Hapus</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="w-96 lg:w-fit">
        <DialogHeader className="pb-2">
          <div className="w-full flex justify-center items-center">
            <ExclamationTriangleIcon className="h-10 w-10 pb-2 text-destructive"/>
          </div>
          <DialogTitle className="capitalize">{name}</DialogTitle>
          <DialogDescription>Apakah anda yakin ingin menghapus data ini?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {isPending ? 
            <LoadingButton/>
          :
            <div className="flex flex-row gap-4 w-full">
              <DialogClose asChild>
                <Button variant={"secondary"} id="closeDialog" className="w-full">Tidak</Button>
              </DialogClose>
              <Button variant={"default"} onClick={deleteDataWithId} className="w-full">Ya</Button>
            </div>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
