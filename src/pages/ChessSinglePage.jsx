import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from "axios";

export const ChessSinglePage = () =>{
    const params = useParams();
    const id = params.chessId;
    const [chess,setChess] = useState([]);
    const [isPendig,SetPending] = useState(false);

    useEffect(() => {
            SetPending(true);
            axios
            .get(`https://chess.sulla.hu/chess/${id}`)
            .then((res) => setChess(res.data))
            .catch((error) => {
                sethiba(error);
                console.error("Hiba:", error)})
            .finally(() => SetPending(false))
        },[id])
    
        return(
            <>
            <div className='p-5 m-auto text-center content bg-invory'>
                {isPendig || !chess.id ? <div className='spinner-border text-warning'></div> :
                <div>
                    <h2>Sakkozó</h2>
                        <div className='card col-sm-3 d-inline-block m-1 p-2'>
                            <p className='text-dark'>Sakkozó neve: {chess.name}</p>
                            <p className='text-danger'>Születési éve: {chess.birth_day}</p>
                            <p className='text-danger'>Nyert Világbajnokság: {chess.world_ch_won}</p>
                            <div className='card-body'>
                                <Link to={chess.profile_url} target="_blank">
                                    Profile Link
                                </Link>
                                <Link to={"/"}>
                                    <img src={chess.image_url || "https://placeholder.co/400x800"} alt={chess.name} className='img-fluid' style={{maxHeight: 200}}/>
                                </Link> <br />
                                <Link to={"/"}><i className='bi bi-arrow-left'/></Link>
                                <Link to={"/mod-chess/" + chess.id}><i className='bi bi-pencil'/></Link>
                                <Link to={"/del-chess/" + chess.id}><i className='bi bi-trash3'/></Link>
                            </div>
                        </div>
                </div>}
            </div>
            </>
        );
}