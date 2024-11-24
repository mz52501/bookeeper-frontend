import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddBook from "./pages/AddBook"
import Layout from "./pages/Layout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/addBook" element={<AddBook/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
