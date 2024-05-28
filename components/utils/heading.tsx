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