import React from "react";
import './Table.css';
import numeral from 'numeral';
import {Context} from '../store/context/AppContext';

function Table() {
   const {tableData} = React.useContext(Context);
  return (
    <div className="table">
      {tableData.map(({country, cases},index) => (
        <tr key={index}>
          <td> {country}</td>
         <td> 
             <strong>{numeral(cases).format("0,0")}</strong>
         </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
