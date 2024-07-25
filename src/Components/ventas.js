import React, { useState, useEffect } from 'react';
import '../App.js';
import '../../src/css.css';
import loadingif from '../images/loading-32.gif';
import { Link } from 'react-router-dom';
import { useMemo } from "react";
import Select from 'react-select';
import { useTable } from 'react-table'
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
link.rel = 'stylesheet';


//import makeAnimated from 'react-select/animated';

function Ventas() {
  const [VersionesPRP, setVersionesPRP] = useState([]);
  const [VersionesPRP_UY, setVersionesPRP_UY] = useState([]);
  const [VersioneGMG, setVersionesGMG] = useState([]);
  const [VersionesFRP, setVersionesFRP]= useState([]);
  const [VersionesFRP_UY, setVersionesFRP_UY]= useState([])  
  const [descripcion, setDescripcion] = useState('');
  const [local, setLocal] = useState('');
  const [enviarParametro, setEnviarParametro] = useState(false);

  useEffect(() => {
   
      

      fetch(`${process.env.REACT_APP_API_PROPIOS_FRANQUICIAS}/ventas_mes_corriente`)
        .then(response => response.json())
        .then(data => {
          setVersionesPRP(data.data);
        })
        .catch(error => console.error(error));

     
    }
  , []);
  

  

  let versiones=[]
  if(VersionesPRP.length>0 )
  {
      VersionesPRP.map(propios => {
          versiones.push(propios)
      }  )
     
      
  }
  
  
  
  
  let resultado=[]
  
  if(enviarParametro.length!=0)
      {
          resultado=versiones
          console.log("estoy en el if")
      }
  
  
  

  const data = React.useMemo(
    () => resultado,
    [resultado]
  )
   
    const columns = React.useMemo(
      () => [
        {
          Header: "Nombre del local",
          accessor: "Local"
        },
        {
          Header: "Cantidad de tickets de este mes",
          accessor: "Cant_ticket_Mes_Corriente"
        },
        {
          Header: "Total de ventas del mes",
          accessor: "Venta_Mes_Corriente",
          Cell: ({ value }) => `$ ${value}`
        }
      ],
      []
    );

   
    const tableInstance = useTable({ columns, data })
   
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = tableInstance


   

return (
    <div className='container_Versi_precios'>
      <div className='principal_container_Versi_precios'>
        <h2 className='titulodash'>Ventas</h2>
        <div className='container_Versi_precios '>
      
        <br></br>
       {resultado.length===0?
        'Cargando Ventas':
        <div className='fixed-header-table'>
        <table {...getTableProps()} style={{ border: 'solid 1px black'}}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 10px red',
                   background: 'Red',
                   color: 'white',
                   fontWeight: 'bold',
                   fontSize:'130%',
                   padding:'5px',
                   
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       
       <tbody {...getTableBodyProps()} >
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                        border: 'solid 1px gray',
                       background: 'whitesmoke',
                       fontSize:'100%',
                       fontWeight:'bolder'
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
       
     </table>
     </div>
   }      
          
           
           
        </div> 

    </div>
    
<div>
        
</div>

</div>        
)

   
}
export default Ventas
    