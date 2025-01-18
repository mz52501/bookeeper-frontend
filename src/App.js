import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AddBook from "./pages/AddBook"
import Layout from "./pages/Layout";
import Profile from './pages/Profile';
import Books from './pages/Books';
import BookDetail from './pages/BookDetail';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage'
import {AuthProvider} from './context/AuthContext';
import AddLoan from './pages/AddLoan';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Layout/>}>
                        <Route path="/addBook" element={<AddBook/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/books" element={<Books/>}/>
                        <Route path="/books/:id" element={<BookDetail/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/addLoan" element={<AddLoan/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
