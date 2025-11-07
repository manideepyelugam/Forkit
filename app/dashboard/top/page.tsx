"use client";
import React from "react";
import { useState, useEffect } from "react";
import Languages from "../../../options/Languages";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { CircleDot, GitFork, Star } from "lucide-react";
import PopupModal from "@/components/PopupModal";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
  description?: string;
  open_issues_count?:number;
  forks_count:number;
  owner: {
    avatar_url: string;
    login: string;
    html_url: string;
  };
  topics?:string[];

};

const page = () => {
  const URL = process.env.NEXT_PUBLIC_API_URL;

  const languages = Languages;

  const theme = useTheme().theme;

  const [data, setData] = useState<Repo[]>([]);
  const [language, setLanguage] = useState<string>("JavaScript");
  const [beginnerFriendly, setBeginnerFriendly] = useState<boolean>(false);

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const convertedFinalDate = oneWeekAgo.toISOString().split("T")[0];

  let q = "";

  if (language) {
    if (beginnerFriendly) {
      q = `stars:500..10000+pushed:>${convertedFinalDate}+is:public+language:${language}&sort=stars&order=desc&per_page=50`;
    } else {
      q = `stars:>1000+pushed:>${convertedFinalDate}+is:public+language:${language}&sort=stars&order=desc&per_page=50`;
    }
  }



  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch(`${URL}/api/git/repos?q=${q}`);
  //     const data = await res.json();
  //      console.log(data)
  //     setData(data.items);
  //   };

  //   fetchData();
  // }, [language, beginnerFriendly]);


  return (
    <div className="h-[93vh] flex  ">

      <PopupModal/>



      <div className="w-3/4 p-4 overflow-y-scroll  min-h-full">

      <h1 className="font-light mb-5">Reposiotries</h1>

      <div className="rounded-md cursor-pointer overflow-hidden border">
         {data.map((item) => (
                <div className={`border-b p-5 m-0 flex flex-col  justify-between ${theme === "dark" ? "hover:bg-[#2020207b]" : "hover:bg-[#f3f3f380]"}`} key={item.id}>


                <div className="flex items-center justify-between w-full">
                   <div className="flex gap-3 items-center">
                         <img src={item.owner.avatar_url} alt={item.name} className="h-7 w-7 rounded-full "/>
                         <h1 className="text-[18px] font-semibold">{item.name}</h1>
    
                   </div>
    
                   <div className="flex gap-3">
                             <div className="flex items-center gap-1 border rounded-md p-1 px-2">
                                      <CircleDot strokeWidth={1.5} size={14}/> 
                                      <p className="text-xs ">Issues</p>
                                      <div className={`text-[10px] font-medium flex items-center  px-2 ml-1 border rounded-2xl ${theme === "dark" ? "bg-[#1c1c1c]" : "bg-[#ececec]"}`}>{item.open_issues_count}</div>
                             </div>
    
                             <div className="flex items-center gap-1 border rounded-md p-1 px-2">
                                       <Star strokeWidth={1.5} size={14}/>
                                      <p className="text-xs ">Stars</p>
                                      <div className={`text-[10px] font-medium flex items-center  px-2 ml-1 border rounded-2xl ${theme === "dark" ? "bg-[#1c1c1c]" : "bg-[#ececec]"}`}>{item.stargazers_count}</div>
                             </div>
    
                             <div className="flex items-center gap-1 border rounded-md p-1 px-2">
                                       <GitFork strokeWidth={1.5} size={14}/>
                                      <p className="text-xs ">Forks</p>
                                      <div className={`text-[10px] font-medium flex items-center  px-2 ml-1 border rounded-2xl ${theme === "dark" ? "bg-[#1c1c1c]" : "bg-[#ececec]"}`}>{item.forks_count}</div>
                             </div>
                   </div>
    
                 </div>
    
    
                 <div className="flex flex-col gap-3 mt-6 items-start">
                              <p className=" text-xs">{item.description}</p>
    
                              <div className="">
      <div className="flex flex-wrap gap-2">
        {item.topics?.map((topic, index) => {
          const colors = [
            { bg: "bg-blue-100", text: "text-blue-800" },
            { bg: "bg-green-100", text: "text-green-800" },
            { bg: "bg-purple-100", text: "text-purple-800" },
            { bg: "bg-yellow-100", text: "text-yellow-800" },
            { bg: "bg-pink-100", text: "text-pink-800" },
            { bg: "bg-orange-100", text: "text-orange-800" },
            { bg: "bg-indigo-100", text: "text-indigo-800" },
            { bg: "bg-rose-100", text: "text-rose-800" },
          ];
    
          // pick color cyclically based on index
          const color = colors[index % colors.length];
    
          return (
            <p
              key={topic}
              className={`text-[10px] border px-2 py-0.5 rounded-full font-medium ${color.bg} ${color.text} border-none`}
            >
              {topic}
            </p>
          );
        })}
      </div>
    </div>
    
                 </div>
    
               </div>
           ))}

          

      </div>
        
      </div>

      <div className="border-l h-full  w-1/4">
        <p className="py-4 px-2 border-b text-[16px] font-medium">Filters</p>

        <div className="py-4 px-4">
          <p className="text-sm font-medium mb-4">Language</p>

          <div className="mt-2 flex gap-2 flex-wrap  w-full">
            {languages.map((lang) => (
              <div key={lang}>
                <button
                  className={`text-xs border p-2 rounded-md transition-colors duration-200
                                          ${language === lang
                      ? theme === "dark"
                        ? "bg-white text-black"
                        : "bg-black text-white"
                      : theme === "dark"
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }
                                                ${theme === "dark"
                      ? "hover:text-black hover:bg-white"
                      : "hover:text-white hover:bg-black"
                    }
                                                     `}
                  onClick={() => setLanguage(lang)}
                >
                  {lang}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="py-4 px-4">
          <p className="text-sm font-medium mb-4">Beginner Friendly</p>

          <div className="mt-2 flex gap-2 flex-wrap  w-full">
            <Switch onClick={() => setBeginnerFriendly(!beginnerFriendly)} />
          </div>
        </div>



      </div>
    </div>
  );
};



export default page;


// owner - avatar_url
// description
// forks_count
// full_name
// html_url(url to repo)
// open_issues_count
// owner - topics
// we need to add recently closed pr so that we can add a active label i.e they are accepting pr's 
// we need to add stars of the repo 

