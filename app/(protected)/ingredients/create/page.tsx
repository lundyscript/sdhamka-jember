import { NewIngredientForm } from "@/components/form/ingredient"
import { getAllProducts } from "@/data/products"

const NewIngredientPage = async () => {
  const products = await getAllProducts()
  return (
    <NewIngredientForm products={products}/>
  )
}

export default NewIngredientPage