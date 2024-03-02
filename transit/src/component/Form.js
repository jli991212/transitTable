import { useState } from "react";
import React from 'react';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
function Form(props) {
    const [load, setLoad] = useState("load");
    const [zone,setZone]=useState('');
    const [cageNumber,setCageNumber]=useState(0);
    const [glordNumber,setGlordNumber]=useState(0);
    const [palletNumber,setPalletNumber]=useState(0)
    const [rowData,setRowData]=useState([])
    const [colDefs, setColDefs] = useState([
        { field: "date" ,filter: true},
        { field: "loadstatus" ,filter: true,},
        { field: "zone", filter: true, floatingFilter: true },
        { field: "cage",filter: true, floatingFilter: true },
        { field: "gaylord",filter: true, floatingFilter: true },
        { field: "pallet",filter: true, floatingFilter: true },
      ]);
    const handleChange = (event) => {
        setLoad(event.target.value);
    };
    const handlesubmit=()=>{
        const data={
            date: new Date().toLocaleString(),
            loadstatus:load,
            zone:zone,
            cage:cageNumber,
            gaylord:glordNumber,
            pallet:palletNumber,
        }
        setRowData([data,...rowData]);
        setZone('');
        setCageNumber(0);
        setGlordNumber(0);
        setPalletNumber(0);
    }
    const isChecked = (value) => load === value;
    return (
        <>
        <fieldset>
            <legend>请输入转运数据:</legend>
            <div>
                <input type="radio" id="load" name="load" value="load" onChange={handleChange} checked={isChecked('load')} />
                <label for="load">装车</label>
                <input type="radio" id="unload" name="unload" value="unload" onChange={handleChange} checked={isChecked('unload')} />
                <label for="unload">卸车</label>
            </div>
            <div>
                <label>
                    From/to:
                    <select name="zone" value={zone} onChange={(e)=>setZone(e.target.value)}>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="G">G</option>
                        <option value="S">S</option>
                        <option value="PHX">PHX</option>
                        <option value="VGS">VGS</option>
                        <option value="BAY">BAY</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    铁笼/cage:
                    <input type="text" value={cageNumber} onChange={(e)=>{setCageNumber(e.target.value)}} />
                </label>
            </div>
            <div>
                <label>
                    纸箱/Gaylord:
                    <input type="text" value={glordNumber} onChange={(e)=>{setGlordNumber(e.target.value)}} />
                </label>
            </div>
            <div>
                <label>
                    板数/pallet:
                    <input type="text" value={palletNumber} onChange={(e)=>{setPalletNumber(e.target.value)}} />
                </label>
            </div>
            <div><button onClick={handlesubmit}>提交</button></div>
        </fieldset>
        <div>
            {rowData.length!==0 && 
              <div
              className="ag-theme-quartz"
              style={{ height: 500 }} 
             >
               <AgGridReact
                   rowData={rowData}
                   columnDefs={colDefs}
               />
             </div>
            }
        </div>
        </>

    );
}

export default Form;