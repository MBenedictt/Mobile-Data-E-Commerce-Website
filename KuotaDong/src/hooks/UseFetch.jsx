import { useState, useEffect } from "react";

const useFetch = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    return { products, loading };
};

export default useFetch;