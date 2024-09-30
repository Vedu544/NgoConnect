import {Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Homepage from "./Pages/Homepage";
import NGOLogin from "./Pages/N-Login";
import NGORegister from "./Pages/N-Register";
import NGOUpdate from "./Pages/N-Update";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Homepage />} />
      <Route path="/NgoLogin" element={<NGOLogin />} />
      <Route path="/NgoRegister" element={<NGORegister />} />
      <Route path="/NgoUpdate" element={<NGOUpdate />} />
      </Route>
    </Routes>
   
  )
}

export default App
