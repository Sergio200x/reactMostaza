import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import * as XLSX from 'xlsx';
import '../App.js';
import '../../src/css.css';
import loadingif from '../images/loading-32.gif';

function Deli() {
  const [dashDeli, setdashDeli] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_PROPIOS_FRANQUICIAS}/deli`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && Array.isArray(data.locales)) {
          setdashDeli(data.locales);
        } else {
          setError('Invalid data structure');
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = dashDeli.filter(local =>
        local.codLocal.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(results);
    } else {
      setFilteredData([]);
    }
  }, [searchTerm, dashDeli]);

  const columns = useMemo(
    () => [
      {
        Header: 'Local',
        accessor: 'codLocal',
      },
      {
        Header: 'User ID',
        accessor: 'userID',
      },
      {
        Header: 'User Pya',
        accessor: 'userPya',
      },
      {
        Header: 'User MP',
        accessor: 'userMP',
      },
      {
        Header: 'Última Conexión',
        accessor: 'ultimaConexion',
      },
      {
        Header: 'Estado',
        accessor: 'estado',
      },
    ],
    []
  );

  const data = useMemo(() => filteredData, [filteredData]);

  const tableInstance = useTable({ columns, data }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dashDeli);
    XLSX.utils.book_append_sheet(wb, ws, 'Estado Tiendas');
    XLSX.writeFile(wb, 'Estado_Tiendas.xlsx');
  };

  if (isLoading) {
    return <div className="loading">Cargando datos...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className='deli-container'>
      <div><h1 className='tituloDelis' style={{"margin": 'auto', "color": 'whitesmoke', "margin-top": '2%', "margin-bottom": '2%'}}>Locales</h1></div>
      <br></br>
      <div className='contenedor'>
        <div className='buscadorDeli'>
          <input
            type="text"
            placeholder="Buscar código de local"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <br />
        {searchTerm === '' ? (
          <div><t2 style={{color:'whitesmoke', fontSize:'30px', "display":'show'}}>Escribe el código del local para ver el estado</t2></div>
        ) : filteredData.length === 0 ? (
          'No se encontraron resultados'
        ) : (
          <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={{
                        borderBottom: 'solid 3px red',
                        background: 'red',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '130%',
                        padding: '5px',
                      }}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    style={{
                      backgroundColor: 'whitesmoke',
                    }}
                  >
                    {row.cells.map(cell => (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: '10px',
                          border: 'solid 1px gray',
                          background: 'whitesmoke',
                          color:
                            cell.column.id === 'estado'
                              ? cell.value === 'activo'
                                ? '#00f900'
                                : cell.value === 'inactivo'
                                ? '#ff0000'
                                : 'black'
                              : 'black',
                          fontSize: '100%',
                          fontWeight: 'bolder',
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <br />
        <button onClick={exportToExcel} className="btn btn-success">Exportar todo a Excel</button>
      </div>
    </div>
  );
}

export default Deli;
