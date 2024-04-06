import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Utama from "./page/Utama";
import Show from "./page/Show";
import Search from "./page/Search";
import DataContext from "./variabel/DataContext";
import { useState } from "react";

export default function App () {
  const [search,setSearch] = useState((new URLSearchParams(window.location.search)).get("s") || "")

  const variabelGlobal = {
    search,
    setSearch
  }

  return <BrowserRouter>
    <DataContext.Provider value={variabelGlobal} >
      <Routes>
        <Route path="/" element={<Utama />} ></Route>
        <Route path="/film" element={<Utama />} ></Route>
        <Route path="/search" element={<Search />} ></Route>
        <Route path="/film/:slug" element={<Show />} ></Route>
      </Routes>
    </DataContext.Provider>
  </BrowserRouter>
}