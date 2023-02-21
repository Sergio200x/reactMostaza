import React,{useState,useEffect} from 'react'
import '../App.js'
import '../../src/css.css'
import loadingif from '../images/loading-32.gif'
import {Link} from 'react-router-dom'
import Select from 'react-select'


function Versiones(){
    
    const [VersionesPRP, setVersionesPRP]= useState([]) 
    const [buscarpr,setbuscarpr]= useState("")   
    const [buscar,setbuscar]= useState("")  
    useEffect (() => {        
            fetch("http://localhost:3036/versiones")
            .then(response => response.json())
            .then( data =>{ setVersionesPRP(data.data)} )
            .catch(error =>console.error(error))
            }, []) 

    const [VersionesFRP, setVersionesFRP]= useState([])    
    useEffect (() => {        
            fetch("http://localhost:3035/versiones")
            .then(response => response.json())
            .then( data =>{ setVersionesFRP(data.data)} )
            .catch(error =>console.error(error))
            }, [])                 
      



const buscador = (version)=>{
    setbuscar(version.target.value)
}
const buscadorp = (buscarpp)=>{
    setbuscarpr(buscarpp.target.value)   
}
let versiones=[]
if(VersionesPRP.length>0||VersionesFRP.length>0)
{
    versiones.push(VersionesPRP)
    
    versiones.push(VersionesFRP)
    
}

let resultado=[]
var contador=0
if(buscar.length===0 && buscarpr.length===0)
    {
        resultado=[]
        
    }
    else if (buscarpr.length===0 && buscar.length!==0){
        resultado=[]
    }
    else if (buscarpr.length!==0 && buscar.length===0)
    {
      
    }
    else{
        resultado=versiones.map((vers)=> 
        vers.filter((dato,i)=>       
        dato.Nro_version.toLowerCase()!==(buscar.toLocaleLowerCase())&& dato.Parametro.toLowerCase()===(buscarpr.toLocaleLowerCase())) 
        )    
       
    }
    let listadoapps=[
    {label:"Actualizadatos", value:{buscarpr}},
    {label:"AppMtz", value:{buscarpr}},
    {label:"Centralizador", value:{buscarpr}},
    {label:"CentralizadorComanda", value:{buscarpr}},
    {label:"DescargaLocal", value:{buscarpr}},
    {label:"DualpointCaja", value:{buscarpr}},
    {label:"Dualpointllamador", value:{buscarpr}},
    {label:"Informes", value:{buscarpr}},
    {label:"Informes", value:{buscarpr}},
    {label:"Meli", value:{buscarpr}},
    {label:"OCX", value:{buscarpr}},
    {label:"PantallaComanda", value:{buscarpr}},
    {label:"Peya", value:{buscarpr}},
    {label:"Profit", value:{buscarpr}},
    {label:"Rappi", value:{buscarpr}},
    {label:"totem.exe", value:{buscarpr}}]




return (
    <div className='container_Versi'>
        <div className='principal_container_Versi'>         
    
        <h2 className='titulo_Versi'>DashBoard Cinet</h2>
        <div className='container_Versi'>
            
        <div className='inputs_Versi'>
        
            <div className='inputs_cont_Versi'>
            <input
                    type="text"
                    value={buscarpr}
                    placeholder='Aplicacion'
                    onChange={buscadorp}
                />    
                
            </div>
            
              
           
            <div className='inputs_cont_Versi'>
            <input 
                    type="text"
                    value={buscar}
                    placeholder='Version'
                    onChange={buscador}
                />        
            </div>
            </div>
            <div className='titulos_Versi'>
            <div className='titulo_numeros_individual_Versi'><h4 className='h4_titulo_Versi'>Local</h4></div>            
            <div className='titulo_numeros_individual_Versi_nomlocal'><h4 className='h4_titulo_Versi'> Nombre del local</h4></div>
            <div className='titulo_numeros_individual_Versi'><h4 className='h4_titulo_Versi'>App</h4></div>
            <div className='titulo_numeros_individual_Versi'><h4 className='h4_titulo_Versi'>Nro de Version</h4></div>
            <div className='titulo_numeros_individual_Versi'><h4 className='h4_titulo_Versi'>Fecha</h4></div>
            <div className='titulo_numeros_individual_Versi'><h4 className='h4_titulo_Versi'>Equipo</h4></div>
            <div className='titulo_numeros_individual_Versi'><h4 className='h4_titulo_Versi'>Caja/Nro equipo</h4></div>        
           
            </div>
           
               <div className='container_ul'> 
        {resultado.length===0? <div className='texto'>
        <h2><strong> Por favor Complete la Version y el aplicativo a Buscar</strong></h2>
        </div>:resultado.map((lista,i)=>{
         return  lista.map((list,i)=>{
            return <ul key={i}  > 
              <div className='list_container_v_Versi'> 
             <div className='item_nombre_hd_Versi_clocal'><li className='item_nombre_v_local_Versi'><strong>{list.Codigo_Local}</strong></li></div>
              <div className='item_nombre_hd_Versi_nomlocal'><li className='item_nombre_v_local_Versi'><strong>{list.Nombre_local}</strong></li></div>
              <div className='item_nombre_hd_Versi'><li className='item_nombre_v_local_Versi'><strong>{list.Parametro}</strong></li></div>
              <div className='item_nombre_hd_Versi_nro'><li className='item_nombre_v_local_Versi'><strong>{list.Nro_version}</strong></li></div>
              <div className='item_nombre_hd_Versi'><li className='item_nombre_v_local_Versi'><strong>{list.FechaTrans}</strong></li></div>
              <div className='item_nombre_hd_Versi_equipo'><li className='item_nombre_v_local_Versi'><strong>{list.EQUIPO}</strong></li></div>
              <div className='item_nombre_hd_Versi_caja'><li className='item_nombre_v_local_Versi'><strong>{list.Caja}</strong></li></div>      
              </div>   
            </ul>
         })
         
            })}
            </div>
           
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
export default Versiones
    