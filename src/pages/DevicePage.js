import { useState, useEffect } from 'react';
import { Accordion, Container, Table } from 'react-bootstrap';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer
} from 'recharts';

import './DevicePage.css'


export function DevicePage({ device }) {

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
    if (chartData.length > 500) {
      chartData.shift()
    }
    setchartData(currentData => [...currentData, data]);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <>
      <Container fluid className="device-page">
        <Container className='title-heading'><h1>BLE Grapher</h1></Container>
        <ResponsiveContainer fluid className="data-graph-container" width="100%" height="80%">
          <LineChart
            width={700}
            height={300}
            data={chartData}
            margin={{
              top: 60,
              right: 200,
              left: 200,
              bottom: 60
            }}
          >
            <XAxis dataKey="name" stroke="white" />
            <YAxis stroke="white" />
            <Legend />
            <Line type="monotone" dataKey="pitch" stroke="#8884d8" />
            <Line type="monotone" dataKey="roll" stroke="#82ca9d" />
            <Line type="monotone" dataKey="yaw" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
        <Container className='accordion-table-container'>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Device information</Accordion.Header>
              <Accordion.Body>
                <Container fluid className="device-table-container">
                  <Table bordered size='sm'>
                    <tbody>
                      <tr>
                        <td>Device Name</td>
                        <td>{device[0].name}</td>
                      </tr>
                      <tr>
                        <td>Server connection</td>
                        <td>{device[0].server.connected?.toString() || ''}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Container>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

        </Container>

      </Container >

    </>

  );
}

export default DevicePage;