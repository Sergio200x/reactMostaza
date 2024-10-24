import './App.css';
import Home from './Components/Home.js';
import Semana_anterior from './Components/Semana_Anterior.js'
import Sync from './Components/Locales_Sync'
import HD_Space from './Components/HD_Space'
import Database_Space from './Components/Database_Space'
import Log_Space  from './Components/Log_Space';
import Ventas_CorrienteMes  from './Components/Ventas_Mes_Corriente.js';
import Versiones  from './Components/Versiones';
import VersionesProductivas  from './Components/VersionesProductivas';
import PreciosYarticulos from './Components/Consulta_precios_y_articulos';
import {Route,BrowserRouter,Routes} from 'react-router-dom'
import SPACE from './Components/SPACE.js'; 
import Promos from './Components/promos.js'; 
import Ventas from './Components/ventas.js'; 
import Dbspace from './Components/databaseSpace.js'; 
import Deli from './Components/Delivery.js'
import Login from './Components/LogIn.js'
import Horarios from './Components/horariosDeli.js'

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
        <Route path="/Versiones_productivas" exact={true} element={<VersionesProductivas/>}/>
        <Route path="/Ventas_Mes_Corriente" exact={true} element={<Ventas_CorrienteMes/>}/>
        <Route path="/promos" exact={true} element={<Promos/>}/>
        <Route path="/space" exact={true} element={<SPACE/>}/>
        <Route path="/ventas" exact={true} element={<Ventas/>}/>
        <Route path="/dbspace" exact={true} element={<Dbspace/>}/>     
        <Route path="/login" exact={true} element={<Login/>}/>
        <Route path="/horarios" exact={true} element={<Horarios/>}/>
     

     </Routes>  
   </div>
   </BrowserRouter>
  );
  
}

export default App;
