import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddBook from "./pages/AddBook"
import Layout from "./pages/Layout";
import Profile from './pages/Profile';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';

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
                <Route path="/" element={<Layout/>}>
                    <Route path="/books" element={<Books/>}/>
                </Route>
                <Route path="/" element={<Layout/>}>
                    <Route path="/books/:id" element={<BookDetail/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
