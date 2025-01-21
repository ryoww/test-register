import { Navigate, Route, Routes } from "react-router";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
    const uid = localStorage.getItem("uid");

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        uid ? (
                            <Navigate to={"/home"} />
                        ) : (
                            <Navigate to={"/register"} />
                        )
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;
