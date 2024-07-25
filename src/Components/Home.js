import React,{useState,useEffect} from 'react'
import '../App.js'
import '../../src/css.css'
import loadingif from '../images/loading-32.gif'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


import {Link,Route,Switch,BrowserRouter,Routes} from 'react-router-dom'
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap';
link.rel = 'stylesheet';
function App(){
   
    const loading = <img src={loadingif} className="loading"/>
 

    return (
       
        <div className=''>         
        
            <h1 className='tituloHome'>Panel de monitoreo</h1>
            <div className="mb-2">                                
                <> 
                
                <Link to="/promos" ><Button className='butonboostrap'variant="primary" size="lg" style={{backgroundColor:'whitesmoke',borderColor:'whitesmoke', width:'300px', height:'150px', marginRight:'20px', fontSize:'35px', color:'red', fontFamily:'Poppins' }}>Promos</Button>{''}</Link>
                        
                <Link to="/precios"> <Button className='butonboostrap'variant="primary" style={{backgroundColor:'whitesmoke',borderColor:'whitesmoke', width:'300px', height:'150px', marginRight:'20px', fontSize:'35px', color:'red', fontFamily:'Poppins'}}>
                Articulos y precios</Button>{' '}</Link>
                    
                 < Link to="/space"><Button className='butonboostrap'variant="primary" style={{backgroundColor:'whitesmoke',borderColor:'whitesmoke', width:'300px', height:'150px', marginRight:'20px', fontSize:'35px', color:'red', fontFamily:'Poppins'}}>
                 Dashboard Mesa</Button>{' '}</Link>
                  
                </>
            </div>  
   
    </div>        
    )
    
}
export default App;