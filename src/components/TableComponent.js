import React, { useEffect, useState } from "react";
import './table.css'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

import { useMemo } from "react";



const  TableComponent=()=> {
 
  const [selectRow,setselectRow]=useState([])// to tell which row is selected to edit
  const [deleteRow,setdeleteRow]=useState([])// to tell which row is selected to delete
  
  const empdata=JSON.parse(localStorage.getItem('listofemployee'))

  const [originalData, setoriginalData] = useState(() => [...empdata]);

  const [data,setData]=useState([...empdata])

  // console.log("empdata data");
  // console.log(empdata);

  useEffect(()=>
  {
   localStorage.setItem('listofemployee',JSON.stringify(data));
   
          
  },[data])
 
  const columnHelper = createColumnHelper(); 

  // to Edit Each cell of the row
  const EditableCell = ({ getValue, row, column, table }) => {
    const initialValue = getValue();
    const columnMeta = column.columnDef.meta;
    const tableMeta = table.options.meta;
    const [value, setValue] = useState(initialValue);
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
    // This event will fire every time we become out of Focus
    const onBlur = () => {
      // calling update data function through meta
      // this will update when we will come out of focus
      tableMeta.updateData(row.index, column.id, value);
    };
    const onSelectChange = (e) => {
      setValue(e.target.value);
      tableMeta.updateData(row.index, column.id, e.target.value);
    };
    const onValueChange=async (e)=>
    {
      setValue(e.target.value)
    }
    if (tableMeta.selectRow[row.id]) {
      return columnMeta.type === "select" ? (
        <select onChange={onSelectChange} value={initialValue}>
          {columnMeta.options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          value={value}
          onChange={onValueChange}
          onBlur={onBlur}
          type={columnMeta.type || "text"}
        />
      );
    }
   
    return <span>{value}</span>;
  };
  
  const EditAction = ({ row, table }) => {
    const meta = table.options.meta;
    //marking the row selected for editing
    const setselectRow = (e) => {
      meta.setselectRow((old) => ({
        ...old,
        [row.id]: !old[row.id],
      }));
      // will retrieve previous data if we do not want changes to be done
      meta.revertData(row.index, e.target.name === "cancel");
    };
    // if this row id is selected for edit it will display 
    // both cancel and tick sign.
    return meta.selectRow[row.id] ? (
      <>
        <button onClick={setselectRow} name="cancel">X</button> 
        <button onClick={setselectRow}>✔</button>
      </>
    ) : (
      <>
    
      <button onClick={setselectRow}>✐</button>
      </>
    );
  };
  
  const DeleteAction = ({ row, table }) => {
    const meta = table.options.meta;
    const setdeleteRow = (e) => {
      const rows = [...data];
      rows.splice(row.index, 1);
      setData(rows);
      
    };
    
    return (
      <>
      <button onClick={setdeleteRow}>X</button>
      </>
    );
  };

  const  defaultColumns = [

    {
      header:'ID',
      accessorKey: 'id',
      footer:'ID',
      cell: EditableCell,
      meta: {
        type: "number",
      },
    },
    {
      header:'Email',
      accessorKey: 'email',
      footer:'Email',
      cell: EditableCell,
      meta: {
        type: "text",
      },
    },
    {
      header:'Manager',
      accessorKey: 'Manager',
      footer:'Manager',
      cell: EditableCell,
      meta: {
        type: "text",
      },
    },
  {
    header:'projectId',
    accessorKey: 'projectId',
    footer:'projectId',
    cell: EditableCell,
    meta: {
      type: "number",
    },
  },
  {
    header:'Employee',
    accessorKey: 'Employee',
    footer:'Employee',
    cell: EditableCell,
    meta: {
      type: "text",
    },
  },
 
  columnHelper.display({
    id: "edit",
    cell: EditAction,
  }),
  columnHelper.display({
    id: "delete",
    cell: DeleteAction,
  }),
  
  
]


  
  const columns=useMemo(()=>defaultColumns)
  
  

  const table= useReactTable({
    data,
    columns,
    getCoreRowModel:getCoreRowModel(),
    meta: // is available everywhere where table is present   
    {
      selectRow,
      setselectRow,
  deleteRow,
      setdeleteRow,
    // if cancel button is pressed while editing
    //
    revertData: (rowIndex, revert) => {
      if (revert) {
        setData((old) =>
          old.map((row, index) =>
            index === rowIndex ? originalData[rowIndex] : row
          )
        );
      } else {
        setoriginalData((old) =>
          old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
        );
      }
    },

    updateData: async(rowIndex, columnId, value) => {
         setData((old) =>
        old.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...old[rowIndex],
              [columnId]: value,// updated the corresponding column
            };
          }
          return row;
        })
         
      );
      
    },
    
  }
    
    });
    
    //console.log('header', table)
   //console.log('headergroup',table.getHeaderGroups());
        
  return (
  <div>
  <table>
  
    <thead>
    
     {table.getHeaderGroups().map(headerGroup => (
       
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            
            <th key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                
            </th>
          
          ))}
        </tr>
      ))}
    
    </thead>
   
    <tbody>
          {table.getRowModel().rows.map(row => ( 
            <tr key={row.id}>
             
              {row.getVisibleCells().map(cell => (
                
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                 
                </td>
               
              ))}
             
            </tr>
          ))}
        </tbody>
          <tfoot>
          </tfoot>

  </table>
  </div>
  )
}
export default TableComponent;