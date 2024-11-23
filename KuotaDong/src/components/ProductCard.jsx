/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({
    header,
    provider,
    productName,
    quota,
    dateRange,
    price,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [notelp, setNotelp] = useState('');

    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newOrder = {
            id: Date.now().toString(),
            username,
            notelp,
            paketdata: productName,
            bukti: "/assets/img/bukti.png",
            status: "Belum Validasi"
        };

        try {
            const response = await fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newOrder)
            });

            if (response.ok) {
                alert('Order submitted successfully!');
                window.location.reload();
            } else {
                alert('Failed to submit order. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="relative w-full h-[300px] bg-[url('/assets/img/card-bg.jpg')] bg-cover rounded-lg shadow-lg p-5 flex flex-col justify-between">
            <div>
                <p className="py-2 px-4 w-fit rounded-tl-lg rounded-br-lg text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500">
                    {header}
                </p>
                <h2 className="mt-5 text-gray-500">{provider}</h2>
                <h2 className="font-bold text-lg">{productName}</h2>
                <div className="flex items-center mt-2">
                    <h1 className="font-bold text-5xl text-sky-400 border-r-4 border-sky-400 pr-3">
                        {quota} GB
                    </h1>
                    <p className="text-gray-500 pl-3">{dateRange} Hari</p>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <p className="font-bold text-2xl max-xl:text-xl">{formattedPrice}</p>
                <button
                    onClick={toggleModal}
                    className="px-7 py-2 rounded-full font-medium text-lg bg-sky-400 text-white hover:bg-sky-500 transition duration-200"
                >
                    Beli
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={toggleModal}
                    ></div>

                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] max-md:w-[300px] max-md:h-[430px] bg-slate-50 rounded-lg shadow-lg z-50 p-5 flex flex-col">
                        <button
                            onClick={toggleModal}
                            className="self-end text-gray-500 hover:text-gray-800 transition"
                        >
                            <FontAwesomeIcon icon={faX} size="lg" />
                        </button>

                        <div className="flex flex-col">
                            <h1 className="font-bold text-xl max-md:text-lg">
                                {productName}<span className='font-light'> — {formattedPrice}</span>
                            </h1>
                            <form onSubmit={handleSubmit} className='mt-5'>
                                <label htmlFor="username" className="block text-md text-neutral-500 font-medium">Nama Lengkap : </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="text-sm w-full py-2 bg-slate-50 border-b border-slate-500 focus:outline-0 focus:border-blue-600 focus:border-b-2 mb-5"
                                    placeholder="John Doe"
                                    required
                                />
                                <label htmlFor="notelp" className="block text-md text-neutral-500 font-medium">No HP : </label>
                                <input
                                    type="text"
                                    name="notelp"
                                    id="notelp"
                                    value={notelp}
                                    onChange={(e) => setNotelp(e.target.value)}
                                    className="text-sm w-full py-2 bg-slate-50 border-b border-slate-500 focus:outline-0 focus:border-blue-600 focus:border-b-2 mb-5"
                                    placeholder="08123456789"
                                    required
                                />
                                <label htmlFor="bukti" className="block text-md text-neutral-500 font-medium">Upload Bukti Pembayaran : </label>
                                <input type="file" className='block' />

                                <button type='submit' className='flex w-full justify-center py-3 mt-5 rounded-xl text-white font-medium bg-sky-500 hover:bg-sky-600'>
                                    Konfirmasi Pembayaran
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCard;