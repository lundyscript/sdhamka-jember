import { DatePickerWithRange } from '@/components/input/datepicker'
import { SalarysTable } from '@/components/table/salarys'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/utils/heading'

const SalaryPage = async ({
  searchParams
}:{
  searchParams?:{
    query?: string
  }
}) => {
  const query = searchParams?.query || ""
  return (
    <>
      <div className="lg:flex lg:flex-row gap-4 pb-4 justify-between">
        <Heading title="Gaji Karyawan." description="Perhitungan gaji karyawan Moyamu Jember."/>
        <Separator orientation="horizontal" className="lg:hidden my-4"/>
        <div className="flex flex-row gap-2">
          <DatePickerWithRange/>
        </div>
      </div>
      <SalarysTable query={query}/>
    </>
  )
}

export default SalaryPage