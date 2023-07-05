import React, { useEffect, useState } from 'react'
import axios from "axios"
 import TableComp from "./TableComponent"
 
export default function Home() {
 
    const baseurl="https://api-generator.retool.com/BCXhOO/data"
   
    
    
    
    
      async function getdata()
      {
        
      let st=localStorage.getItem('listofemployee');
      if(st.length===2||st==null)  //checking if local storage is empty or not
       {
        const {data}= await axios.get(baseurl)
        localStorage.setItem('listofemployee',JSON.stringify(data));
       }
       else
       {
        console.log("data not Null",st);
       }
      }

      getdata()
    
    
   
   
     
  
   
  return (
     
    <>
      <TableComp />
    </>
    
  )
}
