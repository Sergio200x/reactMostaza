import React, { useState, useEffect } from 'react';
import '../App.js';
import '../../src/css.css';
import loadingif from '../images/loading-32.gif';
import { Link } from 'react-router-dom';
import { useMemo } from "react";
import Select from 'react-select';
import { useTable } from 'react-table'

//import makeAnimated from 'react-select/animated';

function PreciosYarticulos() {
  const [VersionesPRP, setVersionesPRP] = useState([]);
  const [VersioneGMG, setVersionesGMG] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [local, setLocal] = useState('');
  const [enviarParametro, setEnviarParametro] = useState(false);

  useEffect(() => {
    if (enviarParametro && descripcion.length !== 0 && descripcion.trim() !== '' && descripcion !== 'NULL') {
      const parametro = descripcion.trim();
      const parametro1 = local.trim();

      fetch(`http://10.0.1.7:3035/preciosyarts?parametro=${parametro}&parametro1=${parametro1}`)
        .then(response => response.json())
        .then(data => {
          setVersionesPRP(data.data);
        })
        .catch(error => console.error(error));

      setEnviarParametro(false); // Reiniciar el estado de enviarParametro
    }
  }, [enviarParametro, local,descripcion]);
  



  const buscador = descripcion => {
    setDescripcion(descripcion.target.value);
    setEnviarParametro(false);
  };
  const buscador1 = local => {
    setLocal(local.target.value);
    setEnviarParametro(false);
  };

  const resultado = VersionesPRP;

  const data = React.useMemo(
    () => resultado,
    [resultado]
  )
   
    const columns = React.useMemo(
      () => [
        {
          Header: "Tipo",
          accessor: "TIPO"
        },
        {
          Header: "Nombre",
          accessor: "NOMBRE_DE_LOCAL"
        },
        {
          Header: "Codigo",
          accessor: "CODIGO_DE_LOCAL"
        },
        {
          Header: "N° Articulo",
          accessor: "CODIGO_DE_ARTICULO"
        }
        ,
        {
          Header: "Desc. Corta",
          accessor: "DESC_CORTA"
        }
        ,
        {
          Header: "Desc. Larga",
          accessor: "DESC_LARGA"
        }
        ,
        {
          Header: "Precio",
          accessor: "PRECIO"
        }
        ,
        {
          Header: "Precio Unit.",
          accessor: "PRECIO_UNI"
        }
        ,
        {
          Header: "Fecha Env.",
          accessor: "ULTIMO_ENV"
        }
        ,
        {
          Header: "Desde",
          accessor: "DESDE"
        }
        ,
        {
          Header: "Hasta",
          accessor: "HASTA"
        }
        ,
        {
          Header: "Rubro",
          accessor: "RUBRO"
        }
        ,
        {
          Header: "Es Menu",
          accessor: "ES_MENU"
        }
        ,
        {
          Header: "Activo",
          accessor: "ACTIVO"
        }
        ,
        {
          Header: "Se Agranda",
          accessor: "SE_AGRANDA"
        }
        ,
        {
          Header: "Se Factura",
          accessor: "SE_FACTURA"
        }
        ,
        {
          Header: "Se Vende",
          accessor: "SE_VENDE"
        }
        ,
        {
          Header: "Env. a Local",
          accessor: "SE_ENVIA_A_LOCAL"
        }
        ,
        {
          Header: "En Botonera",
          accessor: "EN_BOTONERA"
        }
        ,
        {
          Header: "Orden en Zona",
          accessor: "JERARQUIA_EN_ZONA"
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
        <h2 className='titulo_Versi'></h2>
        <div className='container_Versi_precios '>
          <div className='inputs_Versi'>
            <div className='inputs_cont_Versi'>
              <input
                type='text'
                value={descripcion}
                placeholder='Descripcion'
                onChange={buscador}
              />
            </div>
            <div className='inputs_cont_Versi'>
              <input
                type='text'
                value={local}
                placeholder='Codigo de local'
                onChange={buscador1}
              />
              <div>
              <button onClick={() => setEnviarParametro(true)} className='boton'>Consultar</button>
              </div>
            </div>
            
          </div>
        <br></br>
       {resultado.length===0?
        <div className='texto_relleno'><h2><strong> Por favor complete la descripcion y el local a Buscar</strong></h2></div>:
        <div className='fixed-header-table'>
        <table {...getTableProps()} style={{ border: 'solid 1px black'}}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'Red',
                   color: 'white',
                   fontWeight: 'bold',
                   fontSize:'80%',
                   padding:'2px'
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
                       fontSize:'60%',
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
export default PreciosYarticulos
    