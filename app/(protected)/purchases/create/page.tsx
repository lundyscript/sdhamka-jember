import { NewPurchaseForm } from "@/components/form/purchase"
import { getAllIngredients } from "@/data/ingredients"

const createPurchase = async () => {
  const ingredients = await getAllIngredients()
  return (
    <NewPurchaseForm ingredients={ingredients}/>
  )
}

export default createPurchase