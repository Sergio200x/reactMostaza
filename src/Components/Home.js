import React,{useState,useEffect} from 'react'
import '../App.js'
import '../../src/css.css'
import flecha_media from '../images/flecha-centro.png'
import flecha_alta from '../images/flecha-subiendo.png'
import flecha_baja from '../images/flecha-bajando.png'
import estrella from '../images/estrella.png'
import rey from '../images/rey1.png'
import loadingif from '../images/loading-32.gif'

import flecha_subiendo from '../images/flecha-diagonal.png'

import {Link,Route,Switch,BrowserRouter,Routes} from 'react-router-dom'

function App(){
   
     
   


    

    const loading = <img src={loadingif} className="loading"/>
 

    return (
        <div className='containerMAIN' >
        <div className='container_1'>
        <div className='principal_container'>         
        
            <h2 className='titulo'>Dashboard Mostaza</h2>
           <div>{loading}</div>

                <div className='container_volver'>                           
            
                    <h2 className='volver'>
                <Link to="/Sync"  className='volverlink'>No Sync</Link>
                </h2>
                <h2 className='volver'>
                <Link to="/HD_SPACE"  className='volverlink'>Espacio en Disco</Link>
                    </h2>
                    <h2 className='volver'>
                <Link to="/DATABASE_SPACE"  className='volverlink'>Espacio de BBDD</Link>
                    </h2> 
                    <h2 className='volver'>
                <Link to="/LOG_SPACE"  className='volverlink'>Espacio LOG BBDD</Link>
                    </h2>  
                    <h2 className='volver'>
                <Link to="/Versiones"  className='volverlink'>Versiones</Link>
                    </h2>
                    <h2 className='volver'>
                <Link to="/precios"  className='volverlink'>Precios y Art.</Link>
                    </h2>                     
                </div>       
            </div> 

        </div>
	<div>
			
	</div>
   
    </div>        
    )
}
export default App;