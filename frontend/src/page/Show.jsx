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

    return film ? <Navbar>
        <div className="row justify-content-center">
            <div className="col-12"  >
                <div id="wadahIframe"  >
                    <iframe sandbox="allow-same-origin allow-scripts allow-forms" src={iframe} allowFullScreen ></iframe>
                    <div className="top-0 start-0 w-100 h-100" style={{position:"absolute",border:"9px solid black",pointerEvents:"none"}}>
                    </div>
                </div>
            </div>
            <div className="col-12 d-flex justify-content-between my-3">
                <div className="dropdown">
                    <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {namaIframe || "Pilih Server"}
                    </button>
                    <ul className="dropdown-menu">
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
        <div className="row justify-content-center">
            <div className="col-12 col-md-3 mb-4">
                <div className="d-flex justify-content-center">
                    <img className="w-md-100 rounded img-fluid"  src={film.image.includes("https") ? film.image : `https://rebahinxxi.shop${film.image}`} alt={film.nama} />
                </div>
            </div>
            <div className="col-12 col-md-9">
                <div className="">
                    <ul className="list-group">
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
            </div>
            <div className="col-12 mt-3" >
                {film.deskripsi.map((deskripsi,index) => 
                    <p key={index} className="p-1" >
                        {deskripsi}
                    </p>
                )}
            </div>
        </div>
    </Navbar> : <Loading />
}
