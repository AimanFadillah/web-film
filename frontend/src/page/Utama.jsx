import { useCallback, useEffect, useState } from "react"
import ConfigAxios from "../variabel/ConfigAxios";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../component/Loading";

export default function Utama () {
    const [films,setFilms] = useState(history.state.films || false);
    const [page,setPage] = useState(history.state.page || 1);

    useEffect(() => {
        getFilms();
    },[]);


    const getFilms = useCallback(async () => {
        const response = await ConfigAxios.get(`/films?page=${page}`);
        setFilms(films ?  [...films,...response.data] : response.data);
        history.replaceState({
            films:films ?  [...films,...response.data] : response.data,
            page:page
        },"","");
        setPage(page + 1)
    },[films]);

    return <div className="container mt-2">
        {films ? 
        <InfiniteScroll
        className="row"
        hasMore={true}
        next={getFilms}
        dataLength={films.length}
        scrollThreshold="100px"
        loader={
            <div className="d-flex justify-content-center my-2" >
                <div className={`spinner-border text-primary`}  style={{width:"3rem",height:"3rem"}} role="status"></div>
            </div>
        }
        >
            {films.map((film,index) => 
            <div className="col-6 col-md-2 mb-3" key={index}>
                <Link to={`/film/${film.slug}`}>
                    <div className="card shadow " >
                        <img src={film.image} className="card border-0" alt={film.nama} style={{objectFit:"cover",height:"200px"}} />
                    </div>
                </Link>
            </div>
            )}
        </InfiniteScroll>
        : <Loading /> }
    </div>
}