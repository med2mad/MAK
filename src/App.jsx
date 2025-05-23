import './App.css'
import { useSelector, useDispatch } from "react-redux"
import Home from './Home'
import { Routes, Route } from 'react-router-dom'; // Add this import
import OrdersDashboard from './OrdersDashboard';
import OrderDetail from './OrderDetail';

function App() {

  const x = useSelector((s)=>s.reducerName.val);
  const dispatch = useDispatch();

  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard/orders" element={<OrdersDashboard />} />
      <Route path="/orders/:id" element={<OrderDetail />} />
    </Routes>

  )
}

export default App
