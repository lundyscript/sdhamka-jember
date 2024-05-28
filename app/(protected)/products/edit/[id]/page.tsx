import { UpdateProductForm } from "@/components/form/product"
import { getProductsById } from "@/data/products"
import { notFound } from "next/navigation"
const UpdateProduct = async ({params}: {params:{id: string}}) => {
  const id = params.id
  const product = await getProductsById(id)
  if (!product) {
    notFound()
  }
  return (
    <UpdateProductForm initialData={product}/>
  )
}

export default UpdateProduct