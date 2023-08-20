import { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import Cube from "../components/Cube.js";
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer
} from 'recharts';

import './DevicePage.css'

export function DevicePage({ data, rawData }) {

  const [chartData, setChartData] = useState([]);
  const [chartRawData, setChartRawData] = useState([]);
  const [actualChart, setActualChart] = useState([chartData]);
  const [actualXAxis, setActualXAxis] = useState(["pitch", "roll", "yaw"]);
  const [dataBool, setDataBool] = useState(0);
  useEffect(() => {

    const updateInterval = setInterval(() => {
      if (chartData.length > 50 || chartRawData.length > 50) {
        chartData.shift()
        chartRawData.shift()
      }
      setChartData(oldData => [...oldData, data])
      setChartRawData(oldRawData => [...oldRawData, rawData])
      if (dataBool === 1) {
        setActualChart(chartData)
      }
      else {
        setActualChart(chartRawData)
      }
    }, 1);

    return () => {
      clearInterval(updateInterval);
    };
  });

  function setCurrentChart(event) {
    if (event === "angles") {
      setDataBool(1);
      setActualXAxis(["pitch", "roll", "yaw"]);
    }
    if (event === "accel") {
      setDataBool(0);
      setActualXAxis(["accel_x", "accel_y", "accel_z"]);
    }
    if (event === "gyro") {
      setDataBool(0);
      setActualXAxis(["gyro_x", "gyro_y", "gyro_z"]);
    }
    if (event === "mag") {
      setDataBool(0);
      setActualXAxis(["mag_x", "mag_y", "mag_z"]);
    }

  }
  return (
    <>
      <Container fluid className="device-page">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/#/">IMU Visualizer</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" onSelect={(eventKey) => setCurrentChart(eventKey)} >
                <NavDropdown title="Graphs" id="basic-nav-dropdown">
                  <NavDropdown.Item eventKey="angles" href="#angles">Euler Angles</NavDropdown.Item>
                  <NavDropdown.Item eventKey="accel" href="#accel">Raw Accelerometer</NavDropdown.Item>
                  <NavDropdown.Item eventKey="gyro" href="#gyro">Raw Gyroscope</NavDropdown.Item>
                  <NavDropdown.Item eventKey="mag" href="#mag"> Raw Magnetometer</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Canvas dpr={window.devicePixelRatio}>
          <color attach="background" args={["#212529"]} />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Cube angles={data} position={[0, 0, 0]} />
        </Canvas>
        <ResponsiveContainer fluid className="data-graph-container" width="100%" height="80%">
          <LineChart
            width={700}
            height={300}
            data={actualChart}
            margin={{
              top: 60,
              right: 200,
              left: 200,
              bottom: 60
            }}
          >
            <XAxis dataKey="name" stroke="white" />
            <YAxis stroke="white" />
            <Line type="monotone" isAnimationActive={false} dot={false} dataKey={actualXAxis[0]} stroke="#82ca9d" />
            <Line type="monotone" isAnimationActive={false} dot={false} dataKey={actualXAxis[1]} stroke="#8884d8" />
            <Line type="monotone" isAnimationActive={false} dot={false} dataKey={actualXAxis[2]} stroke="#ffc658" />
            <Legend />
          </LineChart>
        </ResponsiveContainer >
      </Container >
    </>
  );
}

export default DevicePage;