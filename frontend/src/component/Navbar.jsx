import { Link } from "react-router-dom"
import { useEffect } from "react";

export default function Navbar ({children}) {

    useEffect(() => {
        document.body.removeAttribute("style");
    },[]);

    return <>
    <nav className="navbar bg-secondary navbar-expand-md p-0">
        <div className="container pt-3">
            {/* <a className="navbar-brand fs-2" href="#">Filman</a> */}
            {/* <img src="/images/icon.png" className="img-fluid" style={{width:"73px"}} alt="gambar" /> */}
            <button type="button" className="navbar-toggler mb-2 border-0 " data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon "></span>
            </button>
            <div className="d-md-none fs-2 me-1 mb-2">
                <i className="bi bi-search text-secondary"></i>
            </div>
            <div className="offcanvas bg-dark offcanvas-start" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title fs-2" id="offcanvasNavbarLabel">Menu</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <ul className="navbar-nav me-auto px-hp-3  d-flex justify-content-start gap-2" style={{ width:"100%" }}>
                    <NavLink text={"Beranda"} active={true} to={"/"}/>
                    <NavLink text={"Genre"} to={"/"}/>
                    <NavLink text={"Tahun"} to={"/"}/>
                    <NavLink text={"Kontak"} to={"/"}/>
                </ul>
            </div>
            <div className="d-none d-md-block pb-2" >
                <div className="input-group">
                    <button className="btn bg-dark pe-0 border-0 rounded-1 text-secondary" type="button"><i className="bi bi-search"></i></button>
                    <input type="text" className="border-0 ps-2 form-control bg-dark rounded-1 placeholder-secondary" placeholder="Cari Film" />
                </div>
            </div>
        </div>
    </nav>
    <div className="container mt-3">
        {children}
    </div>
    </>
}

function NavLink ({active,text,to}){

    return <div className="">
        <li className={`d-none d-md-block nav-item ${active ? "gradient-primary" : ""}`}>
            <Link className={`nav-link ${active ? "text-primary" : "text-secondary"}`} to={to}>{text}</Link>
            <div className={`d-none pt-2 justify-content-center ${active ? "d-md-flex" : ""}`}>
                <div className="bg-primary rounded " style={{height:"3px",width:"100%"}} ></div>
            </div>
        </li>
        <li className={`d-md-none nav-item bg-secondary px-3 rounded-3 ${active ? "" : ""}`}>
            <Link className={`nav-link ${active ? "text-primary" : "text-secondary"}`} to={to}>{text}</Link>
            <div className={`d-none pt-2 justify-content-center ${active ? "d-md-flex" : ""}`}>
                <div className="bg-primary rounded " style={{height:"3px",width:"100%"}} ></div>
            </div>
        </li>
    </div>
    
}

