import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Loading from "../component/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import ConfigAxios from "../variabel/ConfigAxios";
import DataContext from "../variabel/DataContext";

export default function Search (){
    const [films,setFilms] = useState(history.state.films || false);
    const [page,setPage] = useState(history.state.page || 1);
    const [hasMore,setHasMore] = useState(history.state.hasMore || true)
    const [first,setFirst] = useState(false);
    const nav = useNavigate();
    const {search} = useContext(DataContext)
    
    useEffect(() => {
        !films ? getFilms() : undefined
        setFirst(true)
    },[]);

    useEffect(() => {
        if(first){
            getFilms(true);
        }
    },[search]);

    const getFilms = useCallback(async (reset = false,) => {
        reset ? setFilms(false) : undefined
        const response = await ConfigAxios.get(`/films?page=${reset ? 1 : page}&s=${search}`) 
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
        <div className="container">
        {films ? 
            <InfiniteScroll
            className="row bg-secondary pt-3 rounded m-0"
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
                <div className="col-12 col-md-3 mb-3" key={index}>
                    <div onClick={() => nav(`/film/${film.slug}`)} className="bg-dark p-2 rounded h-100 d-flex flex-column justify-content-between">
                        <img src={film.image} className="w-100 h-100" alt={film.nama} style={{objectFit:"cover"}} />
                        <div className="d-flex justify-content-between pt-2 px-1">
                            <div className="w-text-card  ">
                                {film.nama}
                            </div>
                            <div className={`${film.rating === "" ? "d-none" : "d-flex"} justify-content-end p-1 bg-warning rounded-5 px-2`} style={{height:"23px",fontSize:"10px"}} >
                                <i className="bi bi-star-fill me-1" style={{color:"yellow"}}></i> {film.rating}
                            </div>
                        </div>
                        <div className="">
                            <table className="text-secondary mx-1 mt-2" style={{ fontSize:"12px" }}>
                                <tbody>
                                    <tr>
                                        <td>Kualitas</td>
                                        <td>: {film.kualitas}</td>
                                    </tr>
                                    <tr>
                                        <td>Durasi</td>
                                        <td>: {film.durasi} Min</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="pointer btn btn-primary w-100 mt-3" >Nonton</div>
                    </div>
                </div> : undefined
                )}
            </InfiniteScroll>
            : <Loading height="800px" /> }
        </div>
    </Navbar>
}