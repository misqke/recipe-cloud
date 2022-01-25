const Ingredient = ({ index, ingredient, handleClick, handleChange }) => {
  return (
    <div className="row mb-3 g-2 g-md-3 justify-content-between">
      <div className="col-7">
        <input
          type="text"
          className="form-control"
          placeholder={`ingredient #${index + 1}`}
          value={ingredient.text}
          onChange={handleChange(index, "text")}
          autoFocus={index === 0 ? false : ingredient.text ? false : true}
        />
      </div>
      <div className="col-4">
        <input
          type="text"
          className="form-control"
          placeholder="amount"
          value={ingredient.amount}
          onChange={handleChange(index, "amount")}
        />
      </div>
      <div className="col-1 d-flex mt-2 justify-content-center align-items-center">
        <i
          className="bi-x-square text-secondary fs-2"
          onClick={handleClick(index)}
        ></i>
      </div>
    </div>
  );
};

export default Ingredient;
