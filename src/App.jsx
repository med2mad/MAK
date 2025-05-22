import './App.css'
import { useSelector, useDispatch } from "react-redux"
import Home from './Home'

function App() {

  const x = useSelector((s)=>s.reducerName.val);
  const dispatch = useDispatch();

  return (

      <Home />

  )
}

export default App
