import React, { useState, useEffect } from 'react';

const UseEffectExample: React.FC = () => {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState('blue');

  useEffect(() => {
    console.log('Count changed to:', count);
  }, [count]);

  useEffect(() => {
    console.log('Color changed to:', color);
  }, [color]);

  const toggleColor = () => {
    setColor(color === 'blue' ? 'red' : 'blue');
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="space-y-6">
        <div className="text-center p-4 border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Counter Example</h2>
          <p className="text-2xl mb-4">Count: {count}</p>
          <button
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Click me
          </button>
          <p className="mt-2 text-sm text-gray-600">
            Check the browser title, it updates with count!
          </p>
        </div>

        <div className="text-center p-4 border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Color Example</h2>
          <div 
            className={`w-32 h-32 mx-auto rounded-lg mb-4`}
            style={{ backgroundColor: color }}
          />
          <button
            onClick={toggleColor}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Toggle Color
          </button>
          <p className="mt-2 text-sm text-gray-600">
            Check console to see color change logs!
          </p>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold mb-2">What's happening here?</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              First useEffect updates the page title whenever the count changes
            </li>
            <li>
              Second useEffect logs to console whenever the color changes
            </li>
            <li>
              Each effect only runs when its dependency changes
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UseEffectExample;