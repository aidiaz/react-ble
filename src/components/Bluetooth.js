import { Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import './Bluetooth.css'


function Bluetooth() {


    const [bleInterface, setInterface] = useState({{}});

    const connectToDevice = async () => {


        var ble_interface = Object()

        ble_interface.device = {}
        ble_interface.server = {}
        ble_interface.services = []
        ble_interface.characteristics = []

        ble_interface.device = await navigator.bluetooth
            .requestDevice({
                filters: [
                    { name: "ESP_32" },
                    { services: [0x00FF, 0x00EE] },

                ]
            })
        ble_interface.server = await ble_interface.device.gatt.connect()
        var service = await ble_interface.server.getPrimaryService(0x00FF)
        ble_interface.services.push(service)
        service = await ble_interface.server.getPrimaryService(0x00EE)
        ble_interface.services.push(service)
        // ble_interface.characteristics.push(await ble_interface.services.getCharacteristic(0xFF01))
        // ble_interface.characteristics.push(await ble_interface.services.getCharacteristic(0xEE01))
        ble_interface.device.addEventListener('gattserverdisconnected', onDisconnected)

        setInterface(old_ble_interface => ({ ...old_ble_interface, ...ble_interface }))

        console.log(bleInterface)
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