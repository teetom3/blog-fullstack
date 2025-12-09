import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';


function App() {
  return (
    <BrowserRouter>
    <div className="container">
      
        <nav style={{ padding: '20px'}}>
          <Link style={{ padding: '20px'}} to="/">Accueil</Link>
          <Link style={{ padding: '20px'}} to="/login">Login</Link>
          <Link style={{ padding: '20px'}} to="/register">Inscription</Link>
          <Link  style={{ padding: '20px'}}to="/create">Créer un Post</Link>
        </nav>
                <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/posts/:id" element={<PostDetail />} />
          </Routes>
        </div>
        
    </div>
    </BrowserRouter>
  );
}

export default App;