import React from 'react'

const Direction = ({index, direction, handleClick, handleChange}) => {
  return (
    <div className='row mb-3 g-2 g-md-3'>
      <div className='col-11'>
        <textarea type="text" className="form-control" onChange={handleChange(index)} value={direction} />
      </div>
      <div className="col-1">
        <i className="bi-x-square h2 mr-1" onClick={handleClick(index)}></i>
      </div>
    </div>
    
  )
}

export default Direction