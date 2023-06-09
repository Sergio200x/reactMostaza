import './App.css';
import Home from './Components/Home.js';
import Semana_anterior from './Components/Semana_Anterior.js'
import Sync from './Components/Locales_Sync'
import HD_Space from './Components/HD_Space'
import Database_Space from './Components/Database_Space'
import Log_Space  from './Components/Log_Space';
import Versiones  from './Components/Versiones';
import PreciosYarticulos from './Components/Consulta_precios_y_articulos';
import {Route,BrowserRouter,Routes} from 'react-router-dom'
 


function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Routes>
        <Route path="/" exact={true} element={<Home/>}/>
        <Route path="/semanaAnterior" exact={true} element={<Semana_anterior/>}/>
        <Route path="/Sync" exact={true} element={<Sync/>}/>      
        <Route path="/HD_SPACE" exact={true} element={<HD_Space/>}/> 
        <Route path="/DATABASE_SPACE" exact={true} element={<Database_Space/>}/> 
        <Route path="/LOG_SPACE" exact={true} element={<Log_Space/>}/> 
        <Route path="/Versiones" exact={true} element={<Versiones/>}/>
        <Route path="/precios" exact={true} element={<PreciosYarticulos/>}/>
        

     </Routes>  
   </div>
   </BrowserRouter>
  );
  
}

export default App;
