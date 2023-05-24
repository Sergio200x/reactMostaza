import React,{useState,useEffect} from 'react'
import '../App.js'
import '../../src/css.css'
import loadingif from '../images/loading-32.gif'
import {Link} from 'react-router-dom'
import { useMemo } from "react";
import Select from 'react-select';
import { useTable } from 'react-table'
//import makeAnimated from 'react-select/animated'



function Versiones(){
   
    const [VersionesPRP, setVersionesPRP]= useState([]) 
    const [buscarpr,setbuscarpr]= useState("")   
    const [buscar,setbuscar]= useState("")  
    const [parametro, setParametro] = useState('');
    const [enviarParametro, setEnviarParametro] = useState(false);
   
    
    const parametro2 = parametro.trim()
    const url = 
    useEffect (() => {  
        if (enviarParametro && parametro.length !== 0 && parametro.trim() !== '' && parametro !== 'NULL') {
            const parametro2 = parametro.trim()
              
            fetch(`http://10.0.1.7:3035/versiones?parametro2=${parametro2}`)
            .then(response => response.json())
            .then( data =>{ setVersionesPRP(data.data)} )
            .catch(error =>console.error(error))
            setEnviarParametro(false);
        }

            },[enviarParametro, parametro]) 

   /* const [VersionesFRP, setVersionesFRP]= useState([])    
    useEffect (() => {        
            fetch("http://localhost:3040/versiones")
            .then(response => response.json())
            .then( data =>{ setVersionesFRP(data.data)} )
            .catch(error =>console.error(error))
            }, [])               
      */
            let listadoapps=[
                {label:"Actualizadatos", value:"Actualizadatos"},
                {label:"AppMtz", value:"PanelMTZ|VERSION"},
                {label:"Centralizador", value:"Centralizador"},
                {label:"CentralizadorComanda", value:"CentralizadorComanda|Version"},
                {label:"DescargaLocal", value:"DescargaLocal|VERSION"},
                {label:"DualpointCaja", value:"ZonaEntrega|Version"},
                {label:"Dualpointllamador", value:"ZonaLlamador|Version"},
                {label:"Informes", value:"Informes"},
                {label:"Meli", value:"PanelMELI|VERSION"},
                {label:"OCX", value:"CFOCXVERSI"},
                {label:"PantallaComanda", value:"PantallaComanda"},
                {label:"Peya", value:"PanelPedidosYa|VERSION"},
                {label:"Profit", value:"VERSION"},
                {label:"Rappi", value:"PanelRappi"},
                {label:"totem.exe", value:"VERSIONT"}]




const buscador = (version)=>{
    setbuscar(version.target.value)
}
const buscadorp = (buscarpp)=>{
    setbuscarpr(buscarpp.target.value)   
}

const buscadorselect = (select)=>{
    setParametro(select.value)  
    setEnviarParametro(false);
}

/*const parametro_capturar = (parametro)=>{
    setParametro(select.value)  
}*/



let versiones=[]
if(VersionesPRP.length>0/*||VersionesFRP.length>0*/)
{
    VersionesPRP.map(propios => {
        versiones.push(propios)
    }  )
   // versiones.push(VersionesFRP)
    
}




let resultado=[]

if(buscar.length===0)
    {
        resultado=versiones
        console.log("estoy en el if")
    }

else {
    resultado = versiones.filter((vers) =>
    !vers.Nro_version.toLowerCase().includes(buscar.toLowerCase())
  );
    
}

const columns = React.useMemo(
        () => [
          {
            Header: "Codigo de Local",
            accessor: "Codigo_Local"
          },
          {
            Header: "Nombre",
            accessor: "Nombre_local"
          },
          {
              Header: "Aplicacion",
              accessor: "Parametro"
          },
          {
              Header: "Version",
              accessor: "Nro_version"
          },
          {
              Header: "Fecha de log",
              accessor: "FechaTrans"
          },
          {
              Header: "Nº de caja",
              accessor: "Caja"
          },
          {
              Header: "Nombre de Equipo",
              accessor: "EQUIPO"
          },
          
        ],
        []
      );

    const data = React.useMemo(
        () => resultado,
        [resultado]
      )  


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
                        <Select
                        options={listadoapps}
                        onChange={buscadorselect}
                        defaultValue={{label:"Aplicativos", value:"Aplicativos"}}
                        />
                        </div>           
            <div className='inputsVersiones_hijo'>
            <input 
                    type="text"
                    value={buscar}
                    placeholder='Version'
                    onChange={buscador}
                />        
            </div>
            <div>
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
export default Versiones
    