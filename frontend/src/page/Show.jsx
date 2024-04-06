import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ConfigAxios from "../variabel/ConfigAxios";
import Loading from "../component/Loading";
import Navbar from "../component/Navbar";

export default function Show () {
    const slug = useParams().slug
    const [film,setFilm] = useState(history.state.film || undefined);
    const [iframe,setIframe] = useState(history.state.iframe || undefined);
    const [namaIframe,setNamaIframe] = useState();

    useEffect(() => {
        !film ? getFilm() : undefined;
    },[]);

    const getFilm = useCallback(async () => {
        const response = await ConfigAxios.get(`/films/${slug}`);
        setFilm(response.data)
        setIframe(response.data.iframes[0].iframe);
        history.replaceState({
            film:response.data,
            iframe:response.data.iframes[0].iframe
        },"","");
    },[]);

    return <Navbar>
        {film ? <>
            <div className="row justify-content-center">
            <div className="col-12"  >
                <div id="wadahIframe"  >
                    <iframe sandbox="allow-same-origin allow-scripts allow-forms" src={iframe} allowFullScreen ></iframe>
                    <div className="top-0 start-0 w-100 h-100" style={{position:"absolute",border:"9px solid black",pointerEvents:"none"}}>
                    </div>
                    <div className="top-0 start-0 w-100 h-100 rounded-4" style={{position:"absolute",border:"9px solid black",pointerEvents:"none"}}>
                    </div>
                    <div className="dropdown position-absolute top-0 end-0">
                        <button className="btn border-0 px-3 pt-3 rounded-0 dropdown-toggle text-server" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {namaIframe || "List Server"}
                        </button>
                        <ul className="dropdown-menu border-0 bg-dark me-2">
                            {film.iframes ? film.iframes.map((iframe,index) => 
                                <li key={index} ><div onClick={() => {
                                    setIframe(iframe.iframe)
                                    setNamaIframe(`Server ${index + 1}`)
                                    const newState = history.state;
                                    newState.iframe = iframe.iframe;
                                    history.replaceState(newState,"","");
                                }} className="dropdown-item pointer" href="#">Server {index + 1}</div></li>
                            ) : ""}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="row justify-content-center mt-3">
            {/* <div className="col-12 col-md-3 mb-4">
                <div className="d-flex justify-content-center">
                    <img className="w-md-100 rounded img-fluid"  src={film.image.includes("https") ? film.image : `https://rebahinxxi.shop${film.image}`} alt={film.nama} />
                </div>
            </div>
            <div className="col-12 col-md-9">
                <div className="">
                    <ul className="bg-secondary">
                        <li className="list-group-item fw-bold fs-5">
                            {film.nama}
                        </li>
                        <li className="list-group-item">{film.genre}</li>
                        <li className="list-group-item">{film.view}</li>
                        <li className="list-group-item">{film.durasi}</li>
                        <li className={`list-group-item ${film.kualitas.includes("CAM") ? "bg-danger" : "bg-success"}`}>
                            {film.kualitas}
                        </li>
                    </ul>
                </div>
            </div> */}
            <div className="col-12 col-md-3 mb-3 ">
                <div className="bg-secondary p-2 rounded h-100 d-flex flex-column justify-content-between">
                    <img src={film.image.includes("https") ? film.image : `https://rebahinxxi.shop${film.image}`} className="rounded w-100 h-100" alt={film.nama} style={{objectFit:"cover"}} />
                    <div className="d-flex justify-content-between pt-2 px-1">
                        <div className="">
                            {film.nama}
                        </div>
                        {/* <div className={`${film.rating === "" ? "d-none" : "d-flex"} justify-content-end p-1 bg-warning rounded-5 px-2`} style={{height:"23px",fontSize:"10px"}} >
                            <i className="bi bi-star-fill me-1" style={{color:"yellow"}}></i> {film.rating}
                        </div> */}
                    </div>
                    <div className="">
                        <table className="text-secondary mx-1 mt-2" style={{ fontSize:"12px" }}>
                            <tbody>
                                <tr>
                                    <td>view</td>
                                    <td>: {film.view}</td>
                                </tr>
                                <tr>
                                    <td>Kualitas</td>
                                    <td>: {film.kualitas}</td>
                                </tr>
                                <tr>
                                    <td>Durasi</td>
                                    <td>: {film.durasi} Min</td>
                                </tr>
                                <tr>
                                    <td>Genre</td>
                                    <td>: {film.genre}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-9 h-100">
                <div className="bg-secondary p-2 rounded">
                    <p>{film.deskripsi[0]}</p>
                    <p>{film.deskripsi[1]}</p>
                    <p>{film.deskripsi[2]}</p>
                </div>
            </div>
           
        </div>
        
        </> : <Loading /> }
    </Navbar> 
}
