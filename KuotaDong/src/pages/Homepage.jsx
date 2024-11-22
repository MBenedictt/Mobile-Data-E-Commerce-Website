import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useFetch from "../hooks/UseFetch";

const Home = () => {

    useEffect(() => {
        document.title = 'KuotaDong | Homepage';
    }, []);

    const [selectedProvider, setselectedProvider] = useState('Provider');
    const [selectedQuota, setSelectedQuota] = useState('Kuota');
    const [selectedDate, setSelectedDate] = useState('Masa Berlaku');
    const [providerDropdownOpen, setproviderDropdownOpen] = useState(false);
    const [quotaDropdownOpen, setQuotaDropdownOpen] = useState(false);
    const [dateDropdownOpen, setDateDropdownOpen] = useState(false);

    const providerRef = useRef(null);
    const quotaRef = useRef(null);
    const dateRef = useRef(null);

    const toggleDropdown = (dropdown) => {
        if (dropdown === 'provider') {
            setproviderDropdownOpen(!providerDropdownOpen);
            setQuotaDropdownOpen(false);
            setDateDropdownOpen(false);
        } else if (dropdown === 'quota') {
            setQuotaDropdownOpen(!quotaDropdownOpen);
            setproviderDropdownOpen(false);
            setDateDropdownOpen(false);
        } else if (dropdown === 'date') {
            setDateDropdownOpen(!dateDropdownOpen);
            setproviderDropdownOpen(false);
            setQuotaDropdownOpen(false);
        }
    };

    const handleOutsideClick = (event) => {
        if (
            providerRef.current && !providerRef.current.contains(event.target) &&
            quotaRef.current && !quotaRef.current.contains(event.target) &&
            dateRef.current && !dateRef.current.contains(event.target)
        ) {
            setproviderDropdownOpen(false);
            setQuotaDropdownOpen(false);
            setDateDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const handleSelect = (dropdown, value) => {
        if (dropdown === 'provider') {
            setselectedProvider(value);
            setproviderDropdownOpen(false);
        } else if (dropdown === 'quota') {
            setSelectedQuota(value);
            setQuotaDropdownOpen(false);
        } else if (dropdown === 'date') {
            setSelectedDate(value);
            setDateDropdownOpen(false);
        }
    };

    const providers = ['Telkomsel', 'Tri', 'XL', 'Axis', 'Indosat', 'Smartfren'];
    const [activeProvider, setActiveProvider] = useState(providers[0]);

    const { loading, filterByProvider } = useFetch();
    const filteredProducts = filterByProvider(activeProvider);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <Navbar />

            {/* Hero Section */}
            <div className="w-full mt-[100px] px-10 max-lg:px-7 max-sm:px-3">
                <div className="w-full h-[600px] max-md:h-[500px] bg-[url('/assets/img/bg-hero.webp')] bg-cover bg-center rounded-xl">
                    <div className="w-full h-full bg-sky-600 bg-opacity-80 rounded-xl p-10 max-md:p-5 pt-[120px] max-sm:pt-[60px]">
                        <p className="font-semibold text-white mb-1 max-lg:text-center">Nggak ada kuota buat chat mantan?</p>
                        <h1 className="font-bold py-3 text-white text-5xl w-2/6 max-xl:w-3/6 max-lg:w-full max-lg:text-center max-md:text-3xl">Yuk Pilih Paket Data Anda</h1>
                        <div className="bg-white flex justify-between items-center w-fit mt-10 py-3 px-5 rounded-lg max-[991px]:flex-col max-[991px]:w-full">
                            <div className="max-[991px]:w-full flex justify-between items-center max-md:flex-col">
                                <div className="relative inline-block border-r-2 max-md:border-r-0 max-md:border-b-2 max-[991px]:w-full max-md:py-3" ref={providerRef}>
                                    <button
                                        id="btnProvider"
                                        onClick={() => toggleDropdown('provider')}
                                        className="w-[180px] max-[991px]:w-full flex justify-between items-center pr-5 max-md:pr-0 text-neutral-500 hover:text-neutral-800"
                                    >
                                        <span>{selectedProvider}</span>
                                        <FontAwesomeIcon icon={faChevronDown} className="text-[14px]" />
                                    </button>
                                    {providerDropdownOpen && (
                                        <div id="providerDropdown" className="z-10 w-[280px] max-md:w-full bg-white top-[50px] absolute border-slate-300 rounded-lg border p-3">
                                            <form action="" className="flex items-center border-[1px] border-slate-500 rounded-lg px-5 py-2">
                                                <input type="text" className="w-full focus:outline-none" placeholder="Cari provider" />
                                                <FontAwesomeIcon icon={faMagnifyingGlass} className="pl-2" />
                                            </form>
                                            <p className="w-full border-b-2 border-slate-300 text-[12px] font-medium mt-5 pb-1">Pilih Provider</p>
                                            <ul className="h-[300px] overflow-y-scroll">
                                                {['Telkomsel', 'Tri', 'XL', 'Axis', 'Indosat', 'Smartfren'].map(provider => (
                                                    <li
                                                        key={provider}
                                                        onClick={() => handleSelect('provider', provider)}
                                                        className="font-semibold py-4 hover:bg-neutral-200 cursor-pointer px-2 border-b border-slate-300"
                                                    >
                                                        {provider}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="relative inline-block border-r-2 max-md:border-r-0 max-md:border-b-2 max-[991px]:w-full max-md:py-3" ref={quotaRef}>
                                    <button
                                        id="btnQuota"
                                        onClick={() => toggleDropdown('quota')}
                                        className="w-[180px] max-[991px]:w-full flex justify-between items-center px-5 max-md:pr-0 max-md:px-0 text-neutral-500 hover:text-neutral-800"
                                    >
                                        <span>{selectedQuota}</span>
                                        <FontAwesomeIcon icon={faChevronDown} className="text-[14px]" />
                                    </button>
                                    {quotaDropdownOpen && (
                                        <div id="quotaDropdown" className="z-10 w-[280px] max-md:w-full bg-white absolute top-[50px] border-slate-300 rounded-lg border p-3">
                                            <form action="" className="flex items-center border-[1px] border-slate-500 rounded-lg px-5 py-2">
                                                <input type="text" className="w-full focus:outline-none" placeholder="Cari Jumlah Kuota" />
                                                <FontAwesomeIcon icon={faMagnifyingGlass} className="pl-2" />
                                            </form>
                                            <p className="w-full border-b-2 border-slate-300 text-[12px] font-medium mt-5 pb-1">Pilih Jumlah Kuota</p>
                                            <ul>
                                                {['50 GB Keatas', '30 GB - 50 GB', '10 GB - 20 GB', '5 GB - 10 GB', '1 GB - 5 GB', 'Dibawah 1 GB'].map(quotaRange => (
                                                    <li
                                                        key={quotaRange}
                                                        onClick={() => handleSelect('quota', quotaRange)}
                                                        className="font-semibold py-4 hover:bg-neutral-200 cursor-pointer px-2 border-b border-slate-300"
                                                    >
                                                        {quotaRange}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="relative inline-block border-r-2 max-[991px]:border-0 max-md:border-b-2 max-[991px]:w-full max-md:py-3" ref={dateRef}>
                                    <button
                                        id="btnDate"
                                        onClick={() => toggleDropdown('date')}
                                        className="w-[180px] max-[991px]:w-full flex justify-between items-center px-5 max-md:pr-0 max-md:px-0 text-neutral-500 hover:text-neutral-800"
                                    >
                                        <span className="text-start">{selectedDate}</span>
                                        <FontAwesomeIcon icon={faChevronDown} className="text-[14px]" />
                                    </button>
                                    {dateDropdownOpen && (
                                        <div id="dateDropdown" className="z-10 w-[280px] max-md:w-full bg-white absolute top-[50px] border-slate-300 rounded-lg border p-3">
                                            <form action="" className="flex items-center border-[1px] border-slate-500 rounded-lg px-5 py-2">
                                                <input type="text" className="w-full focus:outline-none" placeholder="Cari Masa Berlaku" />
                                                <FontAwesomeIcon icon={faMagnifyingGlass} className="pl-2" />
                                            </form>
                                            <p className="w-full border-b-2 border-slate-300 text-[12px] font-medium mt-5 pb-1">Pilih Masa Berlaku</p>
                                            <ul>
                                                {['Seumur Hidup', '30 Hari', '10 Hari', '7 Hari', '1 Hari'].map(dateRange => (
                                                    <li
                                                        key={dateRange}
                                                        onClick={() => handleSelect('date', dateRange)}
                                                        className="font-semibold py-4 hover:bg-neutral-200 cursor-pointer px-2 border-b border-slate-300"
                                                    >
                                                        {dateRange}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Link to="/paket-data" className="bg-blue-600 text-white w-[140px] flex justify-evenly items-center px-2 py-2 ml-5 rounded hover:bg-blue-700 max-[991px]:w-full max-[991px]:ml-0 max-[991px]:justify-center max-[991px]:mt-5">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
                                Cari Paket
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Provider List */}
            <div className="w-full py-[100px] max-md:py-[50px] px-[80px] max-lg:px-10 max-md:px-3">
                <div className="w-full flex justify-between items-center max-md:grid max-md:grid-cols-2 max-md:gap-5 max-md:place-items-center">
                    <img src="/assets/img/telkomsel.webp" alt="telkomsel" className="w-[200px] max-lg:w-[150px] max-md:w-[100px] opacity-50" />
                    <img src="/assets/img/indosat.png" alt="indosat" className="w-[180px] max-lg:w-[150px] max-md:w-[100px] opacity-50" />
                    <img src="/assets/img/tri.png" alt="tri" className="w-[120px] max-lg:w-[100px] max-md:w-[80px] opacity-50" />
                    <img src="/assets/img/xl.png" alt="xl" className="w-[200px] max-lg:w-[150px] max-md:w-[120px] opacity-50" />
                </div>
            </div>

            {/* Promo Section */}
            <div className="w-full py-[10px] px-[80px] max-lg:px-10 max-md:px-7 py-5">
                <h1 className="text-4xl max-md:text-3xl font-bold w-full pb-5 text-center">Promo Terbaik</h1>
                <div className="flex flex-wrap gap-[60px] max-md:gap-x-10 max-md:gap-y-3 justify-center items-center py-2">
                    {providers.map((provider, index) => (
                        <div
                            key={index}
                            className="cursor-pointer relative group flex font-medium py-2"
                            onClick={() => setActiveProvider(provider)}
                        >
                            <span
                                className={`pb-1 relative after:w-0 after:h-[3px] after:bg-black after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300 
                ${activeProvider === provider
                                        ? 'text-black after:w-full'
                                        : 'text-gray-500 group-hover:text-black group-hover:after:w-full'
                                    }`}
                            >
                                {provider}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-5 py-7">
                    {filteredProducts.slice(0, 3).map((product, index) => (
                        <ProductCard
                            key={index}
                            header={product.header}
                            headerBg={product.headerBg}
                            provider={product.provider}
                            productName={product.productName}
                            quota={product.quota}
                            dateRange={product.dateRange}
                            price={product.price}
                            link={product.link}
                        />
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Home