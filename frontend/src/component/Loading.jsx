export default function Loading ({height}) {
    return <div className="container" style={{height}} >
        <div className="row">
            <div className="col-md-12 d-flex justify-content-center mt-5" >
                <div className={`spinner-border text-primary`}  style={{width:"3rem",height:"3rem"}} role="status"></div>
            </div>
        </div>
    </div>
}