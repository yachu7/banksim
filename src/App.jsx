import "./App.css";
import { Route , Routes} from "react-router-dom";
import Home from "./components/Home";
import Balance from "./components/Balance";
import Create from "./components/Create";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element={<div><Home/></div>} />
      <Route path="/balance" element={<div><Balance/></div>} />
      <Route path="/createaccount" element={<div><Create/> </div>} />
      <Route path="/deposit" element={<div><Deposit/></div>} />
      <Route path="/withdraw" element={<div><Withdraw/></div>} />
    </Routes>
    </>
    
  );
}

export default App;
