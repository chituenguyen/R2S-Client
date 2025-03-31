import { useState } from "react";

interface QuantiSelectProps {
  quantity: number
  onQuantityChange: (newQuantity: number) => void
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onQuantityChange }) => {
  return (
    <div className="flex items-center rounded-md border w-32">
      <button 
        className="w-8 h-11 border-r bg-red-300 rounded-l-md text-white flex justify-center items-center"
        onClick={() => onQuantityChange(Math.max(1, quantity-1))}
      >
        -
      </button>
      <span className="w-16 text-center">{quantity}</span>
      <button 
        className="w-8 h-11 bg-red-300 text-white rounded-r-md flex justify-center items-center"
        onClick={() => onQuantityChange(quantity + 1)}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
