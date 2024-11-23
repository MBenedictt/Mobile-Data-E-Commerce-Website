import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/UseFetch";

const Login = () => {
    useEffect(() => {
        document.title = 'KuotaDong | Login';
    }, []);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { data: users, loading } = useFetch("http://localhost:3000/users");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loading) return;

        const user = users.find((user) => user.username === username && user.password === password);

        if (user) {
            if (user.username === "admin" && user.password === "123") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } else {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-sky-300">
            <div className="shadow-xl flex rounded-xl">
                <div className="w-[300px] h-[450px] bg-[url('/assets/img/bg-hero.webp')] bg-cover bg-center rounded-l-xl max-sm:hidden">
                    <div className="w-full h-full bg-cyan-500 opacity-70 rounded-l-xl"></div>
                </div>
                <div className="w-[400px] h-[450px] bg-slate-50 rounded-r-xl p-5 max-sm:w-[320px] max-sm:rounded-xl flex flex-col justify-center">
                    <h1 className="font-bold text-3xl text-center mb-7">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username" className="block text-md text-neutral-500 font-medium">Username : </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="text-sm w-full py-2 bg-slate-50 border-b border-slate-500 focus:outline-0 focus:border-blue-600 focus:border-b-2 mb-5"
                            placeholder="John Doe"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label htmlFor="password" className="block text-md text-neutral-500 font-medium">Password : </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="text-sm w-full py-2 bg-slate-50 border-b border-slate-500 focus:outline-0 focus:border-blue-600 focus:border-b-2"
                            placeholder="*******"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <p className="mt-2 text-sm">Belum punya akun? <Link to="/register" className="text-sky-500 hover:underline">Daftar disini</Link></p>
                        <button
                            type="submit"
                            className="text-sm w-full py-3 bg-sky-500 text-white rounded-md hover:bg-sky-600 mt-10"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;