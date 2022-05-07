import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import Loading from "../../app/layout/Loading";
import { Product } from "../../app/models/Product";
import ProductList from "./ProductList";

export default function Catalog(){
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      agent.Catalog.list().then(products => setProducts(products))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }, []) //[] array dependency olmazsa products array i sürekli gelir. 

    if(loading) return <Loading message="Loading Products..." />

    return (
        <>
            <ProductList products={products}></ProductList>
        </>
    )
}