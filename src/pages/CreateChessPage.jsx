import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios  from "axios";


export const CreateChessPage = () =>{
    const navigate = useNavigate();
    const [showModal,SetModal] = useState(false);

    const handleSubmit = async(event) =>{
        event.preventDefault();
        try{
            await axios.post(`https://chess.sulla.hu/chess`,{
                name: event.target.elements.name.value,
                birth_date: event.target.elements.birth_date.value,
                world_ch_won: event.target.elements.world_ch_won.value,
                profile_url: event.target.elements.profile_url.value,
                image_url: event.target.elements.image_url.value
            });
            SetModal(true);
        }
        catch(error){
            console.error(error);
        }
    };

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
            <h2>Új sakkozó Felvitele</h2>
            <form onSubmit={handleSubmit}>
                <div className="from-group row pb-3">
                    <label className="col-sm-3 col-from-label">Sakkozó neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="from-control"/>
                    </div>
                </div>
                <div className="from-group row pb-3">
                    <label className="col-sm-3 col-from-label">Születési éve: </label>
                    <div className="col-sm-9">
                        <input type="number" name="birth_date" className="from-control"/>
                    </div>
                </div>
                <div className="from-group row pb-3">
                    <label className="col-sm-3 col-from-label">Nyert világbajnokságai</label>
                    <div className="col-sm-9">
                        <input type="number" name="world_ch_won" className="from-control"/>
                    </div>
                </div>
                <div className="from-group row pb-3">
                    <label className="col-sm-3 col-from-label">Profil Url-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="profile_url" className="from-control"/>
                    </div>
                </div>
                <div className="from-group row pb-3">
                    <label className="col-sm-3 col-from-label">Kép Url-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="image_url" className="from-control"/>
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Küldés</button> &nbsp;&nbsp;
                <Link to="/" className="btn btn-warning"><i className="bi bi-arrow-return"></i>Vissza</Link>
            </form>
        </div>
        </>
    );
}