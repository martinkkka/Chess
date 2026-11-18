import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ChessListPage } from './pages/ChessListPage.jsx';
import { ChessSinglePage } from './pages/ChessSinglePage.jsx';
import { CreateChessPage } from './pages/CreateChessPage.jsx';
import { ChessModPage } from './pages/ChessModPage.jsx';

import './App.css';

export const App = () => {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-sm navbar-light bg-light p-2">
        <NavLink to="/" className="p-2 m-1 text-decoration-none text-black">
          Sakkozók
        </NavLink>
        <NavLink to="/new-chess" className="p-2 m-1 text-decoration-none text-black">
          <i className="bi bi-plus-circle-fill"></i> Új sakkozó
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<ChessListPage />} />
        <Route path="/chess/:chessId" element={<ChessSinglePage />} />
        <Route path="/new-chess" element={<CreateChessPage />} />
        <Route path="/mod-chess/:chessId" element={<ChessModPage />} />
        <Route path='/del-chess/:chessId' element={}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;