import { useEffect, useState } from "react";
import CheckboxOption from "../components/CheckBoxOption";
import Navbar from "../components/Navbar";
import { faFilter, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import useFetch from "../hooks/UseFetch";

const paketProvider = [
    { id: "provider1", label: "Telkomsel" },
    { id: "provider2", label: "Tri" },
    { id: "provider3", label: "XL" },
    { id: "provider4", label: "Axis" },
    { id: "provider5", label: "Indosat" },
    { id: "provider6", label: "Smartfren" },
];

const paketQuota = [
    { id: "quota1", label: "50 GB Keatas" },
    { id: "quota2", label: "30 GB - 50 GB" },
    { id: "quota3", label: "10 GB - 20 GB" },
    { id: "quota4", label: "1 GB - 5 GB" },
];

const paketDateRange = [
    { id: "date1", label: "30 Hari" },
    { id: "date2", label: "10 hari" },
    { id: "date3", label: "7 Hari" },
    { id: "date4", label: "1 Hari" },
];

const PaketData = () => {
    useEffect(() => {
        document.title = 'KuotaDong | Paket Data';
    }, []);

    const { data: products, loading } = useFetch("http://localhost:3000/products");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Filter Logic
    const [filters, setFilters] = useState({
        provider: [],
        quota: [],
        dateRange: [],
    });

    const handleCheckboxChange = (filterType, value) => {
        setFilters((prevFilters) => {
            const currentValues = prevFilters[filterType];
            const updatedValues = currentValues.includes(value)
                ? currentValues.filter((item) => item !== value)
                : [...currentValues, value];
            return { ...prevFilters, [filterType]: updatedValues };
        });
    };

    const filterProducts = () => {
        return products.filter((product) => {
            // Filter Provider
            const providerPilihan =
                filters.provider.length === 0 || filters.provider.includes(product.provider);

            // Filter Kuota
            const kuotaPilihan =
                filters.quota.length === 0 ||
                filters.quota.some((quotaFilter) => {
                    switch (quotaFilter) {
                        case "50 GB Keatas":
                            return product.quota > 50;
                        case "30 GB - 50 GB":
                            return product.quota >= 30 && product.quota <= 50;
                        case "10 GB - 20 GB":
                            return product.quota >= 10 && product.quota <= 20;
                        case "1 GB - 5 GB":
                            return product.quota >= 1 && product.quota <= 5;
                        default:
                            return true;
                    }
                });

            // Filter Masa Berlaku
            const masaBerlakuPilihan =
                filters.dateRange.length === 0 ||
                filters.dateRange.some((dateRangeFilter) => {
                    switch (dateRangeFilter) {
                        case "30 Hari":
                            return product.dateRange === 30;
                        case "10 hari":
                            return product.dateRange === 10;
                        case "7 Hari":
                            return product.dateRange === 7;
                        case "1 Hari":
                            return product.dateRange === 1;
                        default:
                            return true;
                    }
                });

            return providerPilihan && kuotaPilihan && masaBerlakuPilihan;
        });
    };

    const filteredProducts = filterProducts();

    // Filter Responsive 
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div>
            <Navbar />
            <div className="w-full mt-[80px] p-5">
                <h1 className="font-medium text-lg mb-5">Home &rarr; Paket Data</h1>
                <div className="w-full flex gap-5">
                    <div
                        className={`max-md:fixed max-md:top-0 max-md:left-0 max-md:z-[100] max-md:h-screen max-md:shadow-xl max-md:p-4 max-md:bg-white max-md:w-80 max-md:transition-transform ${isFilterOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"
                            } md:static md:w-3/12 md:border md:rounded-lg md:p-5 md:h-fit`}
                    >
                        <button
                            type="button"
                            onClick={toggleFilter}
                            className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl w-8 h-8 absolute top-2.5 right-2.5 flex items-center justify-center max-md:block hidden"
                        >
                            <FontAwesomeIcon icon={faX} />
                        </button>
                        <h1 className="font-bold text-xl pb-4 border-b border-neutral-300">Filters</h1>
                        <div>
                            <h1 className="text-md py-3">Provider</h1>
                            <div className="grid grid-cols-1 max-md:grid-cols-2 gap-3">
                                {paketProvider.map((provider) => (
                                    <CheckboxOption
                                        key={provider.id}
                                        id={provider.id}
                                        label={provider.label}
                                        onChange={() => handleCheckboxChange("provider", provider.label)}
                                    />
                                ))}
                            </div>
                            <h1 className="text-md py-3">Kuota</h1>
                            <div className="grid grid-cols-1 max-md:grid-cols-2 gap-3">
                                {paketQuota.map((quota) => (
                                    <CheckboxOption
                                        key={quota.id}
                                        id={quota.id}
                                        label={quota.label}
                                        onChange={() => handleCheckboxChange("quota", quota.label)}
                                    />
                                ))}
                            </div>
                            <h1 className="text-md py-3">Masa Berlaku</h1>
                            <div className="grid grid-cols-1 max-md:grid-cols-2 gap-3">
                                {paketDateRange.map((daterange) => (
                                    <CheckboxOption
                                        key={daterange.id}
                                        id={daterange.id}
                                        label={daterange.label}
                                        onChange={() => handleCheckboxChange("dateRange", daterange.label)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-9/12 max-md:w-full">
                        <h1 className="font-bold text-4xl pb-5">Paket Data yang Tersedia</h1>
                        <button onClick={toggleFilter} className="hidden max-md:block bg-neutral-100 hover:bg-neutral-300 border-2 border-slate-300 py-2 px-5 font-semibold text-md rounded">
                            <FontAwesomeIcon icon={faFilter} /> Filter
                        </button>
                        <div className="grid grid-cols-3 gap-5 max-xl:grid-cols-2 max-[991px]:grid-cols-1 mt-5">
                            {currentProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    header={product.header}
                                    provider={product.provider}
                                    productName={product.productName}
                                    quota={product.quota}
                                    dateRange={product.dateRange}
                                    price={product.price}
                                />
                            ))}
                        </div>

                        {/* Pagination Section */}
                        <div className="flex justify-center items-center my-10">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-l disabled:opacity-50"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span className="mx-3">{`Page ${currentPage} of ${totalPages}`}</span>
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-r disabled:opacity-50"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PaketData;