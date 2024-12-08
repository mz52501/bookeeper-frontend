import {usePostData} from "../hooks/UsePostData";
import {useState} from "react";
import LoadingPage from "./LoadingPage";
import {useFetchData} from "../hooks/UseFetchData";

export default function AddBook() {

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        year: ''
    });

    const {responseData, loading: postLoading, error: postError, postData} = usePostData('/addBook', formData);

    const {data, loading: getLoading, error: getError} = useFetchData("/books");

    const handleSubmit = (e) => {
        e.preventDefault();
        postData();  // Call postData to trigger the POST request
        window.location.reload();
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value  // Dynamically update the state based on the input field's name
        }));
    };

    if (getError || postError) return <div>Something went wrong!</div>
    if (getLoading) return <LoadingPage/>

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="mt-10">
                <p className="text-3xl font-semibold">Add new book</p>
            </div>
            <form className="flex flex-col items-center space-y-6 p-6"
                  onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Book title"
                    className="w-72 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Author of the book"
                    className="w-72 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
                <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="Year of publishing"
                    className="w-72 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
                <button
                    type="submit"
                    className="w-72 p-3 bg-gray-200 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 shadow-md"
                >
                    <p className="text-xl">Submit
                        Answer</p>
                </button>
            </form>
            <div className="w-3/5 mb-2">
                <p className="text-3xl">Available books</p>
            </div>
            {data.map((book) =>
                <div className="p-2 bg-gray-200 rounded-lg shadow-md mb-4 w-3/5">
                    <p className="text-lg">{book.title + ", " + book.author + ", PUBLISHED:" + book.year}</p>
                </div>
            )}
            <button onClick={() => window.location.href = '/'}>
                Back to dashboard
            </button>
        </div>
    )
}
