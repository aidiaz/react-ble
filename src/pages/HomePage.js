import { useState } from 'react';
import Bluetooth from '../components/Bluetooth';


export const HomePage = () => {
  const [device, setDevice] = useState('');
  const [characteristic, setCharacteristic] = useState('');
  const [server, setServer] = useState('');
  const [service, setService] = useState('');
  
  return (
    <div>
      <Bluetooth 
        setDevice={setDevice}
        setCharacteristic={setCharacteristic}
        setServer={setServer}
        setService={setService}
      />
    <p> name: {device.name} </p>
    <p> characteristic: {characteristic.uuid}</p>
    <p> server connected: {server.connected?.toString() || ''}</p>
    <p> primary service: {service.isPrimary?.toString() || ''}</p>
    </div>
  );
}

export default HomePage;