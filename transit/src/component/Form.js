import { useState } from "react";
import React from 'react';
import app from '../firebase';
import { useNavigate } from 'react-router-dom';

import { getDatabase, ref, set, push } from "firebase/database";
import moment from 'moment';
function Form(props) {
    const navigate = useNavigate();

    const [load, setLoad] = useState("load");
    const [truckSize,setTruckSize]=useState('');
    const [company,setCompany]=useState('');
    const [zone,setZone]=useState('');
    const [cageNumber,setCageNumber]=useState(0);
    const [gaylordNumber,setgaylordNumber]=useState(0);
    const [palletNumber,setPalletNumber]=useState(0);
    const [transitCricle,setTransitCricle]=useState( moment(new Date()).format('YYYY-MM-DD'));
    const handleChange = (event) => {
        setLoad(event.target.value);
    };
    const isChecked = (value) => load === value;
    const saveData = async () => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, `TransitData/${transitCricle}`));
        console.log(transitCricle)
        set(newDocRef, {
            date: new Date().toLocaleString(),
            loadstatus:load ?load:'load',
            trucksize:truckSize?truckSize:'26',
            company:company?company:'uniW2',
            zone:zone?zone:'A',
            cage:cageNumber?cageNumber:0,
            gaylord:gaylordNumber?gaylordNumber:0,
            pallet:palletNumber?palletNumber:0,
            transitcricle:transitCricle,
        }).then( () => {
          alert(`data ${newDocRef._path.pieces_[2]} saved successfully`)
        }).catch((error) => {
          alert("error: ", error.message);
        })
        navigate('/read')
      }
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
                    卡车类型/Truck size
                    <select name="trucksize" value={truckSize} onChange={(e)=>setTruckSize(e.target.value)}>
                    <option value="26">26</option>
                        <option value="53">53</option>
                        </select>
                </label>
            </div>
            <div>
                <label>
                    承包商/company
                    <select name="company" value={company} onChange={(e)=>setCompany(e.target.value)}>
                    <option value="UniW2">uni-w2</option>
                        <option value="JS">j&s</option>
                        <option value="Jason">jason</option>
                        <option value="TG">TG</option>
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
                    <input type="text" value={gaylordNumber} onChange={(e)=>{setgaylordNumber(e.target.value)}} />
                </label>
            </div>
            <div>
                <label>
                    板数/pallet:
                    <input type="text" value={palletNumber} onChange={(e)=>{setPalletNumber(e.target.value)}} />
                </label>
            </div>
            <div>
                <label>
                    转运周期/transit Cricle:
                    <input type="date" value={transitCricle} placeholder='YYYY-MM-DD'onChange={(e)=>{setTransitCricle(e.target.value)}} min='01-01-2020' max='12-31-2030'/>
                </label>
            </div>
            <div><button onClick={saveData}>提交</button></div>
            <div><button onClick={()=>{navigate('/read')}}>取消</button></div>
        </fieldset>
        </>

    );
}

export default Form;