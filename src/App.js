import CRUD from './components/CRUD';
import { Navbar } from "react-bootstrap";

const App = () => {
  return(
    <div>
      <Navbar>
        <Navbar.Brand><b>Продукция</b></Navbar.Brand>
      </Navbar>
      <div className="container">
      <CRUD/>
      </div>
    </div>
  )
}

export default App;
