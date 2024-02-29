import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((response) => response.json())
      .then((json) => setProducts(json.products));
  }, []);

  //seeting the current page that we are in
  const selectedPageHandler = (page) => {
    setSelectedPage(page);
  };

  return (
    <div className="App">
      <h1>Products</h1>
      <div className="products__container">
        {products.length > 0 &&
          products
            .slice(selectedPage * 10 - 10, selectedPage * 10) //slicing array like if we are on page 2 then 2 * 10 -10 = 10 to 20.
            .map((product) => (
              <div key={product.id} className="product__card">
                <img src={product.thumbnail} alt="item" />
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>{product.price}</p>
              </div>
            ))}
      </div>

      {products.length > 0 && (
        <div className="pagination__container">
          {selectedPage > 1 && ( //if we are not on page 1 then show prev button
            <button onClick={() => selectedPageHandler(selectedPage - 1)}>
              Prev
            </button>
          )}

          {[...Array(products.length / 10)].map((_, index) => (
            <h3
              key={index}
              className={`page ${selectedPage === index + 1 ? "active" : ""}`}
              onClick={() => selectedPageHandler(index + 1)}
            >
              {index + 1}
              {/* showing page number */}
            </h3>
          ))}

          {selectedPage < products.length / 10 && ( //if we are not on last page then show next button
            <button onClick={() => selectedPageHandler(selectedPage + 1)}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}
