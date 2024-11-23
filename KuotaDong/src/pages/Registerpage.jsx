import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    useEffect(() => {
        document.title = 'KuotaDong | Register';
    }, []);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const newUser = {
            username,
            password,
        };

        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Registration successful!");
                    navigate("/login");
                } else {
                    alert("Failed to register. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error registering user:", error);
            });
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-sky-300">
            <div className="shadow-xl flex rounded-xl">
                <div className="w-[300px] h-[450px] bg-[url('/assets/img/bg-hero.webp')] bg-cover bg-center rounded-l-xl max-sm:hidden">
                    <div className="w-full h-full bg-cyan-500 opacity-70 rounded-l-xl"></div>
                </div>
                <div className="w-[400px] h-[450px] bg-slate-50 rounded-r-xl p-5 max-sm:w-[320px] max-sm:rounded-xl flex flex-col justify-center">
                    <h1 className="font-bold text-3xl text-center mb-7">Register</h1>
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
                            className="text-sm w-full py-2 bg-slate-50 border-b border-slate-500 focus:outline-0 focus:border-blue-600 focus:border-b-2 mb-5"
                            placeholder="*******"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="confirmPassword" className="block text-md text-neutral-500 font-medium">Confirm Password : </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="text-sm w-full py-2 bg-slate-50 border-b border-slate-500 focus:outline-0 focus:border-blue-600 focus:border-b-2"
                            placeholder="*******"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <p className="mt-2 text-sm">Sudah punya akun? <Link to="/login" className="text-sky-500 hover:underline">Login</Link></p>
                        <button
                            type="submit"
                            className="text-sm w-full py-3 bg-sky-500 text-white rounded-md hover:bg-sky-600 mt-10"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;