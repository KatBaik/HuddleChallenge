import { backendAPI } from '../index';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import UtilityTable from './UtilityTable';

const HousePage = () => {
    const { id } = useParams();
    const [gas, setGas] = useState([]);
    const [electricity, setElectricity] = useState([]);
    useEffect(() => {
        axios.get(backendAPI + "gas/" + id).then(res => { setGas(res.data.data) })
            .catch(err => console.log(err));
        axios.get(backendAPI + "electricity/" + id).then(res => { setElectricity(res.data.data) })
            .catch(err => console.log(err))
    }, []);
    return (
        <div style={{ backgroundColor: "black", width: "100vw", height: "100vh" }}>
            <h1 style={{ color: "white", textAlign: "center", padding: "20px" }}>Gas</h1>
            <UtilityTable utilities={gas} />
            <h1 style={{ color: "white", textAlign: "center", padding: "20px" }}>Electricity</h1>
            <UtilityTable utilities={electricity} />

        </div>);
}

export default HousePage;