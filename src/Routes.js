import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ConnectPage from './pages/ConnectPage';
import DevicePage from './pages/DevicePage';

let tick = 0;
export const PageRoutes = () => {

    const [device, setDevice] = useState('');
    const [characteristic, setCharacteristic] = useState([]);
    const [server, setServer] = useState('');
    const [service, setService] = useState('');
    const [data, setData] = useState([]);



    const readDataPeriodically = async () => {
        try {
            if (server.connected === true) {
                // Assuming device, service, and characteristic are already set up
                const value = await characteristic.readValue();
                // Assuming the received value is a DataView
                const dataView = new DataView(value.buffer);
                const uint32Value = dataView.getUint32(0, true); // Assuming little-endian encoding

                var dict = {
                    name: "",
                    value: (uint32Value - 2147483648) * 180 / 2147483648,

                };
                setData(dict);
            }

        } catch (error) {
            console.error('Error reading data from BLE device:', error);
        }
    };

    // Start reading data every 5 seconds (adjust the interval as needed)
    useEffect(() => {
        const intervalId = setInterval(readDataPeriodically, 1);

        return () => {
            clearInterval(intervalId);
        };
    });

    return (
        <Router>
            <Routes>
                {
                    <Route path="/connect" element={!server.connected ? <ConnectPage
                        setDevice={setDevice}
                        setCharacteristic={setCharacteristic}
                        setServer={setServer}
                        setService={setService} /> : <Navigate replace to={"/device"} />}>
                    </Route>
                }
                <Route path="/device" element={server.connected ? <DevicePage
                    device={device}
                    characteristic={characteristic}
                    server={server}
                    service={service}
                    data={data} /> : <Navigate replace to={"/connect"} />} >
                </Route>
            </Routes>
        </Router>
    );
}