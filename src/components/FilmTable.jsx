import React from 'react';

const FilmTable = ({ searchResults, handleRowClick }) => {
  return (
    <table className="table-auto table py-3 mx-3" style={{ height: '500px', width: '800px' }}>
      <tbody className="p-1">
        {searchResults.map((film, index) => (
          <tr key={film.title} onClick={() => handleRowClick(film)} role="button">
            <td>{index + 1}</td>
            <td>{film.title}</td>
            <td>{film.director}</td>
            <td>{film.producer}</td>
            <td>{film.release_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FilmTable;
