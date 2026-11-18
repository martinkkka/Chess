import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const ChessListPage = () => {
    const [chesses,setChesses] = useState([]);
    const [isFetchPending,setFetchPending] = useState(false);
    const [hiba,sethiba] = useState([]);

    useEffect(() => {
        setFetchPending(true);
        axios
        .get("https://chess.sulla.hu/chess")
        .then((res) => setChesses(res.data))
        .catch((error) => {
            sethiba(error);
            console.error("Hiba:", error)})
        .finally(() => setFetchPending(false))
    },[])

    return(
        <>
        <div className='p-5 m-auto text-center content bg-invory'>
            {isFetchPending ? <div className='spinner-border text-warning'></div> :
            <div>
                <h2>Sakkozó</h2>
                {chesses.map((chess,index) => (
                    <div className='card col-sm-3 d-inline-block m-1 p-2' key={index}>
                        <p className='text-dark'>Sakkozó neve: {chess.name}</p>
                        <p className='text-danger'>Születési éve: {chess.birth_date}</p>
                        <p className='text-danger'>Nyert Világbajnokság: {chess.world_ch_won}</p>
                        <div className='card-body'>
                            <Link to={chess.profile_url} target="_blank">
                                Profile Link
                            </Link>
                            <Link to={"/chess/" + chess.id}>
                                <img src={chess.image_url || "https://placeholder.co/400x800"} alt={chess.name} className='img-fluid' style={{maxHeight: 200}}/>
                            </Link> <br />
                            <Link to={"/chess/" + chess.id}><i className='bi bi-eye'/></Link>
                            <Link to={"/mod-chess/" + chess.id}><i className='bi bi-pencil'/></Link>
                            <Link to={"/del-chess/" + chess.id}><i className='bi bi-trash3'/></Link>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
        </>
    );
}