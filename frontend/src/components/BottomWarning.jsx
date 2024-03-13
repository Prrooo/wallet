import { Link } from 'react-router-dom'

const BottomWarning = ({label,buttonText,to}) => {
  return (
    <div className='text-center pb-2 text-sm flex justify-center font-normal'>
        <div>
            {label}
        </div>
        <Link className='underline cursor-pointer pl-1'  to={to}>
            {buttonText}
        </Link>
    </div>
  )
}

export default BottomWarning