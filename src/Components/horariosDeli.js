import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import * as XLSX from 'xlsx';
import '../App.js';
import '../../src/css.css';
import loadingif from '../images/loading-32.gif';

function HorariosDeli() {
  const [dashDeli, setdashDeli] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_PROPIOS_FRANQUICIAS}/horariosDeli`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && Array.isArray(data.locales.horariosPorLocal)) {
          const transformedData = data.locales.horariosPorLocal.flatMap(local =>
            local.horarios.map(horario => ({
              codLocal: local.codLocal,
              dia: horario.dia,
              desde: horario.desde,
              hasta: horario.hasta,
            }))
          );
          setdashDeli(transformedData);
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
        Header: 'Dia',
        accessor: 'dia',
        Cell: ({ value }) => {
          const daysOfWeek = {
            '1': 'Lunes',
            '2': 'Martes',
            '3': 'Miércoles',
            '4': 'Jueves',
            '5': 'Viernes',
            '6': 'Sábado',
            '7': 'Domingo'
          };
          return daysOfWeek[value] || value;
        }
      },
      {
        Header: 'Desde',
        accessor: 'desde',
      },
      {
        Header: 'Hasta',
        accessor: 'hasta',
      }
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
    const ws = XLSX.utils.json_to_sheet(dashDeli); // Exporta todos los horarios
    XLSX.utils.book_append_sheet(wb, ws, 'Deli Data');
    XLSX.writeFile(wb, 'DeliData.xlsx');
  };

  if (isLoading) {
    return <div className="loading">Cargando datos...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className='deli-containerrr' style={{"textAlign":'center'}}>
      <div><h1 className='tituloDelis' style={{"margin": 'auto', "color": 'whitesmoke', "margin-top": '2%', "margin-bottom": '2%'}}>Horarios Deli</h1></div>
      <div className='contenedor'>
        <div> <t2 style={{color:'whitesmoke', fontSize:'30px', "display":'none'}}>Escribe el código del local para ver los horarios</t2>
              
             </div>
              <div className='buscadorHorarios'>
          <input
            type="text"
            placeholder="Buscar código de local"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div> 
        <br />
        <div className='horariosgrid' style={{"textAlign": '-webkit-center'}} >
          {searchTerm === '' ? (
            <div> <t2 style={{color:'whitesmoke', fontSize:'30px', "display":'show'}}>Escribe el código del local para ver los horarios</t2>
            <br />
            <br /></div>
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
                            width: '10px',
                            padding: '10px',
                            border: 'solid 1px gray',
                            background: 'whitesmoke',
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
        </div>
        <br />
      
        <button onClick={exportToExcel} class="btn btn-success">Exportar todo a Excel</button>
        
      </div>
      <br />
    </div>
  );
}

export default HorariosDeli;
