import { Button, Container } from 'react-bootstrap';
import './Bluetooth.css'

function Bluetooth({ setCharacteristics, setData, setRawData }) {

    const connectToDevice = async () => {

        const ble_request = await navigator.bluetooth
            .requestDevice({
                filters: [
                    { name: "nimble-ble" },
                ],
                optionalServices: ['0723c127-73fa-4b28-ad7a-5377218cd569'],
            })
        ble_request.addEventListener('gattserverdisconnected', onDisconnected);
        const server = await ble_request.gatt.connect()
        const services = await server.getPrimaryService('0723c127-73fa-4b28-ad7a-5377218cd569')
        const characteristics = await services.getCharacteristic('567a4ff5-da5b-454e-b0eb-1edfcfd120a4')
        characteristics.startNotifications()
        characteristics.addEventListener('characteristicvaluechanged', onDataChange);
        setCharacteristics(old_ble_characteristics => ([...old_ble_characteristics, characteristics]))
    }

    const onDataChange = (event) => {
        // Assuming device, service, and characteristic are already set up
        const value = event.target.value;
        // Assuming the received value is a DataView
        const dataView = new Uint16Array(value.buffer);
        const uint16ValueA = dataView[0]; // Assuming little-endian encoding
        const uint16ValueB = dataView[1]; // Assuming little-endian encoding
        const uint16ValueC = dataView[2]; // Assuming little-endian encoding
        const uint16ValueD = dataView[3]; // Assuming little-endian encoding
        const uint16ValueE = dataView[4]; // Assuming little-endian encoding
        const uint16ValueF = dataView[5]; // Assuming little-endian encoding
        const uint16ValueG = dataView[6]; // Assuming little-endian encoding
        const uint16ValueH = dataView[7]; // Assuming little-endian 
        const uint16ValueI = dataView[8]; // Assuming little-endian encoding
        const uint16ValueJ = dataView[9]; // Assuming little-endian encoding
        const uint16ValueK = dataView[10]; // Assuming little-endian encoding
        const uint16ValueL = dataView[11]; // Assuming little-endian encoding

        var dict = {
            name: "",
            pitch: (uint16ValueA - 65535 / 2) * 180 / (65535 / 2),
            roll: (uint16ValueB - (65535 / 2)) * 180 / (65535 / 2),
            yaw: (uint16ValueC - (65535 / 2)) * 180 / (65535 / 2),
        };

        var raw = {
            name: "",
            accel_x: uint16ValueD,
            accel_y: uint16ValueE,
            accel_z: uint16ValueF,
            gyro_x: uint16ValueG,
            gyro_y: uint16ValueH,
            gyro_z: uint16ValueI,
            mag_x: uint16ValueJ,
            mag_y: uint16ValueK,
            mag_z: uint16ValueL,
        };

        setData(dict);
        setRawData(raw);
    }

    const onDisconnected = (event) => {
        alert("Device Disconnected")
    }

    return (
        <>
            <Container fluid className="connect-button">
                <Button variant="primary" size="xxl" onClick={connectToDevice}>Connect Device</Button>
            </Container>
        </>
    )

}

export default Bluetooth;