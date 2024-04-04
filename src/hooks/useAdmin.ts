import { useState } from "react"

export const useAdmin=()=>{
  const [admin, setAdmin]=useState(false);

  //Funcion para comprobar, en base a la url, si estamos en la ruta admin o no
  const checkAdmin=()=>{
    const url=window.location.href;
    if (url.split("/").find(url=>url==="admin")){
      setAdmin(true);
    }
  }

  return {admin, checkAdmin}

}