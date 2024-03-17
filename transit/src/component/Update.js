import React, { useState, useEffect } from 'react';
import app from "../firebase";
import { getDatabase, ref, set, get,update } from "firebase/database";
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
function Update() {

    const navigate = useNavigate();
    const {  transitCricle,firebaseId } = useParams();


    // const [load, setLoad] = useState("load");
    const [zone, setZone] = useState('');
    const [truckSize,setTruckSize]=useState('');
    // const [company,setCompany]=useState('');
    const [cageNumber, setCageNumber] = useState(0);
    const [gaylordNumber, setgaylordNumber] = useState(0);
    // const [palletNumber, setPalletNumber] = useState(0);
    const [person,setPerson]=useState('');

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db,`TransitData/${transitCricle}/${firebaseId}`);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const targetObject = snapshot.val();
                // setLoad(targetObject.load);
                setTruckSize(targetObject.truckSize);
                // setCompany(targetObject.company);
                setZone(targetObject.zone);
                setCageNumber(targetObject.cage);
                setgaylordNumber(targetObject.gaylord);
                // setPalletNumber(targetObject.pallet);
                setPerson(targetObject.person);
            } else {
                alert("error");
            }
        }
        fetchData();
    }, [firebaseId])

    // const handleChange = (event) => {
    //     setLoad(event.target.value);
    // };
    // const isChecked = (value) => load === value;

    const overwriteData = async () => {
        const db = getDatabase(app);
        const newDocRef = ref(db,`TransitData/${transitCricle}/${firebaseId}`);
        update(newDocRef, {
           // date: new Date().toLocaleString(),
            zone:zone?zone:'A',
            trucksize:truckSize?truckSize:'26',
            cage:cageNumber?cageNumber:0,
            gaylord:gaylordNumber?gaylordNumber:0,
            person:person?person:'',
            transitcricle:transitCricle,
        }).then(() => {
            alert("data updated successfully")
        }).catch((error) => {
            alert("error: ", error.message);
        })
        navigate('/read')
    }


    return (
        <>
        <fieldset>
            <legend>请输入转运数据:</legend>
            {/* <div>
                <input type="radio" id="load" name="load" value="load" onChange={handleChange} checked={isChecked('load')} />
                <label for="load">装车</label>
                <input type="radio" id="unload" name="unload" value="unload" onChange={handleChange} checked={isChecked('unload')} />
                <label for="unload">卸车</label>
            </div> */}
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
            {/* <div>
                <label>
                    承包商/company
                    <select name="company" value={company} onChange={(e)=>setCompany(e.target.value)}>
                    <option value="UniW2">uni-w2</option>
                        <option value="JS">j&s</option>
                        <option value="Jason">jason</option>
                        <option value="TG">TG</option>
                        </select>
                </label>
            </div> */}
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
            {/* <div>
                <label>
                    板数/pallet:
                    <input type="text" value={palletNumber} onChange={(e)=>{setPalletNumber(e.target.value)}} />
                </label>
            </div> */}
            <div>
                <label>
                    登记人/load person:
                    <input type="text" value={person} onChange={(e)=>{setPerson(e.target.value)}} />
                </label>
            </div>
            <div><button onClick={overwriteData}>提交</button></div>
            <div><button onClick={()=>{navigate('/read')}}>取消</button></div>
        </fieldset>
        </>
    )
}

export default Update;