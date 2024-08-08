import React, { useState, useEffect } from 'react';
import app from "../firebase";
import { getDatabase, ref, get, remove, orderByChild, startAt, endAt, orderByKey, query } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Button } from '@mui/material';
import { DataGrid,GridToolbarContainer,GridToolbarExport } from '@mui/x-data-grid';

import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
}
function Read() {
  const navigate = useNavigate();
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  let [transitArr, settransitArr] = useState([]);
  const [colDefs, setColDefs] = useState([
    
      { field: 'formatedId', headerName: 'tranit reference', width: 200 },
      { field: 'date', headerName: 'Date', width: 200 },
      // { field: 'loadstatus', headerName: 'Type', width: 70 },
      { field: 'trucksize', headerName: 'truck size', width: 70 },
      // { field: 'company', headerName: 'company', width: 70 },
      { field: 'zone', headerName: 'from/to', width: 70 },
      { field: 'cage', headerName: 'number of cage', width: 70 },
      { field: 'gaylord', headerName: 'number of gaylord', width: 70 },
      // { field: 'pallet', headerName: 'number of pallet', width: 70 },
      { field: 'person', headerName: 'loading person', width: 100 },
      { field: 'note', headerName: 'note', width: 200 },
      { field: 'transitcricle', headerName: 'transit cricle', width: 200 },
      {
        field: 'actions',
        headerName: 'Actions',
        description: 'Actions column.',
        sortable: false,
        width: 160,
        renderCell: (params) => {
          return (
            <>  
            <Button
            onClick={() => navigate(`/update/${params.row.transitcricle}/${params.row.transitID}`)}
            variant="contained"
            >
              Update
            </Button>
            <Button
              onClick={() => deleteRow(params.row.transitID, params.row.transitcricle)}
              variant="contained"
            >
              Delete
            </Button>
            </>
          );
        },
      },

      
  ]);
  function getRowId(row) {
    return row.transitID;
  }

  const getDateRange = (firstDate, lastDate) => {
    if (
      moment(firstDate, "YYYY-MM-DD").isSame(
        moment(lastDate, "YYYY-MM-DD"),
        "day"
      )
    )
      return [lastDate];
    let date = firstDate;
    const dates = [date];
    do {
      date = moment(date).add(1, "day");
      dates.push(date.format("YYYY-MM-DD"));
    } while (moment(date).isBefore(lastDate));
    return dates;
  };
  const fetchData = async () => {
    const db = getDatabase(app);
    try {
      // Construct a reference to the desired date range
      // const dateRef = ref(db,'TransitData');
      // const query = orderByKey('date').startAt(date).endAt(endDate);
      const dbRef = query(ref(db, 'TransitData/'), orderByKey(), startAt(date), endAt(endDate))

      // Fetch the data
      const snapshot = await get(dbRef);

      // Extract the data from the snapshot
      const data = snapshot.val();

      // Update the state with the retrieved data
      if (data) {
        const temporaryArray = Object.keys(data).reduce((acc, item) => {
          Object.keys(data[item]).map((ids) => {
            acc.push({
              transitID: ids,
              formatedId:ids.slice(1),
              ...data[item][ids]
            })
          })
          return acc
        }, [])
        console.log(temporaryArray)
        settransitArr(temporaryArray);
      }
    } catch (error) {
      alert('error fetching')
      console.error('Error fetching data:', error);
    }
    // const dateList=getDateRange(date,endDate);
    // const dbRef = ref(db, `TransitData/${date}`);
    // const snapshot = await get(dbRef);
    // if (snapshot.exists()) {

    //   const myData = snapshot.val();

    //   settransitArr(temporaryArray);
    // } else {
    //   alert("error");
    // }
  }
  const deleteRow = async (ids, dates) => {
    const db = getDatabase(app);
    const dbRef = ref(db, `TransitData/${dates}/${ids}`);
    await remove(dbRef);
    navigate("/")
  }

  return (
    <div>
      <h1>READ</h1>
      <label>from:
        <input type="date" value={date} placeholder='YYYY-MM-DD' onChange={(e) => { setDate(e.target.value) }} min='01-01-2020' max='12-31-2030' />
      </label>
      <label>To:
        <input type="date" value={endDate} placeholder='YYYY-MM-DD' onChange={(e) => { setEndDate(e.target.value) }} min='01-01-2020' max='12-31-2030' />
      </label>
      <button onClick={fetchData}> Display Data </button>
      <div
      >
        {/* <table>
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
                {item.pallet}
              </td>
              <td >
                {item.transitcricle}
              </td>
              <td>

                <button className='button1' onClick={() => navigate(`/update/${item.transitcricle}/${item.transitID}`)}>UPDATE</button>
                <button className='button1' onClick={() => deleteRow(item.transitID,item.transitcricle)}>DELETE</button>
              </td>

            </tr>

          ))}
        </table> */}

      </div>
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <DataGrid
        getRowId={getRowId}
        rows={transitArr}
        columns={colDefs}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        slots={{
          toolbar: CustomToolbar,
        }}
        
      />
      </div>
      <button className='button1' onClick={() => navigate("/")}>ADD data</button>
    </div>
  )
}

export default Read