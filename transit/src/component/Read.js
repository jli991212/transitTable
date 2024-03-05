import React, { useState, useEffect } from 'react';
import app from "../firebase";
import { getDatabase, ref, get,remove } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
function Read() {
  const navigate = useNavigate();
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  let [transitArr, settransitArr] = useState([]);
  const [colDefs, setColDefs] = useState([
    { field: "date" },
    { field: "loadstatus" },
    { field: "zone" },
    { field: "cage" },
    { field: "gaylord" },
    { field: "pallet" },
    { field: "transitcricle" },
  ]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, `TransitData/${date}`);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {

      const myData = snapshot.val();
      const temporaryArray = Object.keys(myData).map(myFireId => {
        return {
          ...myData[myFireId],
          transitID: myFireId
        }
      })
      settransitArr(temporaryArray);
    } else {
      alert("error");
    }
  }
  const deleteFruit = async (ids) => {
    console.log(ids)
    const db = getDatabase(app);
    const dbRef = ref(db, `TransitData/${date}/${ids}` );
    await remove(dbRef);
    window.location.reload();
  }

  return (
    <div>
      <h1>READ</h1>
      <input type="date" value={date} placeholder='YYYY-MM-DD' onChange={(e) => { setDate(e.target.value) }} min='01-01-2020' max='12-31-2030' />
      <button onClick={fetchData}> Display Data </button>
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <table>
          <tr><th>date
          </th>
            <th>loadstatus</th>
            <th>zone</th>
            <th>cage</th>
            <th>gaylord</th>
            <th>pallet</th>
            <th>transit Circle</th>
          </tr>
          {transitArr.map((item, index) => (
            <tr key={index}>
              <td >
                {item.date}
              </td>
              <td >
                {item.loadstatus}
              </td>
              <td >
                {item.zone}
              </td>
              <td >
                {item.cage}
              </td>
              <td >
                {item.gaylord}
              </td>
              <td >
                {item.palllet}
              </td>
              <td >
                {item.transitcricle}
              </td>
              <td>
                
                <button className='button1' onClick={() => navigate(`/update/${item.transitID}`)}>UPDATE</button>
                <button className='button1' onClick={() => deleteFruit(item.transitID)}>DELETE</button>
              </td>

            </tr>

          ))}
        </table>
      </div>
      <button className='button1' onClick={() => navigate("/")}>ADD data</button>
    </div>
  )
}

export default Read