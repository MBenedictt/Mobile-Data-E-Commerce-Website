import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import useFetch from "../hooks/UseFetch";

const Admin = () => {
    const { data: orders, loading } = useFetch('http://localhost:3000/orders');
    const [updatedOrders, setUpdatedOrders] = useState([]);

    useEffect(() => {
        // Sync the fetched orders with local state for updates
        if (orders.length) setUpdatedOrders(orders);
    }, [orders]);

    useEffect(() => {
        document.title = 'KuotaDong | Admin';
    }, []);

    // Function to handle status update
    const handleStatusChange = (orderId, newStatus) => {
        fetch(`http://localhost:3000/orders/${Number(orderId)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
        })
            .then(response => response.json())
            .then(updatedOrder => {
                // Update the local state to reflect the status change
                setUpdatedOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.id === updatedOrder.id ? { ...order, status: updatedOrder.status } : order
                    )
                );
            })
            .catch(error => console.error("Error updating order status:", error));
    };

    // Function to handle order deletion
    const handleDelete = (orderId) => {
        fetch(`http://localhost:3000/orders/${orderId}`, {
            method: 'DELETE',
        })
            .then(() => {
                // Remove the order from local state
                setUpdatedOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
            })
            .catch(error => console.error("Error deleting order:", error));
    };

    return (
        <div className="w-full h-screen">
            <Navbar />
            <div className="w-full h-full flex flex-col items-center pt-[120px]">
                <h1 className="font-bold text-3xl text-center">Daftar Pesanan Paket Data</h1>
                <div className="mt-5 h-[400px] overflow-y-scroll max-xl:w-11/12 max-sm:w-[300px] border-t-2 border-b-2 border-neutral-300">
                    {loading ? (
                        <p className="text-center">Loading...</p>
                    ) : (
                        <table className="table-fixed">
                            <thead className="border-b-2 border-neutral-300">
                                <tr>
                                    <th className="px-8 py-2">No</th>
                                    <th className="px-8 py-2">Username</th>
                                    <th className="px-8 py-2">No Telp</th>
                                    <th className="px-8 py-2">Paket Data</th>
                                    <th className="px-8 py-2">Bukti</th>
                                    <th className="px-8 py-2">Status</th>
                                    <th className="px-8 py-2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {updatedOrders.length > 0 ? (
                                    updatedOrders.map((order, index) => (
                                        <tr key={order.id}>
                                            <td className="px-8 py-2 text-center">{index + 1}</td>
                                            <td className="px-8 py-2 text-center">{order.username}</td>
                                            <td className="px-8 py-2 text-center">{order.notelp}</td>
                                            <td className="px-8 py-2 text-center">{order.paketdata}</td>
                                            <td className="px-8 py-2 text-center">
                                                <a
                                                    className="underline text-sky-500 hover:text-sky-700"
                                                    href={order.bukti}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Bukti.png
                                                </a>
                                            </td>
                                            <td className="px-8 py-2 text-center">{order.status}</td>
                                            <td className="px-8 py-2 flex max-xl:mt-2">
                                                {order.status === "Belum Validasi" ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusChange(order.id, "Sudah Divalidasi")}
                                                            className="px-2 py-1 bg-neutral-300 rounded mr-2 hover:bg-blue-400 transition duration-200"
                                                        >
                                                            Validasi
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusChange(order.id, "Dibatalkan")}
                                                            className="px-2 py-1 bg-neutral-300 rounded hover:bg-red-400 transition duration-200"
                                                        >
                                                            Batal
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => handleDelete(order.id)}
                                                        className="px-2 py-1 bg-neutral-300 rounded hover:bg-red-400 transition duration-200"
                                                    >
                                                        Hapus
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-8 py-2 text-center">No orders available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;