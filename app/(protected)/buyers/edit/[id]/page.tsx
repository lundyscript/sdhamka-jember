import { UpdateBuyerForm } from "@/components/form/buyer"
import { getBuyerById } from "@/data/buyers"
import { notFound } from "next/navigation"
const UpdateBuyer = async ({params}: {params:{id: string}}) => {
  const id = params.id
  const buyer = await getBuyerById(id)
  if (!buyer) {
    notFound()
  }
  return (
    <UpdateBuyerForm initialData={buyer}/>
  )
}

export default UpdateBuyer