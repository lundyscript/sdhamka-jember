import { UpdateSpendForm } from "@/components/form/spend"
import { getSpendsById } from "@/data/spends"
import { notFound } from "next/navigation"
const UpdateProduct = async ({params}: {params:{id: string}}) => {
  const id = params.id
  const spend = await getSpendsById(id)
  if (!spend) {
    notFound()
  }
  return (
    <UpdateSpendForm initialData={spend}/>
  )
}

export default UpdateProduct