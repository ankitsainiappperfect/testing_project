import React from 'react'
const ColumnFilter=({column})=>
{
 const{filter,setFilter}=column
  return(
    <div>
        Search:{' '}
        <input value={filter||''} onChange={(e)=>setFilter(e.target.value)}/>
    </div>
  )
}
export default ColumnFilter;