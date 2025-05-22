
function Products({ products, onAddToCart }) {

  const updateProductQuantity = (id, newQuantity) => {
    setProducts(prev => 
      prev.map(p => p.id === id ? { ...p, quantity: newQuantity } : p)
    );
  };

  return (
    <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-3">
      {products.map((product, index) => (
        <div className="col" key={index}>
          <div className="product-item" style={{textAlign:'center'}}>
            <span className="badge bg-success position-absolute m-3">-{Math.round(product.promo)}%</span>
            <figure>
              <a href="index.html" title={product.name}>
                <img src={'images/products/'+product.photo} className="tab-image zzz" alt={index} />
              </a>
            </figure>
            <h3>{product.name}</h3>
            <i>{product.type}</i>
            <span className="price">{product.price} DH</span>
            <div>
              <div className="input-group product-qty">
                <span className="input-group-btn">
                  <button 
                    type="button" 
                    className="quantity-left-minus btn btn-danger btn-number"
                    onClick={() => {
                      const newQuantity = Math.max(1, product.quantity - 1);
                      updateProductQuantity(product.id, newQuantity);
                    }}
                  >
                    <svg width="16" height="16"><use xlinkHref="#minus"></use></svg>
                  </button>
                </span>
                <input 
                  type="text" 
                  id={`quantity-${product.id}`} 
                  name="quantity" 
                  className="form-control input-number" 
                  value={product.quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    updateProductQuantity(product.id, value);
                  }}
                />
                <span className="input-group-btn">
                  <button 
                    type="button" 
                    className="quantity-right-plus btn btn-success btn-number"
                    onClick={() => {
                      updateProductQuantity(product.id, product.quantity + 1);
                    }}
                  >
                    <svg width="16" height="16"><use xlinkHref="#plus"></use></svg>
                  </button>
                </span>
              </div>
              <button 
                onClick={() => onAddToCart(product.id, product.quantity)} 
                className="btn btn-primary"
              >
                Add to Cart <iconify-icon icon="uil:shopping-cart"/>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;