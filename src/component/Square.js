
import './Square.css'

const square = ({value,onClick}) => {
  return(
  <button className="square" onClick={onClick}>
    {value}
  </button>
  )
}

export default square