import React,{useState,useEffect} from 'react'
import '../App.js'
import '../../src/css.css'

import {Link} from 'react-router-dom'
import loadingif from '../images/loading-32.gif'
function Ventas_Mes_Corriente(){
    
    const [Ventas_corriente, setVentas_corriente]= useState([])    
    useEffect (() => {        
            fetch(`${process.env.REACT_APP_API_PROPIOS_FRANQUICIAS}/ventas_mes_corriente`)
            .then(response => response.json())
            .then( data =>{ setVentas_corriente(data.data)} )
            .catch(error =>console.error(error))
            }, []) 
            
  
             
   
                    

     let Ventas_corriente_locales=[]

            if(Ventas_corriente.length>0)
            {
                Ventas_corriente_locales.push(Ventas_corriente)
                   
                
            }
            else{
                console.log("No hay Datos")               
            } 
 
           
console.log(Ventas_corriente_locales.length)
const loading = <img src={loadingif} className="loading"/>
   

    return (
        <div className='containerMAIN' >
        <div className='container_1'>
        <div className='principal_container'>         
        
            <h2 className='titulodash'>DashBoard Mostaza</h2>
            <div className='container_hd'>
            <div className='titulos_hd'>
                <div className='titulo_nombre_hd_ventas_mes_Corriente'><h4>Local</h4></div>
                <div className='titulo_nombre_hd_ventas_mes_Corriente'><h4>Cant. ticket Mes Corriente</h4></div>
                <div className='titulo_nombre_hd_ventas_mes_Corriente'><h4>Venta Mes Corriente</h4></div>  
                   
            </div>
            <div className='overflow'>
                {Array.from(Ventas_corriente_locales).length===0?loading:Array.from(Ventas_corriente_locales).map(function(local,i){ 
                    return      (
                    Array.from(local).map(function(locales1,i){                   
                    return <ul key={i} >                                            
                        <div className='list_container_hd'> 
                            <div className='item_nombre_hd'><li className='item_nombre_hd_local'><strong>{locales1.Local}</strong> </li></div>
                            <div className='item_nombre_hd'><li className='item_nombre_hd_nombre'><strong>{locales1.Cant_ticket_Mes_Corriente}</strong> </li></div> 
                            <div className='item_nombre_hd'><li className='item_nombre_hd_space'><strong>{locales1.Venta_Mes_Corriente}</strong> </li></div>                   
                        </div>
                    </ul>
                })    )
            })}  </div>                    
              <h2 className='volver ocultar'>
                <Link to="/"  className='volverlink_sync'>Volver al Dash Principal</Link>
                    </h2>            
                        
            </div> 
	
        </div>
	
    </div>    
    </div>    
    )
}
export default Ventas_Mes_Corriente;