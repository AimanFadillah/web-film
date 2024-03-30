import { useCallback, useEffect, useState } from "react"
import ConfigAxios from "../variabel/ConfigAxios";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../component/Loading";
import Navbar from "../component/Navbar";

export default function Utama () {
    const [films,setFilms] = useState(history.state.films || false);
    const [page,setPage] = useState(history.state.page || 1);
    const [hasMore,setHasMore] = useState(history.state.hasMore || true)
    const [search,setSearch] = useState(history.state.search || "");

    useEffect(() => {
        !films ? getFilms() : undefined; 
    },[]);


    const getFilms = useCallback(async (reset = false) => {
        const response = await ConfigAxios.get(`/films?page=${reset ? 1 : page}&s=${search}`);
        if(response.data.length == 0){
            setHasMore(false)
        }
        if(reset){
            setHasMore(true)
        }
        setFilms(films && !reset ?  [...films,...response.data] : response.data);
        history.replaceState({
            films:films  && !reset ?  [...films,...response.data] : response.data,
            page:page + 1,
            hasMore:reset ? true : hasMore,
            search:search,
        },"","");
        setPage(reset ? 2 : page + 1)
    },[films,search]);

    return <Navbar>
        <div className="row">
            <div className="col-md-12">
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const button = e.target.querySelector("button");
                    button.setAttribute("disabled","")
                    await getFilms(true)
                    button.removeAttribute("disabled","")
                }} className="input-group mb-3">
                    <input name="search" type="text" onChange={(e) => setSearch(e.target.value)} value={search} className="form-control" placeholder="Cari Film" />
                    <button className="btn btn-primary">Cari</button>
                </form>
            </div>
        </div>
        {films ? 
        <InfiniteScroll
        className="row"
        hasMore={hasMore}
        next={getFilms}
        dataLength={films.length}
        scrollThreshold="100px"
        loader={
            <div className="d-flex justify-content-center my-2" >
                <div className={`spinner-border text-primary`}  style={{width:"3rem",height:"3rem"}} role="status"></div>
            </div>
        }
        >
            {films.map((film,index) => !film.slug.includes("series") ? 
            <div className="col-6 col-md-2 mb-3" key={index}>
                <Link to={`/film/${film.slug}`}>
                    <div className="card shadow " >
                        <img src={film.image} className="card border-0" alt={film.nama} style={{objectFit:"cover",height:"200px"}} />
                        <div className=" position-absolute w-100 d-flex justify-content-between">
                            <div className=""></div>
                            <div className="bg-dark p-1 opacity-75" style={{fontSize:"12px",borderRadius:"0px 0px 0px 5px"}} >
                                <i className="bi bi-star-fill" style={{color:"yellow"}}></i>
                                <div className="d-inline ms-1 text-white fw-bold me-2">
                                    {film.rating}
                                </div>
                                <i className="bi bi-film fw-bold" style={!film.kualitas.includes("CAM")  ? {color:"green"} : {color:"red"}}></i>
                                <div className="d-inline ms-1 text-white">
                                    {film.kualitas}
                                </div>
                            </div>
                        </div>
                        <div className=" position-absolute bottom-0 bg-dark w-100 opacity-75 p-1">
                            <div className="text-white text-truncate">{film.nama}</div>
                        </div>
                    </div>
                </Link>
            </div> : undefined
            )}
        </InfiniteScroll>
        : <Loading /> }
        <div className="search">

        </div>
    </Navbar>
}