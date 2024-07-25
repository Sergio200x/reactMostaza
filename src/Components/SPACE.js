import React,{useState,useEffect} from 'react'
import '../App.js'
import '../../src/css.css'
import flecha_media from '../images/flecha-centro.png'
import flecha_alta from '../images/flecha-subiendo.png'
import flecha_baja from '../images/flecha-bajando.png'
import estrella from '../images/estrella.png'
import rey from '../images/rey1.png'
import loadingif from '../images/loading-32.gif'
import HD_Space from './HD_Space.js'
import Database_Space from './Database_Space.js'
import Dbspace from './databaseSpace.js'

import {Link,Route,Switch,BrowserRouter,Routes} from 'react-router-dom'
import Ventas from './ventas.js'

function Space(){
   
          

const loading = <img src={loadingif} className="loading"/>
 

    return (
      
        <div className='dash1'>
        <div className='dash2'>
        <div className='dash3'>    
        <Ventas/>
        </div>
        <div className='dash4'>   
        <Dbspace /> 
        </div>
        </div>
    </div>          
    )

}
export default Space;

