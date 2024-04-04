import { useState } from "react"
import { categories } from "../utils/constants"

export const useCategory=()=>{
  const [category, setCategory]=useState<string>()
  const checkCategory = () => {
    const urlArray = window.location.href.split("/");
    const foundCategory = categories.find(cat => urlArray.includes(cat));

    if (foundCategory) {
      setCategory(foundCategory);
    } else {
      setCategory(undefined);
    }
  };

  return {category, checkCategory}
}