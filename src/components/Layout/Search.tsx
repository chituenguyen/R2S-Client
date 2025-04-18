import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";


function Search(){
  
    return(
      <div className="flex items-center w-full sm:w-auto mb-2"> {/* Wrapper div for input and button */}
          <label className="input input-bordered flex items-center gap-2 bg-white focus:outline-none border rounded-lg px-3 py-2 shadow-md w-full sm:w-auto">
            <input
              type="text"
              className="w-full sm:w-[200px] bg-white border-none focus:outline-none focus:ring-0 text-gray-700 placeholder:text-sm"
              placeholder="Where are you looking for ?"
            />
            <button
              className="focus:outline-none text-black"
            >
              <FaMagnifyingGlass className="h-6 w-6 transition hover:scale-110" />
            </button>
          </label>
        </div>
    )
}

export default Search;