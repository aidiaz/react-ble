import Bluetooth from '../components/Bluetooth';
import Container from 'react-bootstrap/Container';
import './ConnectPage.css'

export function ConnectPage({ setDevice, setCharacteristic, setServer, setService }) {
  
  return (
    <Container fluid className="connect-page"> 
      <div >
        <Bluetooth
          setDevice={setDevice}
          setCharacteristic={setCharacteristic}
          setServer={setServer}
          setService={setService}
        />
      </div>
    </Container>

  );
}

export default ConnectPage;