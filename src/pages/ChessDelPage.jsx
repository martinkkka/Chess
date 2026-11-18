import { useState,useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const ChessDelPage = () =>{
    const params = useParams();
    const id = params.chessId;
    const navigate = useNavigate();
    const [chess,setChess] = useState([]);
    const [isPendig,SetPending] = useState(false);
    const [showModal,SetModal] = useState(false);

    useEffect(() =>{
        SetPending(true);
        (async()=>{
            try{
                const res = await axios.get(`https://chess.sulla.hu/chess/${id}`)
                setChess(res.data);
            }
            catch(error){
                console.error("Hiba: ", error);
            }
            finally{
                SetPending(false);
            }
        })
    },[id]);

    return(
        <>
        {showModal && (
            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-success text-white">
                            <h5 className="modal-title">Sikeres módosítás!</h5>
                        </div>
                        <div className="modal-body">
                            A sakkozó adatait sikeresen töröltük!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={() => navigate("/")}>
                                Rendben
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        <div className='p-5 m-auto text-center content bg-invory'>
            {isPendig || !chess.id ? <div className='spinner-border text-warning'></div> :
            <div>
                <h2>Törlendö elem: </h2>
                    <div className='card col-sm-3 d-inline-block m-1 p-2'>
                        <p className='text-dark'>Sakkozó neve: {chess.name}</p>
                        <p className='text-danger'>Születési éve: {chess.birth_day}</p>
                        <p className='text-danger'>Nyert Világbajnokság: {chess.world_ch_won}</p>
                        <div className='card-body'>
                            <Link to={chess.profile_url} target="_blank">
                                Profile Link
                            </Link> <br />
                            <img src={chess.image_url || "https://placeholder.co/400x800"} alt={chess.name} className='img-fluid' style={{maxHeight: 200}}/>
                        </div>
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            axios.delete(`https://chess.sulla.hu/chess/${id}`)
                            .then(()=> SetModal(true))
                            .catch(error => console.error("Hiba: ", error))
                        }}></form>
                    </div>
            </div>}
        </div>
        </>
    );

}
