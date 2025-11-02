'use client'
import React from 'react'
import { useState,useEffect } from 'react';
import Languages from "../../../options/Languages"
import MultiSelector from '@/components/MultiSelector';

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

    <div>


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
    </div>

      <div>

                {language ? (
                  <div>
                       <h1>Selected language</h1>
                       <p>{language}</p>
                  </div>
                ) : (<div> <h1>Selected language</h1> <p>None</p></div>)}
      </div>



      <div>
        {data.map((item) => (
          <div key={item.id}>
                <h1>{item.name}</h1>
          </div>
        ))}
      </div>

    
    </div>
    
  )
}

export default page