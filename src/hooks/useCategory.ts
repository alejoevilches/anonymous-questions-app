import { useState } from "react"

export const useCategory=()=>{
  const [category, setCategory]=useState<string>()
  const checkCategory=()=>{
    const cat=window.location.href.split("/");
    console.log(cat);
    setCategory(window.location.href.split("/").pop())
  }

  return {category, checkCategory}
}