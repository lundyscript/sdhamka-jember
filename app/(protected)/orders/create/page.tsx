import { NewOrderForm } from "@/components/form/order"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/utils/heading"
import { getAllBuyers } from "@/data/buyers"
import { getAllProducts } from "@/data/products"

const createOrder = async () => {
  const buyers = await getAllBuyers()
  const products = await getAllProducts()
  return (
    <>
      <div className="flex flex-col pb-4 justify-between">
        <Heading title="Penjualan Baru." description="Isikan data penjualan baru."/>
        <Separator orientation="horizontal" className="my-4"/>
      </div>
      <NewOrderForm buyers={buyers} products={products}/>
    </>
  )
}

export default createOrder