import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ConnectPage from './pages/ConnectPage';


export const PageRoutes = () => {

    return (
        <Router>
            <Routes>
                <Route path="/connect" element={<ConnectPage />}>
                </Route>

                {/* <Route path="/connect" element={server_connected ? <ConnectPage route_data={get_route_data}
                    setDevice={setDevice} /> : <Navigate replace to={"/device"} />}>
                </Route>

                <Route path="/device" element={server_connected ? <DevicePage route_data={get_route_data}
                    device={device}
                    data={data} /> : <Navigate replace to={"/connect"} />} >
                </Route> */}
            </Routes>
        </Router >
    );
}