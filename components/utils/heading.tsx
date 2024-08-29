interface ContainerProps {
  title: string,
  description: string
}

export const Heading = ({title, description}: ContainerProps) => {
  return (
    <div className="max-w-fit">
      <h1 className="text-2xl font-extrabold tracking-tighter">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export const DetailData = ({title, value}: {title:string, value:string}) => {
  return (
    <div className="max-w-fit">
      <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{title}</p>
      <p className="font-semibold capitalize">{value}</p>
    </div>
  )
}