import { UpdatePackagingForm } from "@/components/form/package"
import { getPackagesById } from "@/data/packages"
import { notFound } from "next/navigation"
const UpdatePackaging = async ({params}: {params:{id: string}}) => {
  const id = params.id
  const packages = await getPackagesById(id)
  if (!packages) {
    notFound()
  }
  return (
    <UpdatePackagingForm initialData={packages}/>
  )
}

export default UpdatePackaging