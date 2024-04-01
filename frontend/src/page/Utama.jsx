import { useCallback, useEffect, useState } from "react"
import ConfigAxios from "../variabel/ConfigAxios";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../component/Loading";
import Navbar from "../component/Navbar";

const gambarLanding = [
    {
        nama:"The Marvels",
        src:"/images/marvels.jpg",
        genre:"Action, Adventure, Fantasy",
        sinopis:"Carol Danvers menghancurkan Supreme Intelligence, kecerdasan buatan yang memimpin kekaisaran Kree.Hal ini menyebabkan perang saudara dan kehancuran dunia asal Kree, Hala, selama 30 tahun ke depan. Konflik ini membuat planet ini menjadi tandus karena kehilangan udara, air, dan sinar matahari.",
        slug:""
    },
    {
        nama:"Oppenheimer",
        src:"/images/oppenheimer.jpg",
        genre:"Biography, Drama, History",
        sinopis:"Kisah tentang seorang fisikawan Amerika Serikat bernama J. Robert Oppenheimer yang mengembangkan bom atom.",
        slug:""
    },
    {
        nama:"The Nun 2",
        src:"/images/nun2.jpg",
        genre:"Horror, Mystery, Thriller",
        sinopis:"Berlatar tahun 1956, bermula dari pembunuhan seorang pendeta, Suster Irene (Taissa Farmiga) sekali lagi berhadapan dengan kekuatan jahat yang sangat besar, Valak sang biarawati iblis demi kedamaian hidupnya serta orang-orang di sekitarnya.",
        slug:""
    },
    {
        nama:"Migration",
        src:"/images/migration.jpg",
        genre:"Animation, Adventure, Comedy, Family",
        sinopis:"Migration adalah sebuah film animasi Amerika Serikat tahun 2023 yang disutradarai oleh Mike White. Para pengisi suaranya meliputi Kumail Nanjani sebagai Mack, Elizabeth Banks sebagai Pam, Tresi Gazal sebagai Gwen dan Caspar Jennings sebagai Dax",
        slug:""
    },
    {
        nama:"Fast X",
        src:"/images/fastx.jpg",
        genre:"Action, Adventure, Mystery, Thriller",
        sinopis:"Selama banyak misi dan melawan rintangan yang mustahil, Dom Toretto dan keluarganya telah mengakali dan mengalahkan setiap musuh di jalan mereka. Sekarang, mereka menghadapi lawan paling mematikan yang pernah mereka hadapi",
        slug:""
    },
]


export default function Utama () {
    const [films,setFilms] = useState(history.state.films || false);
    const [page,setPage] = useState(history.state.page || 1);
    const [hasMore,setHasMore] = useState(history.state.hasMore || true)
    const [search,setSearch] = useState(history.state.search || "");
    const [indexLanding,setIndexLanding] = useState(0);

    useEffect(() => {
        !films ? getFilms() : undefined; 
    },[]);

    useEffect(() => {
        clearInterval(wadah)
        wadah = setInterval(() => {
            setIndexLanding(indexLanding + 1 > gambarLanding.length - 1 ? 0 : indexLanding + 1 )
        },5000)
    },[indexLanding]);


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
        {/* <div className="row">
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
        </div> */}
        <div className="row bg-secondary my-4 rounded p-3 mx-0">
            <div className="col-md-5">
                <div className="p-2 py-3">
                    <div className="position-relative"  style={{height:"350px"}}>
                        {gambarLanding.map((gambar,index) => 
                        <div key={index} className={`transisi-gambar ${index == indexLanding ? "active" : ""}`} style={{height:"100%"}} >
                            <h6 className="text-primary" >{gambar.genre}</h6>
                            <h1 className="fw-bold" >{gambar.nama}</h1>
                            <p className="mt-3 text-secondary" style={{fontSize:"15px",width:"90%"}} >{gambar.sinopis}</p>
                            <button className="btn btn-primary rounded-5 py-2 px-4 mt-4" ><i className="bi bi-film"></i> Nonton Sekarang</button>
                        </div>
                        )}
                    </div>
                    <div className="ms-1 z-3" style={{marginTop:"55px"}} >
                        <div onClick={() => setIndexLanding(indexLanding - 1 < 0 ? gambarLanding.length - 1 : indexLanding - 1 )} className="pointer rounded-circle border  d-inline me-3" style={{padding:"10px 14px"}} >
                            <i className="bi bi-chevron-left"></i>
                        </div>
                        {gambarLanding.map((gambar,index) => 
                            <i key={index} className={`bi bi-circle${indexLanding == index ? "-fill text-primary" : " "} me-1`} style={{fontSize:"7px"}} ></i>
                        )}
                        <div onClick={() => setIndexLanding(indexLanding + 1 > gambarLanding.length - 1 ? 0: indexLanding + 1 )} className="pointer rounded-circle border d-inline ms-3" style={{padding:"10px 14px"}} >
                            <i className="bi bi-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-7 p-0 position-relative">
                {gambarLanding.map((gambar,index) => 
                    <img key={index} src={gambar.src} className={`transisi-gambar ${index == indexLanding ? "active" : ""} border border-secondary border-3 rounded img-fluid w-100`} style={{objectFit:"cover",height:"100%"}} alt="" />
                )}
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

