import { useState } from "react"

export const useAdmin=()=>{
  const [admin, setAdmin]=useState(false);

  const checkAdmin=()=>{
    const url=window.location.href;
    if (url.split("/").find(url=>url==="admin")){
      setAdmin(true);
    }
  }

  return {admin, checkAdmin}

}