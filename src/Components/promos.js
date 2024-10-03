import React, { useState, useEffect } from 'react';
import '../App.js';
import '../../src/css.css';
import loadingif from '../images/loading-32.gif';
import { Link } from 'react-router-dom';
import { useMemo } from "react";
import Select from 'react-select';
import { useTable } from 'react-table'
//import makeAnimated from 'react-select/animated';

function Promos() {
  const [promosPRP, setpromosPRP] = useState([]);
  const [promosPRP_UY, setpromosPRP_UY] = useState([]);
  const [promosGMG, setpromosGMG] = useState([]);  
  const [promosPY, setpromosPY] = useState([]);  
  const [promo, setpromo] = useState('');
  const [local, setLocal] = useState('');
  const [enviarParametro, setEnviarParametro] = useState(false);

  useEffect(() => {
    if (enviarParametro && promo.length !== 0 && promo.trim() !== '' && promo !== 'NULL') {
      const parametro = encodeURIComponent(promo.trim())
      const parametro1 = encodeURIComponent(local.trim());
      
      fetch(`${process.env.REACT_APP_API_PROPIOS_FRANQUICIAS}/promos_prp?parametro=${parametro}&parametro1=${parametro1}`)
        .then(response => response.json())
        .then(data => {
             setpromosPRP(data.data);
        })
        .catch(error => console.error(error));

      setEnviarParametro(false); // Reiniciar el estado de enviarParametro
    }
  }, [enviarParametro, local,promo]);

  useEffect(() => {
    if (enviarParametro && promo.length !== 0 && promo.trim() !== '' && promo !== 'NULL') {
      const parametro = encodeURIComponent(promo.trim())
      const parametro1 = encodeURIComponent(local.trim());
      
      fetch(`${process.env.REACT_APP_API_PARAGUAY}/promos_prp?parametro=${parametro}&parametro1=${parametro1}`)
        .then(response => response.json())
        .then(data => {
            setpromosPY(data.data);
        })
        .catch(error => console.error(error));

      setEnviarParametro(false); // Reiniciar el estado de enviarParametro
    }
  }, [enviarParametro, local,promo]);
  
  
useEffect(() => {
    if (enviarParametro && promo.length !== 0 && promo.trim() !== '' && promo !== 'NULL') {
      const parametro = encodeURIComponent(promo.trim())
      const parametro1 = encodeURIComponent(local.trim());

      fetch(`${process.env.REACT_APP_API_URUGUAYPROPIOS_FRANQUICIAS}/promos_prp?parametro=${parametro}&parametro1=${parametro1}`)
        .then(response => response.json())
        .then(data => {
          setpromosPRP_UY(data.data);
        })
        .catch(error => console.error(error));

      setEnviarParametro(false); // Reiniciar el estado de enviarParametro
    }
  }, [enviarParametro, local,promo]);
 
 




  useEffect(() => {
    if (enviarParametro && promo.length !== 0 && promo.trim() !== '' && promo !== 'NULL') {
      const parametro = encodeURIComponent(promo.trim());
      const parametro1 = encodeURIComponent(local.trim());
      fetch(`${process.env.REACT_APP_API_GMG}/promos_prp?parametro=${parametro}&parametro1=${parametro1}`)
        .then(response => response.json())
        .then(data => {
          setpromosGMG(data.data);
        })
        .catch(error => console.error(error));

      setEnviarParametro(false); // Reiniciar el estado de enviarParametro
    }
  }, [enviarParametro, local,promo]);
  

  const buscador = promo => {
    setpromo(promo.target.value);
    setEnviarParametro(false);
  };
  const buscador1 = local => {
    setLocal(local.target.value);
    setEnviarParametro(false);
  };

  let versiones=[]
  if(promosPRP.length>0 || promosGMG.length>0 ||promosPRP_UY.length>0 ||promosPY.length>0  )
  {
      promosPRP.map(propios => {
          versiones.push(propios)
      }  )
     
     promosGMG.map(propios => {
          versiones.push(propios)
      }  )
	
	promosPRP_UY.map(PRP_UY => {
          versiones.push(PRP_UY)
      }  )
      
      promosPY.map(PRP_PY => {
        versiones.push(PRP_PY)
    }  )
      
  }
  
  
  
  
  let resultado=[]
  
  if(enviarParametro.length!=0)
      {
          resultado=versiones
         
      }
  
  
  

  const data = React.useMemo(
    () => resultado,
    [resultado]
  )
   
    const columns = React.useMemo(
      () => [
        {
          Header: "Local Precio.",
          accessor: "local_pre"
        },
        {
          Header: "Codigo de promo",
          accessor: "codPromo"
        },
        {
          Header: "Promocion",
          accessor: "Promo"
        },
        {
          Header: "N° Articulo",
          accessor: "codArticulo"
        }
        ,
        {
          Header: "Desc. Corta",
          accessor: "Descripcion"
        }
        ,
        {
          Header: "Precio",
          accessor: "Precio"
        }
        ,
        {
          Header: "Cant. en Promo",
          accessor: "CantEnPromo"
        }
        ,
        {
          Header: "Tipo de Promo.",
          accessor: "Tipo Promo"
        }
        ,
        {
          Header: "items en promo",
          accessor: "Items en promo"
        }
        ,
        {
          Header: "Prod. en Promo",
          accessor: "ProdEnPromo"
        }
        ,
        {
          Header: "Precio Promo",
          accessor: "Precio Promo"
        },
        {
          Header: "Segmento",
          accessor: "Segmento"
        }
        ,
        {
          Header: "Fecha  Desde",
          accessor: "Desde"
        }
        ,
        {
          Header: "Fecha Hasta",
          accessor: "Hasta"
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
        <h1 className='titulodash'>Promos</h1>
        <div className='container_Versi_precios '>
          <div className='inputs_Versi'>
            <div className='inputs_cont_Versi'>
              <input
                type='text'
                value={promo}
                placeholder='Codigo de promo'
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
              
            </div>
            <div>
              <button onClick={() => setEnviarParametro(true)} className='boton'>Consultar</button>
              </div>
          </div>
        <br></br>
       {resultado.length===0?
        <div className='texto_relleno'><h2><strong> Por favor complete la promo y el local a Buscar</strong></h2></div>:
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
     <div className='container_volver'>                           
            <h2 className='volver'>
                <Link to="/"  className='volverlink_sync'>Volver al Dash Principal</Link>
                    </h2> 
            </div>      
     </div>
   }      
          
           
           
        </div> 

    </div>
    
<div>
        
</div>

</div>        
)

   
}
export default Promos
    