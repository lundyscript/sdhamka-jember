import { UpdatePurchaseForm } from "@/components/form/purchase"
import { getPurchasesById } from "@/data/purchases"
import { notFound } from "next/navigation"
const UpdatePurchase = async ({params}: {params:{id: string}}) => {
  const id = params.id
  const purchase = await getPurchasesById(id)
  if (!purchase) {
    notFound()
  }
  return (
    <UpdatePurchaseForm initialData={purchase}/>
  )
}

export default UpdatePurchase