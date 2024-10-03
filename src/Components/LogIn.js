import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.js';
import '../../src/css.css';
import { MDBContainer, MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import Delivery from './Delivery.js'; // Importa el componente delivery.js

function Login() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nueva bandera para manejar la renderización

  const handleLogin = () => {
    if (usuario.trim() === '' || clave.trim() === '') {
      setError('Por favor ingrese ambos campos.');
      return;
    }

    fetch(`${process.env.REACT_APP_API_PROPIOS_FRANQUICIAS}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuario, clave })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error en la solicitud.');
      })
      .then(data => {
        if (data.info && data.info.status === 200) {
          setIsLoggedIn(true); // Cambia el estado para indicar que el usuario está autenticado
        } else {
          setError(data.info ? data.info.message : 'Usuario o contraseña incorrectos');
        }
      })
      .catch(error => {
        console.error(error);
        setError('Error en la autenticación. Por favor, intente de nuevo.');
      });
  };

  if (isLoggedIn) {
    return <Delivery />; // Renderiza el componente delivery.js si el usuario está autenticado
  }

  return (
    <div className='Login'>
        <h3 className='titulodash'>Acceso Dash Delivery</h3>
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50 login">
      <MDBInput
        wrapperClass='mb-4'
         placeholder='Usuario'
        id='form1'
        type='text'
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <MDBInput
        wrapperClass='mb-4'
         placeholder='Contraseña'
        id='form2'
        type='password'
        value={clave}
        onChange={(e) => setClave(e.target.value)}
      />

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar mensaje de error */}

      <MDBBtn className="mb-4" onClick={handleLogin}>Acceder</MDBBtn>

        <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='twitter' size="sm" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='google' size="sm" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='github' size="sm" />
          </MDBBtn>
        </div>   
    </MDBContainer>
    </div>
  );
}

export default Login;
