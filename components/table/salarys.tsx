import { getHonorarium, getIncome, getSalarys, getSpends } from "@/data/profits"
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
  const honorarium = await getHonorarium(query)
  return (
    <>
      {!salary ? 
        <p className="text-sm text-center">Tidak ada data.</p>
      :
        <>
          <div className="flex flex-col lg:flex-row gap-4 pb-4 justify-between">
            <CardProfit title={"Total Pendapatan"} data={new Intl.NumberFormat().format(Number(income))}/>
            <CardProfit title={"Total Pengeluaran"} data={new Intl.NumberFormat().format(Number(expenditure))}/>
            <CardProfit title={"Keuntungan"} data={new Intl.NumberFormat().format(Number(profit))}/>
          </div>
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 justify-between">
            <Card>
              <CardHeader>
                <CardTitle>Total Honorarium Karyawan : Rp. {new Intl.NumberFormat().format(Number(honorarium[Object.keys(honorarium)[Object.keys(honorarium).length - 1]]))}</CardTitle>
                <CardDescription>Honorarium didapat dari jumlah pengiriman dan pengemasan air minum Moyamu Jember dengan perhitungan sebagai berikut:</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {honorarium?.map((hr: any, index: any) => (
                  <div key={hr.id} className="flex flex-row gap-4 items-center justify-between">
                    <div className="flex flex-row gap-4 items-center ">
                      <Avatar>
                        <AvatarImage src={hr.image} />
                        <AvatarFallback><UserRound size={20}/></AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{hr.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {hr.position} 
                          {hr.position == 'Kurir 1' ? 
                            " ( " + hr.jumlah1 + " Galon x Rp. 1.200 ) + ( " + hr.jumlah2 + " Kardus x Rp. 150 )" 
                          : 
                            hr.position == 'Kurir 2' ? 
                              " ( " + hr.jumlah1 + " Galon x Rp. 1.000 ) + ( " + hr.jumlah2 + " Kardus x Rp. 150 )" 
                            : 
                             " ( " + hr.jumlah + " Kardus x Rp. 400 )"}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">Rp. {new Intl.NumberFormat().format(Number(hr.nominal))}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Gaji Karyawan : Rp. {new Intl.NumberFormat().format(Number(salary))}</CardTitle>
                <CardDescription>Gaji karyawan didapatkan dari 70% laba kotor penjualan air minum Moyamu Jember dengan perhitungan sebagai berikut:</CardDescription>
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