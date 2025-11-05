'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import MultiSelector from "../../../components/MultiSelector"; 
import Labels from "../../../options/Labels"
import Languages from "../../../options/Languages"





const page = () => {
  const URL = process.env.NEXT_PUBLIC_API_URL

  console.log(URL)
  const languages = Languages;
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const labels = Labels
  const [selectedLabels,setSelectedLabels] = useState<string[]>([]);

  const [isRepository,setIsRepository] = useState<boolean>(true);

  const [data,setData] = useState<string[]>([]);

  let q = "";

  if(!isRepository){
       q = "is:issue+is:open+"
  }else{
    q = ""
  }

  
  
  if (selectedLanguages.length > 0) {
    q +=  selectedLanguages.map(lang => `language:${lang}`).join("+");
  }


  
  if (selectedLabels.length > 0 && !isRepository) {
    q += "+" + selectedLabels.map(label => `label:"${label}"`).join(" ");
  }


  
  

   useEffect (() =>{

    const fetchData = async () => {
const res = await fetch(`${URL}/api/git/${!isRepository ? "issues" : "repos"}?q=${q}`);

      //  const res =  await fetch(`${URL}/api/git/${isRepository ? "issues" : "repos"}?q=${q}`)
       const data = await res.json();
       setData(data.items)
      //  console.log(data.items)

    }


    fetchData()

    
  },[selectedLabels,selectedLanguages])

 


  return (
    <div className='h-[88vh] overflow-y-scroll bg-slate-500'>
           <div>
                
           <MultiSelector
        options={languages}
        onChange={setSelectedLanguages} // receive selected result
      />
           </div>



{isRepository == false ? (  <div className='mt-10'>
              <MultiSelector options={labels} onChange={setSelectedLabels}/>
           </div>) : (<div></div>)}
         


           <div>
                 <button onClick={() => setIsRepository(!isRepository)}>{!isRepository ? "Repos" : "Issues"}</button>
           </div>


           <div>
        <h2 className="mt-4 text-lg font-semibold">Selected Languages:</h2>
        {selectedLanguages.length > 0 ? (
          selectedLanguages.map(lang => (
            <span
              key={lang}
              className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full mr-2 mt-2"
            >
              {lang}
            </span>
          ))
        ) : (
          <p className="text-gray-500">No languages selected.</p>
        )}
      </div>



      <div className='mt-4'>
      <h2 className="mt-4 text-lg font-semibold">Selected Labels:</h2>
      {selectedLabels.length > 0 ? (
        selectedLabels.map(label => (
          <span
          key={label}
          className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full mr-2 mt-2"
        >
          {label}
        </span>
        ))
      ): (<p className="text-gray-500">No languages selected.</p>
      )}

      </div>




      <div>
            {data.map((item,idx) => (
                 <div key={idx}>
                     <p>{item.html_url}</p>
                 </div>
            ))}
      </div>
    </div>
  )
}

export default page