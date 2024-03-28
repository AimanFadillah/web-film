import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ConfigAxios from "../variabel/ConfigAxios";
import Loading from "../component/Loading";

export default function Show () {
    const slug = useParams().slug
    const [film,setFilm] = useState();
    const [iframe,setIframe] = useState();
    const [namaIframe,setNamaIframe] = useState();

    useEffect(() => {
        getFilm();
    },[]);

    const getFilm = useCallback(async () => {
        const response = await ConfigAxios.get(`/films/${slug}`);
        setFilm(response.data)
        setIframe(response.data.iframes[response.data.iframes.length - 1].iframe);
    },[]);

    return film ? <div className="container mt-2">
        <div className="row">
            <div className="col-md-12" style={{height:"500px"}} >
                <iframe sandbox="allow-same-origin allow-scripts allow-forms" src={iframe} allowFullScreen ></iframe>
            </div>
            <div className="col-md-12 d-flex justify-content-between px-4">
                <div className="">
                    <h3>{film.nama}</h3>
                </div>
                <div className="dropdown">
                    <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {namaIframe || "Pilih Server"}
                    </button>
                    <ul className="dropdown-menu">
                        {film.iframes ? film.iframes.map((iframe,index) => 
                            <li key={index} ><div onClick={() => {
                                setIframe(iframe.iframe)
                                setNamaIframe(`Server ${index + 1}`)
                            }} class="dropdown-item pointer" href="#">Server {index + 1}</div></li>
                        ) : ""}
                    </ul>
                </div>
            </div>
        </div>
    </div> : <Loading />
}