import { Card, CardHeader } from "@/components/ui/card"
import { Coins, DollarSign, HandCoins, ShoppingBasket, Wallet } from "lucide-react"

interface ContainerProps {
  title: string,
  data: string
}

export const CardProfit = ({title, data}: ContainerProps) => {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <p className="flex flex-row justify-between items-center text-sm text-muted-foreground">
            {title}
            {title === "Total Pendapatan" ? <Wallet size={17}/>: ""}
            {title === "Total Pengeluaran" ? <ShoppingBasket size={17}/>: ""}
            {title === "Keuntungan" ? <DollarSign size={17}/>: ""}
          </p>
          <h1 className="text-2xl font-extrabold tracking-tighter">Rp. {data}</h1>
        </CardHeader>
      </Card>
    </>
  )
}