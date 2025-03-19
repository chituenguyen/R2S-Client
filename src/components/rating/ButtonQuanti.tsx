import { useState } from "react";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="flex items-center rounded-md border w-32">
      <button 
        className="w-8 h-11 border-r bg-red-300 rounded-l-md text-white flex justify-center items-center"
        onClick={decrease}
      >
        -
      </button>
      <span className="w-16 text-center">{quantity}</span>
      <button 
        className="w-8 h-11 bg-red-300 text-white rounded-r-md flex justify-center items-center"
        onClick={increase}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
