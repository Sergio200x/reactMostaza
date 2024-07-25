import React,{useState,useEffect} from 'react'
import '../App.js'
import '../../src/css.css'
import loadingif from '../images/loading-32.gif'
import {Link} from 'react-router-dom'
import { useMemo } from "react";
import Select from 'react-select';
import { useTable } from 'react-table'
import { versionesProductivas } from '../versiones.js'
//import makeAnimated from 'react-select/animated'



function Versiones_productivas(){
   
    const [nuevaAplicacion, setNuevaAplicacion] = useState('');
    const [nuevaVersion, setNuevaVersion] = useState('');
    const [nuevoTipo, setNuevoTipo] = useState('');
    const [versiones, setVersiones] = useState([]); // Define 'versiones'
    const [buscar, setBuscar] = useState('');
    const [enviarParametro, setEnviarParametro] = useState(false);

    const versionesTotales = [...versiones, ...versionesProductivas];
    const resultado = buscar.length === 0
        ? versionesTotales
        : versionesTotales.filter((vers) =>
              !vers.Version.toLowerCase().includes(buscar.toLowerCase())
          );
    const data = React.useMemo(() => resultado, [resultado]);

    // Resto de tu código

    const agregarVersion = () => {
        const nuevaVersionObj = {
            Aplicacion: nuevaAplicacion,
            Version: nuevaVersion,
            Tipo: nuevoTipo
        };
        setVersiones([...versiones, nuevaVersionObj]); // Actualiza el estado de 'versiones'

        // Borrar campos de entrada
        setNuevaAplicacion('');
        setNuevaVersion('');
        setNuevoTipo('');
    };
    
            let listadoapps=[
                {label:"Actualizadatos", value:"Actualizadatos"},
                {label:"AppMtz", value:"PanelMTZ|VERSION"},
                {label:"Centralizador", value:"Centralizador"},
                {label:"CentralizadorComanda", value:"CentralizadorComanda|Version"},
                {label:"DescargaLocal", value:"DescargaLocal|VERSION"},
                {label:"DualpointCaja", value:"ZonaEntrega|Version"},
                {label:"Dualpointllamador", value:"ZonaLlamador|Version"},
                {label:"Informes", value:"Informes|Version"},
                {label:"Meli", value:"PanelMELI|VERSION"},
                {label:"OCX", value:"CFOCXVERSI"},
                {label:"PantallaComanda", value:"PantallaComanda"},
                {label:"Peya", value:"PanelPedidosYa|VERSION"},
                {label:"Profit", value:"VERSION"},
                {label:"Rappi", value:"PanelRappi"},
                {label:"totem.exe", value:"VERSIONT"},
                {label:"DLL MercadoPago", value:"ActiveX|Version"},
		{label:"Totem Version", value:"TOTEM_VERSION"}]






/*const parametro_capturar = (parametro)=>{
    setParametro(select.value)  
}*/








const columns = React.useMemo(
        () => [
          {
            Header: "Aplicacion",
            accessor: "aplicacion"
          },
          {
            Header: "Version",
            accessor: "version"
          },
          {
              Header: "Fecha de log",
              accessor: "fecha"
          },
          {
              Header: "Tipo",
              accessor: "tipo"
          },         
          
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
    <div className='containerMAIN' >
        <div className='principal_container_Versi_precios'></div>
        <div className='container_Versi_precios '>
            <div className='inputsVersiones'>
            <div className='inputsVersiones_hijo'>
    <input
        type="text"
        value={nuevaAplicacion}
        placeholder='Aplicación'
        onChange={(e) => setNuevaAplicacion(e.target.value)}
    />
    <input
        type="text"
        value={nuevaVersion}
        placeholder='Versión'
        onChange={(e) => setNuevaVersion(e.target.value)}
    />
    <input
        type="text"
        value={nuevoTipo}
        placeholder='Tipo'
        onChange={(e) => setNuevoTipo(e.target.value)}
    />
</div>
<div className='botoncito'>
    <button onClick={agregarVersion} className='boton'>
        Agregar
    </button>
</div>

            <div className='botoncito'>
              <button onClick={() => setEnviarParametro(true)} className='boton'>Consultar</button>
              </div>
            </div>
          
               <div className='container_ul_versiones'> 
               <br></br>
        {resultado.length===0? <div className='texto_relleno'>
        <h2><strong> Por favor complete la version y el aplicativo a buscar</strong></h2>
        </div>:<div className='fixed-header-table'>
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
                   padding:'3px'
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
            
            </div>    
            <div className='container_volver'>                           
            <h2 className='volver'>
                <Link to="/"  className='volverlink_sync'>Volver al Dash Principal</Link>
                    </h2> 
            </div>       
        </div> 

        </div>
    

       
)

   
}
export default Versiones_productivas
    