import { useState } from "react"

export const useCategory=()=>{
  const [category, setCategory]=useState<string>()
  const checkCategory=()=>{
    setCategory(window.location.href.split("/").pop())
  }

  return {category, checkCategory}
}