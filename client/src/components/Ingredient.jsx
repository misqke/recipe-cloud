
const Ingredient = ({index, ingredient, handleClick, handleChange}) => {
  return (
    <div className='row mb-3 g-2 g-md-3 justify-content-between'>
      <div className="col-7">  
        <input type="text" className="form-control" placeholder='ingredient' value={ingredient.text} onChange={handleChange(index,"text")}/>
      </div>
      <div className="col-4">
        <input type="text" className="form-control" placeholder="amount" value={ingredient.amount} onChange={handleChange(index,"amount")} />
      </div>
      <div className="col-1 d-flex justify-content-center align-items-center">
      <i className="bi-x-square text-secondary  fs-2" onClick={handleClick(index)}></i>
      </div>
    </div>
  )
}

export default Ingredient