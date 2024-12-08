import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddBook from "./pages/AddBook"
import Layout from "./pages/Layout";
import Profile from './pages/Profile';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/addBook" element={<AddBook/>}/>
                </Route>
                <Route path="/" element={<Layout/>}>
                    <Route path="/profile" element={<Profile/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
