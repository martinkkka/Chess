import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

export const ChessModPage = () =>{
    const params = useParams();
    const id = params.chessId;
    const navigate = useNavigate();
    const [showModal,SetModal] = useState(false);
    const [chess,setChess] = useState({
        name: '',
        birth_date: 0,
        world_ch_won: 0,
        profile_url: '',
        image_url:''
    });

    useEffect(()=>{
        const FetchChessData = async() => {
            try{
                const response = await axios.get(`https://chess.sulla.hu/chess/${id}`);
                setChess(response.data);
            }
            catch(error){
                console.error("Hiba az adatok betöltésénél: ", error);
            }
        };
        FetchChessData();
    }, [id]);

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`https://chess.sulla.hu/chess/${id}`, chess)
        .then(()=>{
            SetModal(true)
        })
        .catch(error =>{
            console.error("Nem sikerült a küldés: ", error);
        })
    }

    const InputOnchange = event =>{
        const {name,value} = event.target;
        setChess(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
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
                            A sakkozó adatait sikeresen módosítottuk!
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
        <div className="p-5 content bg-invory text-center">
            <h2>Sakkozó adataiak frissitése</h2>
            <form onSubmit={handleSubmit}>
                <div className="from-group row pb-3">
                    <label className="col-sm-3 col-from-label">Sakkozó neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="from-control" onChange={InputOnchange} value={chess.name}/>
                    </div>
                </div>
                <div className="from-group row pb-3">
                    <label className="col-sm-3 col-from-label">Születési éve: </label>
                    <div className="col-sm-9">
                        <input type="date" name="birth_date" className="from-control" onChange={InputOnchange} value={chess.birth_date}/>
                    </div>
                </div>
                <div className="from-group row pb-3">
                    <label className="col-sm-3 col-from-label">Nyert világbajnokságai</label>
                    <div className="col-sm-9">
                        <input type="number" name="world_ch_won" className="from-control" onChange={InputOnchange} value={chess.world_ch_won}/>
                    </div>
                </div>
                <div className="from-group row pb-3">
                    <label className="col-sm-3 col-from-label">Profil Url-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="profile_url" className="from-control" onChange={InputOnchange} value={chess.profile_url}/>
                    </div>
                </div>
                <div className="from-group row pb-3">
                    <label className="col-sm-3 col-from-label">Kép Url-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="image_url" className="from-control" onChange={InputOnchange} value={chess.image_url}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Küldés</button> &nbsp;&nbsp;
                <Link to="/" className="btn btn-warning"><i className="bi bi-arrow-return"></i>Vissza</Link>
            </form>
        </div>
        </>
    );
}