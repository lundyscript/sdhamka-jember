import { HiCheckCircle, HiMinusCircle } from 'react-icons/hi'

export const Success = ({message}: {message?: string}) => {
  if (!message) return null
  return (
    <div className="flex p-3 gap-x-2 text-sm rounded-md bg-green-500/15 text-green-600 border border-green-600/40">
      <span><HiCheckCircle className="h-5 w-5"/></span>
      <span>
        <p><span className="font-semibold">Success!&nbsp; </span>{message}</p>
      </span>
    </div>
  )
}

export const Error = ({message}: {message?: string}) => {
  if (!message) return null
  return (
    <div className="flex p-3 gap-x-2 text-sm rounded-md bg-red-500/15 text-red-600 border border-red-600/30">
      <span><HiMinusCircle className="h-5 w-5"/></span>
      <span>
        <p><span className="font-semibold">Error!&nbsp; </span>{message}</p>
      </span>
    </div>
  )
}

