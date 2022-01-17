import React from 'react'
import { useSelector } from 'react-redux'

const Comment = ({comment, index, handleDeleteComment}) => {

  const username = useSelector( (state) => state.user.username);

  return (
    <div className='container d-flex flex-column my-2'>
      <div className="container-fluid d-flex justify-content-between">
        <div className="container-fluid d-flex flex-column justify-content-between">
          <h4 className='text-primary'>{comment.commenter}</h4>
          <div className="container">
            <p>{comment.comment}</p>
          </div>
        </div>
        {username === comment.commenter && (
          <button className='btn' onClick={() => handleDeleteComment(index)}>
            <i className='bi bi-trash btn btn-outline-danger'></i>
          </button>
        )}
      </div>
      <hr />
    </div>
  )
}

export default Comment
