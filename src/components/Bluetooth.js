import {Button, Container} from 'react-bootstrap';
import './Bluetooth.css'

function Bluetooth({ setDevice, setCharacteristic, setServer, setService }) {

    const connectToDevice = async () => {
        const device = await navigator.bluetooth
            .requestDevice({
                filters: [
                    { name: "ESP_32" },
                    { services: [0x00FF] },
                ]
            })
        setDevice(device)
        const server = await device.gatt.connect()
        console.log("device connected")
        setServer(server)
        const service = await server.getPrimaryService(0x00FF)
        console.log("service obtained")
        setService(service)
        const characteristic = await service.getCharacteristic(0xFF01)
        console.log("characteristics set")
        setCharacteristic(characteristic)

        characteristic.addEventListener('oncharacteristicvaluechanged', onDataChange)
        device.addEventListener('gattserverdisconnected', onDisconnected)

    }

    const onDataChange = (event) => {
        console.log("New data!")

    }

    const onDisconnected = (event) => {
        alert("Device Disconnected")
        const device = ""
        setDevice(device)
    }

    return (
        <>
            <Container fluid className="connect-button">
                    <Button variant="primary" size="xxl" onClick={connectToDevice}>Connect Device</Button>{' '}
            </Container>
        </>
    )

}

export default Bluetooth;