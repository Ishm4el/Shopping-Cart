import { useState } from "react";

import "./pages.css";
import useFetchGet from "../components/useFetchGet";

function ShopList() {
  const [products, setProducts] = useState<null | Products>(null);
  const error = useFetchGet({ link: "/products", setter: setProducts });
  if (error) return <p>ERROR</p>;
  if (products !== null && Array.isArray(products))
    return (
      <ul className="list-product">
        {products.map((product: Product) => (
          <li className="card-product" key={product.id}>
            <div className="product-image-container">
              <img
                className="product-image"
                src={product.image}
                alt={product.image}
              />
            </div>
            <p className="product-rating">
              Rating: {product.rating.rate} ({product.rating.count})
            </p>
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">Price: {product.price}</p>
            {/* <p className="product-description">{product.description}</p> */}
            {/* <p className="product-category">{product.category}</p> */}
          </li>
        ))}
      </ul>
    );
  return <p>Loading</p>;
}

export default function Shop() {
  return (
    <section className="section">
      <h1 className="section-title">Shop</h1>
      <article className="article">
        <h2 className="article-title">Shop Items</h2>
        <ShopList />
      </article>
    </section>
  );
}
