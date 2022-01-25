import React from "react";

const Direction = ({
  index,
  direction,
  handleClick,
  handleChange,
  handleMove,
}) => {
  return (
    <div className="row mb-3 g-3 g-md-3 justify-content-center">
      <div className="col-1 d-flex flex-column justify-content-center align-items-center">
        <i
          className={`bi bi-caret-up-fill fs-4 text-primary my-auto`}
          onClick={handleMove(true, index)}
        ></i>
        <i
          className="bi bi-caret-down-fill fs-4 text-primary my-auto"
          onClick={handleMove(false, index)}
        ></i>
      </div>
      <div className="col-9 col-md-10">
        <textarea
          type="text"
          rows={3}
          className="form-control my-auto"
          onChange={handleChange(index)}
          value={direction}
          placeholder={`direction #${index + 1}`}
          autoFocus={index === 0 ? false : direction ? false : true}
        />
      </div>
      <div className="col-1 d-flex justify-content-center align-items-center">
        <i
          className="bi-x-square text-secondary  fs-2"
          onClick={handleClick(index)}
        ></i>
      </div>
    </div>
  );
};

export default Direction;
