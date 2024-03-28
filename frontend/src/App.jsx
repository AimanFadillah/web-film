import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Utama from "./page/Utama";
import Show from "./page/Show";

export default function App () {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Utama />} ></Route>
      <Route path="/film" element={<Utama />} ></Route>
      <Route path="/film/:slug" element={<Show />} ></Route>
    </Routes>
  </BrowserRouter>
}