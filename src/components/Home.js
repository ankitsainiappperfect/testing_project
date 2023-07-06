import React, { useEffect, useState } from 'react'
import axios from "axios"
import TableComp from "./TableComponent"
 
 
export default function Home() {

  const [data1,setData]=useState(0)
  const [loading, setLoading] = useState(true);
  const [storedData, setStoredData] = useState(localStorage.getItem('listofemployee')) 
  const [isDataDirty, setIsDataDirty] = useState(false); 
  //const [st,setst]=useState(0)
  const baseurl="https://api-generator.retool.com/BCXhOO/data"

  //let state=0;

//  useEffect(()=>
//  {
  async function getdata()
  {
    const {data}= await axios.get(baseurl)
    localStorage.setItem('listofemployee',JSON.stringify(data));
    setStoredData(localStorage.getItem('listofemployee'));
    setIsDataDirty(true);
    setData(prev => prev + 1);
    console.log('Run Count ' , data1); 
  }
  //getdata()
  // async function er()
  // {
  //   await getdata();
  //  // state=1;
  //  return <h1>hi</h1>
  // }
  // 
  //     useEffect(()=>
  //     {
  //       if(localStorage.getItem('listofemployee'))
  //   {
  //     setData(data => data + 1);
  //  }
  //  else {
  //   getdata();
  //  }
  //     },[])

  useEffect(()=>{
   if(!((localStorage.getItem('listofemployee') !== null) || (localStorage.getItem('listofemployee')!==null&&localStorage.getItem('listofemployee').length>2)))
    (async () => {
      await getdata()
    }) ()
  })

  useEffect(()=> {
    console.log('storedData', storedData)
    if(storedData !== null && storedData.length>2){
      console.log('settingLoading', loading)
      setLoading(false)
    }
  },[storedData]) 
   
     
  //  console.log(er());
   
  return (
    <div>
    {loading === true ?  (<div> Loading </div>) : (<TableComp/>)} 
    </div> 
    
 

  )
}
