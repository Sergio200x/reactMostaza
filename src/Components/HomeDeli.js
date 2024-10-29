import React,{useState,useEffect} from 'react'
import '../App.js'
import '../../src/css.css'
import loadingif from '../images/loading-32.gif'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Delivery from './Delivery.js'
import HorariosDeli from './horariosDeli.js'


import {Link,Route,Switch,BrowserRouter,Routes} from 'react-router-dom'
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
link.rel = 'stylesheet';
function HomeDeli(){
   
    const loading = <img src={loadingif} className="loading"/>
 

    return (
       
        <div className='cosas'>         
        
            <h1 className='tituloHome'>Delivery</h1>
            <div className="mb-2"> 
                <div className='DELI1'> 
                    <div className='delihijo1'>                           
              <Delivery></Delivery>
              </div>
              <div  className='delihijo2'>
              <HorariosDeli></HorariosDeli>
              </div> 
              </div> 
            </div>  
   
    </div>        
    )
    
}
export default HomeDeli;