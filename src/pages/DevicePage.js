import { useState, useEffect } from 'react';
import { Accordion, Container, Row, Col, Table } from 'react-bootstrap';
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer
} from 'recharts';

import './DevicePage.css'


export function DevicePage({ device, characteristic, server, service, data }) {
  const [chartData, setchartData] = useState([])
  useEffect(() => {

    setchartData(currentData => [...currentData, data]);
    if (chartData.length > 1000) {
      chartData.shift()
    }
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
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
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
                        <td>{device.name}</td>
                      </tr>
                      <tr>
                        <td>Characteristic UUID</td>
                        <td>{characteristic.uuid}</td>
                      </tr>
                      <tr>
                        <td>Server connection</td>
                        <td>{server.connected?.toString() || ''}</td>
                      </tr>
                      <tr>
                        <td>Primary service</td>
                        <td>{service.isPrimary?.toString() || ''}</td>
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