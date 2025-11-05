'use client'
import React from 'react'
import { useState,useEffect } from 'react';
import Languages from "../../../options/Languages"
import { RippleButton } from "@/components/ui/ripple-button"
import { useTheme } from 'next-themes';
import { Switch } from "@/components/ui/switch"


type Repo = {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  description?: string;
};


const page = () => {
    const URL = process.env.NEXT_PUBLIC_API_URL

    const languages = Languages;

    const theme = useTheme().theme

    

    const [data,setData] = useState<Repo[]>([]);
    const [language,setLanguage] = useState<string>("JavaScript");
    const [beginnerFriendly,setBeginnerFriendly] = useState<boolean>(false)

    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const convertedFinalDate = oneWeekAgo.toISOString().split('T')[0];

    let q = "";

    if(language){
      if(beginnerFriendly){
        q = `stars:500..10000+pushed:>${convertedFinalDate}+is:public+language:${language}&sort=stars&order=desc&per_page=50`

      }else{
        q = `stars:>1000+pushed:>${convertedFinalDate}+is:public+language:${language}&sort=stars&order=desc&per_page=50`

      }
    }

    useEffect(() => {

         const fetchData = async () => {
             const res = await fetch(`${URL}/api/git/repos?q=${q}`)
             const data = await res.json();
            //  console.log(data)
             setData(data.items)

         }

         fetchData()
    },[language,beginnerFriendly])


    

    
  return (

    <div className='h-[93vh] flex  '>

{/* 
    <div>

        {languages.map((lang) => (
              <div key={lang}>
                     <button onClick={() => setLanguage(lang)}>{lang}</button>
               </div>
        ))}

                  <button onClick={() => setLanguage("JavaScript")}>Clear</button>
 
    </div>

    <div>
         <button onClick={() => setBeginnerFriendly(!beginnerFriendly)}>{beginnerFriendly == true? "remove beginner friendly" : "add beginner friendly" }</button>
    </div> */}

      {/* <div>

                {language ? (
                  <div>
                       <h1>Selected language</h1>
                       <p>{language}</p>
                  </div>
                ) : (<div> <h1>Selected language</h1> <p>None</p></div>)}
      </div> */}



      <div className='w-3/4 p-4 overflow-y-scroll  min-h-full'>
        {data.map((item) => (
          <div key={item.id}>
                <h1>{item.name}</h1>
          </div>
        ))}
      </div>


      <div className='border-l h-full  w-1/4'>

              <p className='py-4 px-2 border-b text-[16px] font-medium'>Filters</p>

              <div className='py-4 px-2'>

                <p className='text-sm font-medium mb-4'>Language</p>

                <div className='mt-2 flex gap-2 flex-wrap  w-full'>

                       {languages.map((lang) => (
                             <div key={lang}>
                                <button
                                        className={`text-xs border p-2 rounded-md transition-colors duration-200
                                          ${language === lang ? theme === "dark" ? "bg-white text-black" : "bg-black text-white" : theme === "dark"  ? "bg-black text-white" : "bg-white text-black"
                                            }
                                                ${
                                                    theme === "dark"
                                                    ? "hover:text-black hover:bg-white"
                                                   : "hover:text-white hover:bg-black"
                                                   }
                                                     `}
                                                       onClick={() => setLanguage(lang)}>  {lang}</button>

                             </div>
                        ))}
                </div>
              </div>


              <div className='py-4 px-2'>

                <p className='text-sm font-medium mb-4'>Beginner Friendly</p>

                <div className='mt-2 flex gap-2 flex-wrap  w-full'>
                <Switch />

               
                      
                </div>
              </div>
      </div>


    
    </div>
    
  )
}

export default page