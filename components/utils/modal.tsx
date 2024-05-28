"use client"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { deleteBuyerAction } from "@/actions/buyers"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { LoadingButton } from "@/components/button"
import { Trash2 } from "lucide-react"
import { deleteProductAction } from "@/actions/products"
import { deleteOrdertAction } from "@/actions/orders"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { deleteSpendAction } from "@/actions/spends"
import { deletePurchaseAction } from "@/actions/purchases"
import { deleteIngredientAction } from "@/actions/ingredients"
import { deletePackagingAction } from "@/actions/packages"
import { deleteEmployeeAction } from "@/actions/employees"

export const DeleteModal = ({data, id, name}: {data: string, id: string, name: string}) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const deleteDataWithId = () => {
    if (data === "buyers") {
      startTransition(() => {
        deleteBuyerAction(id).then((message) => {
          if (message.error) {
            toast.error("Error!",{description: message.error})
          }
          if (message.success) {
            toast.success("Success!",{description: message.success})
          }
        })
        document.getElementById("closeDialog")?.click()
        document.getElementById("actionButton")?.click()
        router.push("/buyers")
      })
    } else if (data === "products") {
      startTransition(() => {
        deleteProductAction(id).then((message) => {
          if (message.error) {
            toast.error("Error!",{description: message.error})
          }
          if (message.success) {
            toast.success("Success!",{description: message.success})
          }
        })
        document.getElementById("closeDialog")?.click()
        document.getElementById("actionButton")?.click()
        router.refresh()
      })
    } else if (data === "orders") {
      startTransition(() => {
        deleteOrdertAction(id).then((message) => {
          if (message.error) {
            toast.error("Error!",{description: message.error})
          }
          if (message.success) {
            toast.success("Success!",{description: message.success})
          }
        })
        document.getElementById("closeDialog")?.click()
        document.getElementById("actionButton")?.click()
        router.refresh()
      })
    } else if (data === "spends") {
      startTransition(() => {
        deleteSpendAction(id).then((message) => {
          if (message.error) {
            toast.error("Error!",{description: message.error})
          }
          if (message.success) {
            toast.success("Success!",{description: message.success})
          }
        })
        document.getElementById("closeDialog")?.click()
        document.getElementById("actionButton")?.click()
        router.refresh()
      })
    } else if (data === "purchases") {
      startTransition(() => {
        deletePurchaseAction(id).then((message) => {
          if (message.error) {
            toast.error("Error!",{description: message.error})
          }
          if (message.success) {
            toast.success("Success!",{description: message.success})
          }
        })
        document.getElementById("closeDialog")?.click()
        document.getElementById("actionButton")?.click()
        router.refresh()
      })
    } else if (data === "ingredients") {
      startTransition(() => {
        deleteIngredientAction(id).then((message) => {
          if (message.error) {
            toast.error("Error!",{description: message.error})
          }
          if (message.success) {
            toast.success("Success!",{description: message.success})
          }
        })
        document.getElementById("closeDialog")?.click()
        document.getElementById("actionButton")?.click()
        router.refresh()
      })
    } else if (data === "packaging") {
      startTransition(() => {
        deletePackagingAction(id).then((message) => {
          if (message.error) {
            toast.error("Error!",{description: message.error})
          }
          if (message.success) {
            toast.success("Success!",{description: message.success})
          }
        })
        document.getElementById("closeDialog")?.click()
        document.getElementById("actionButton")?.click()
        router.refresh()
      })
    } else if (data === "employees") {
      startTransition(() => {
        deleteEmployeeAction(id).then((message) => {
          if (message.error) {
            toast.error("Error!",{description: message.error})
          }
          if (message.success) {
            toast.success("Success!",{description: message.success})
          }
        })
        document.getElementById("closeDialog")?.click()
        document.getElementById("actionButton")?.click()
        router.refresh()
      })
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="hover:bg-destructive/20 hover:text-red-700">
          <Trash2 size={17}/>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-96 lg:w-fit">
        <DialogHeader className="pb-2">
          <div className="w-full flex justify-center items-center">
            <ExclamationTriangleIcon className="h-10 w-10 pb-2 text-destructive"/>
          </div>
          <DialogTitle>{name}</DialogTitle>
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