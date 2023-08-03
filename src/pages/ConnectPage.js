import Bluetooth from '../components/Bluetooth';
import Container from 'react-bootstrap/Container';
import './ConnectPage.css'

export function ConnectPage() {
  
  return (
    <Container fluid className="connect-page"> 
      <div >
        <Bluetooth />
      </div>
    </Container>

  );
}

export default ConnectPage;