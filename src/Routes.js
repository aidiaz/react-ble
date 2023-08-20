import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import DevicePage from './pages/DevicePage';
import Bluetooth from './components/Bluetooth';

function checkSubscriptions (subs) {
    return (subs.length === 0 ? (false):(true))
}

export const PageRoutes = () => {
    const [subscribedCharacteristics, setCharacteristics] = useState([]);
    const [data, setData] = useState({});
    const [rawData, setRawData] = useState({});

    return (
        <Router>
            <Routes>
                <Route path="/" element={!checkSubscriptions(subscribedCharacteristics) ? <Bluetooth setCharacteristics={setCharacteristics} setData={setData} setRawData={setRawData} /> : <Navigate replace to={"device"} />}>
                </Route>
                <Route path="/device" element={checkSubscriptions(subscribedCharacteristics) ? <DevicePage subscription={subscribedCharacteristics} data={data} rawData={rawData}/> : <Navigate replace to={"/"} />}>
                </Route>
            </Routes>
        </Router >
    );
}