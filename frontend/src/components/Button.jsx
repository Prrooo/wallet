
const Button = ({label,onClick}) => {
  return (
    <button type='button' onClick={onClick} className='w-full bg-gray-800 text-white rounded-lg text-sm px-5 py-2.5 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium me-2 my-3' >{label}</button>
  )
}

export default Button