import { UpdateIngredientForm } from "@/components/form/ingredient"
import { getIngredientById } from "@/data/ingredients"
import { notFound } from "next/navigation"
const UpdateIngredient = async ({params}: {params:{id: string}}) => {
  const id = params.id
  const ingredient = await getIngredientById(id)
  if (!ingredient) {
    notFound()
  }
  return (
    <UpdateIngredientForm initialData={ingredient}/>
  )
}

export default UpdateIngredient