/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({
    header,
    provider,
    productName,
    quota,
    dateRange,
    price,
    link
}) => {

    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);

    return (
        <div className="w-full h-[300px] bg-[url('/assets/img/card-bg.jpg')] bg-cover rounded-lg shadow-lg p-5 flex flex-col justify-between">
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
                <Link to={link} className="px-7 py-2 rounded-full font-medium text-lg bg-sky-400 text-white hover:bg-sky-500 transition duration-200">
                    Beli
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;