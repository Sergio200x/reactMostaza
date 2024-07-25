import React, { useState, useEffect } from 'react';
import '../App.js';
import '../../src/css.css';
import loadingif from '../images/loading-32.gif';
import { Link } from 'react-router-dom';
import { useMemo } from "react";
import Select from 'react-select';
import { useTable } from 'react-table'

//import makeAnimated from 'react-select/animated';
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
link.rel = 'stylesheet';

function Dbspace() {
  const [VersionesPRP, setVersionesPRP] = useState([]);
 

  useEffect(() => {
   
      

      fetch(`${process.env.REACT_APP_API_PROPIOS_FRANQUICIAS}/db_spaceprp`)
        .then(response => response.json())
        .then(data => {
          setVersionesPRP(data.data);
        })
        .catch(error => console.error(error));

     
    }
  , []);


  


  let resultado=[]
  if(VersionesPRP.length>0 )
  {
      VersionesPRP.map(propios => {
        resultado.push(propios)
      }  )
          
  }
  
  
  

  
  
  

  const data = React.useMemo(
    () => resultado,
    [resultado]
  )
   
    const columns = React.useMemo(
      () => [
        {
          Header: "Empresa",
          accessor: "empresa"
        },
        {
          Header: "Codigo de local",
          accessor: "local"
        },
        {
            Header: "Nombre del local",
            accessor: "nombre_local"      
        },
        {
          Header: "Parametro",
          accessor: "parametro"      
        },
        {
          Header: "Tamaño de DB",
          accessor: "valor"      
        },
        {
          Header: "Fecha de Logeo",
          accessor: "fecha"      
        },
        {
          Header: "Nombre de equipo",
          accessor: "equipo"      
        },
        {
          Header: "Nº de caja",
          accessor: "nro_caja"      
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
        <h2 className='titulodash'>Database Report</h2>
        <div className='container_Versi_precios '>
      
        <br></br>
       {resultado.length===0?
        'Cargando Info de Base de datos':
        <div className='fixed-header-table'>
        <table {...getTableProps()} style={{ border: 'solid 1px black'}}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 5px red',
                   background: 'Red',
                   color: 'white',
                   fontWeight: 'bold',
                   fontSize:'100%',
                   padding:'1px',
                   
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
                       fontSize:'80%',
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
          
           
            <div className='container_volver'>                           
            <h2 className='volver'>
                <Link to="/"  className='volverlink_sync'>Volver al Dash Principal</Link>
                    </h2> 
            </div>       
        </div> 

    </div>
    
<div>
        
</div>

</div>        
)

   
}
export default Dbspace
    