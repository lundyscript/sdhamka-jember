import { getIncome, getSalarys, getSpends } from "@/data/profits"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CardProfit } from "@/components/utils/card"
import { UserRound } from "lucide-react"

export const SalarysTable = async ({query}: {query: string}) => {
  const income = await getIncome(query)
  const expenditure = await getSpends(query)
  const salarys = await getSalarys(query)
  let profit = income - expenditure
  let salary = 70/100 * profit
  return (
    <>
      {!salary ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      :
        <>
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 justify-between">
            <CardProfit title={"Total Pendapatan"} data={new Intl.NumberFormat().format(Number(income))}/>
            <CardProfit title={"Total Pengeluaran"} data={new Intl.NumberFormat().format(Number(expenditure))}/>
            <CardProfit title={"Keuntungan"} data={new Intl.NumberFormat().format(Number(profit))}/>
            <Card>
              <CardHeader>
                <CardTitle>Total Gaji Karyawan : Rp. {new Intl.NumberFormat().format(Number(salary))}</CardTitle>
                <CardDescription>Gaji karyawan didapatkan dari 70% laba kotor penjualan air minum Moyamu Jember yang dibagi menjadi 3 bagian, yaitu:</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {salarys?.map((gaji: any, index: any) => (
                  <div key={gaji.id} className="flex flex-row gap-4 items-center justify-between">
                    <div className="flex flex-row gap-4 items-center ">
                      <Avatar>
                        <AvatarImage src={gaji.image} />
                        <AvatarFallback><UserRound size={20}/></AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{gaji.name}</p>
                        <p className="text-sm text-muted-foreground">{gaji.position} ({gaji.position == 'Pimpinan' ? '45%' : gaji.position == 'Karyawan' ? "35%" : "22%"})</p>
                      </div>
                    </div>
                    <p className="font-semibold">Rp. {new Intl.NumberFormat().format(Number(gaji.nominal))}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      }
    </>
  )
}