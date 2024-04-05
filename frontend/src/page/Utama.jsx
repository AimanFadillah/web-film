import { useCallback, useEffect, useState } from "react"
import ConfigAxios from "../variabel/ConfigAxios";
import { Link, useNavigate } from "react-router-dom";
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
    const [pilihan,setPilihan] = useState(history.state.pilihan || 0);
    const nav = useNavigate();

    useEffect(() => {
        !films ? getFilms() : undefined; 
    },[]);

    useEffect(() => {
        clearInterval(wadah)
        wadah = setInterval(() => {
            setIndexLanding(indexLanding + 1 > gambarLanding.length - 1 ? 0 : indexLanding + 1 )
        },5000)
    },[indexLanding]);

    const getFilms = useCallback(async (reset = false,index = pilihan) => {
        setPilihan(index)
        reset ? setFilms(false) : undefined
        const response = await ConfigAxios.get(
            index == 1 ? `/films?page=${reset ? 1 : page}&s=${search}` : 
            index == 2 ? `/cam?page=${reset ? 1 : page}` : `/recommended?page=${reset ? 1 : page}`);
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
            pilihan:index,
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
        <div className="row bg-secondary mt-4 rounded p-3 mx-0">
            <div className="col-md-5 order-md-1 order-2 p-hp-0   ">
                <div className=" py-3">
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
            <div className="col-md-7 order-md-2 order-1 p-0 ">
                <div className="position-relative h-md-100" >
                    {gambarLanding.map((gambar,index) => 
                        <img key={index} src={gambar.src} className={`transisi-gambar ${index == indexLanding ? "active" : ""} border border-secondary border-3 rounded img-fluid w-100`} style={{objectFit:"cover",height:"100%"}} alt="" />
                    )}
                </div>
            </div>
        </div>
        <div className="row my-4 mx-0 justify-content-between">
            <div className="col-lg-4 border border-secondary bg-secondary rounded-5 p-1 d-flex justify-content-between">
                <div onClick={(e) => getFilms(true,0)} className={`${pilihan == 0 ? "bg-primary" : ""} pointer rounded-5 py-2 px-4  `}>
                    Rekomendasi
                </div>
                <div onClick={(e) => getFilms(true,1)} className={`${pilihan === 1 ? "bg-primary" : ""} pointer rounded-5 py-2 px-4  `} >
                    Terbaru
                </div>
                <div onClick={(e) => getFilms(true,2)} className={`${pilihan == 2 ? "bg-primary" : ""} pointer rounded-5 py-2 px-4  `} >
                    CAM
                </div>
            </div> 
            <div className="col-md-2 d-none d-lg-flex align-items-center justify-content-end p-0">
                <div onClick={() => {
                    getFilms(true,pilihan - 1 < 0 ? 0 : pilihan - 1)
                }} className="pointer rounded-circle border  d-inline me-3" style={{padding:"10px 14px"}} >
                    <i className="bi bi-chevron-left"></i>
                </div>
                <div onClick={() => {
                    getFilms(true,pilihan + 1 > 2 ? 2 : pilihan + 1)
                }} className="pointer rounded-circle border  d-inline me-3" style={{padding:"10px 14px"}} >
                    <i className="bi bi-chevron-right"></i>
                </div>
            </div>
        </div>
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
        <div className="search">

        </div>
    </Navbar>
}

