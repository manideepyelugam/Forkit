import React from 'react'
import { useState } from 'react';


interface MultiSelectorProps {
    options : string[];
    onChange : (selected: string[]) => void;
}

const MultiSelector = ({options,onChange} :MultiSelectorProps) => {

  const [selected,setSelected] = useState<string[]>([]);

  const toggleSelect = (value : string) => {
        const newSelect = selected.includes(value) ? selected.filter(item => item !== value) : [...selected,value]

        setSelected(newSelect);
        onChange(newSelect);
  }

  const clearAll = () =>{
      setSelected([]);
      onChange([]);
  }


  return (
    <div>
       <div className="flex flex-col gap-3">
      <div className="flex gap-2 flex-wrap">
        {options.map(option => (
          <button
            key={option}
            onClick={() => toggleSelect(option)}
            className={`px-4 py-2 rounded-lg cursor-pointer border transition
              ${selected.includes(option)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {option}
          </button>
        ))}
        <button
          onClick={clearAll}
          className="ml-2 text-sm px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Clear All
        </button>
      </div>
    </div>
    </div>
  )
}

export default MultiSelector