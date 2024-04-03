import { useState } from "react"
import { categories } from "../utils/constants"

export const useCategory=()=>{
  const [category, setCategory]=useState<string>()
  const checkCategory=()=>{
    const urlArray=window.location.href.split("/");
      for (const cat of categories){
        if (urlArray.includes(cat)){
          setCategory(cat)
        }
      }
  }

  return {category, checkCategory}
}