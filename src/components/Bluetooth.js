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
        device.addEventListener('gattserverdisconnected', onDisconnected)
    }

    const onDisconnected = (event) => {
        alert("Device Disconnected")
        const device = ""
        setDevice(device)
    }

    return (
        <>
        <button className="bluetooth" onClick={connectToDevice}>CONNECT</button>
        </>
    )

}

export default Bluetooth;