import { useCallback, useEffect, useState } from "react"
import ConfigAxios from "../variabel/ConfigAxios";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Utama () {
    const [films,setFilms] = useState(history.state.films || []);
    const [page,setPage] = useState(history.state.page || 1);

    useEffect(() => {
        getFilms();
    },[]);


    const getFilms = useCallback(async () => {
        const response = await ConfigAxios.get(`/films?page=${page}`);
        setFilms([...films,...response.data]);
        history.replaceState({
            films:[...films,...response.data],
            page:page
        },"","");
        setPage(page + 1)
    },[films]);

    return <div className="container mt-2">
        <InfiniteScroll
         className="row"
        hasMore={true}
        next={getFilms}
        dataLength={films.length}
        >
            {films.map((film,index) => 
            <div className="col-md-2 mb-3" key={index}>
                <Link to={`/film/${film.slug}`}>
                    <div className="card shadow " >
                        <img src={film.image} className="card border-0" alt={film.nama} style={{objectFit:"cover",height:"200px"}} />
                    </div>
                </Link>
            </div>
            )}
        </InfiniteScroll>
    </div>
}