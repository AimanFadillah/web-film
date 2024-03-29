import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ConfigAxios from "../variabel/ConfigAxios";
import Loading from "../component/Loading";

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
        response.data.iframes.reverse()
        setFilm(response.data)
        setIframe(response.data.iframes[0].iframe);
        history.replaceState({
            film:response.data,
            iframe:response.data.iframes[0].iframe
        },"","");
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
                                const newState = history.state;
                                newState.iframe = iframe.iframe;
                                history.replaceState(newState,"","");
                            }} className="dropdown-item pointer" href="#">Server {index + 1}</div></li>
                        ) : ""}
                    </ul>
                </div>
            </div>
        </div>
    </div> : <Loading />
}