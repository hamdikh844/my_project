

import Navbar from "./componnents/Navbar";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import Home from "./componnents/Home";
import Singin from "./componnents/Singin";
import Product from "./componnents/Product";

import Foote from "./componnents/Foote";




import SERVICES from "./componnents/SERVICES";

import Register from "./componnents/Register";


import {Routes,Route}from "react-router-dom"
import Command from "./componnents/Command";
import AdminPanel from "./componnents/AdminPanel";
import ProductDetail from "./componnents/ProductDetail";
import OrdersList from "./componnents/OrdersList";












function App() {
  return <div>
     <Navbar/>
    
     <Routes>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/" exact element={<Home/>}/>
      <Route path="/SERVICES" element={<SERVICES/>}/>
      
      <Route path="/Singin" element={<Singin/>}/>
      <Route path="/Product" element={<Product/>}/>
      <Route path="/Command" element={<Command/>}/>
      <Route path="/Signin/AdminPanel" element={<AdminPanel />}/>
      <Route path="/Product/:id" element={<ProductDetail/>}/>
      <Route path="/Orders" element={<OrdersList/>}/>
     




      
    
      

     </Routes>
     <Foote/>
    
     
    
  </div>
  
 
  
}

export default App;

