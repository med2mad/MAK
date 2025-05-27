import { useEffect, useState } from 'react';
import Nav from './Nav';
import Products from './Products';
import Footer from './Footer';

function Home() {
    const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    coupon_code: ''
  });

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/') 
      .then(response => response.json())
      .then(data => {
        setProducts(data.rows.map(product => ({ ...product, quantity: 1 })));
      })
  }, []);

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const ids = cartItems.map(item => item.id);
      fetch('http://localhost:8000/cart?ids=' + ids.join(',')) 
        .then(response => response.json())
        .then(data => {
          const updatedCart = data.rows.map(product => {
            const cartItem = cartItems.find(item => item.id === product.id);
            return { ...product, quantity: cartItem ? cartItem.quantity : 1 };
          });
          setCartItems(updatedCart);
        });
    } else {
      setCartItems([]);
    }
  }, [cartItems.map(item => item.id).join(',')]);

  const onAddToCart = (id, quantity = 1) => {
    setCartItems(prevCartItems => {
      const existingItem = prevCartItems.find(item => item.id === id);
      if (existingItem) {
        return prevCartItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCartItems, { id, quantity }];
      }
    });
  };

  const onRemoveFromCart = (id) => {
    setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== id));
  };

const updateCartItemQuantity = (id, newQuantity) => {
  if (newQuantity < 1) {
    newQuantity = 1;
  }
  
  setCartItems(prevCartItems =>
    prevCartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
  );
};

const handleCustomerInfoChange = (e) => {
  const { name, value } = e.target;
  setCustomerInfo(prev => ({
    ...prev,
    [name]: value
  }));
};

const submitOrder = () => {
  // Validate required fields
  if (!customerInfo.name || !customerInfo.phone) {
    alert('Please fill in all required fields (Name and Phone)');
    return;
  }

  const orderData = {
    ...customerInfo, // Include all customer info
    products: cartItems.map(item => ({
      id: item.id,
      quantity: item.quantity
    })),
    total: cartItems.reduce(
      (sum, product) => sum + Number(product.price) * product.quantity, 0
    ).toFixed(2)
  };

  fetch('http://localhost:8000/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(orderData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    alert('Order submitted successfully!');
    setCartItems([]);
    // Reset customer info
    setCustomerInfo({
      name: '',
      email: '',
      phone: '',
      address: '',
      coupon_code: ''
    });
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was an error submitting your order');
  });
};

  return (
    <>

    <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasCart" aria-labelledby="My Cart">
      <div className="offcanvas-header justify-content-center">
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <div className="order-md-last">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </h4>
          <ul className="list-group mb-3">
            {cartItems.map((product, index) => (
<li key={index} className="list-group-item d-flex justify-content-between align-items-center lh-sm">
  <div className="d-flex align-items-center" style={{ flex: 1, minWidth: 0 }}>
    <img 
      src={'images/products/'+product.photo} 
      style={{ width: '50px', height: '50px', marginRight: '15px', flexShrink: 0 }} 
      alt={product.name}
    />
    <h6 className="my-0" style={{ flex: 1 }}>{product.name}</h6>
  </div>
  <div className="d-flex align-items-center" style={{ flexShrink: 0 }}>
    <div className="input-group me-2">
      <button 
        className="btn btn-outline-secondary" style={{padding:'0 5px'}}
        onClick={() => updateCartItemQuantity(product.id, product.quantity - 1)}
      >
        -
      </button>
      <input 
        type="text" 
        className="form-control text-center px-0" 
        value={product.quantity}
        style={{width: '20px'}}
        onChange={(e) => {
          const value = parseInt(e.target.value) || 1;
          updateCartItemQuantity(product.id, value);
        }}
      />
      <button 
        className="btn btn-outline-secondary" style={{padding:'0 5px'}}
        onClick={() => updateCartItemQuantity(product.id, product.quantity + 1)}
      >
        +
      </button>
    </div>
    <span className="text-body-secondary me-1" style={{ minWidth: '50px', textAlign: 'right' }}>
      {(product.price * product.quantity).toFixed(2)}
    </span>
    <button 
      onClick={() => onRemoveFromCart(product.id)} 
      className="btn btn-sm btn-outline-danger py-0 px-2"
    >
      X
    </button>
  </div>
</li>
            ))}
            <li className="list-group-item d-flex justify-content-end">
              <span>Total :&nbsp;</span>
              <strong>{cartItems.reduce((sum, product)=> sum + Number(product.price) * product.quantity, 0).toFixed(2)} DH</strong>
            </li>
          </ul>

<button 
  onClick={submitOrder} 
  className="w-100 btn btn-primary btn-lg" 
  type="submit"
  disabled={cartItems.length === 0 || !customerInfo.name || !customerInfo.phone}
>
  Submit Order
</button>
        </div>







         <div className="mb-3">
      <h5 className="mb-3">Customer Information</h5>
      <div className="mb-3">
        <label htmlFor="name" className="form-label required">Full Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={customerInfo.name}
          onChange={handleCustomerInfoChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label required">Phone Number</label>
        <input
          type="tel"
          className="form-control"
          id="phone"
          name="phone"
          value={customerInfo.phone}
          onChange={handleCustomerInfoChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={customerInfo.email}
          onChange={handleCustomerInfoChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <textarea
          className="form-control"
          id="address"
          name="address"
          value={customerInfo.address}
          onChange={handleCustomerInfoChange}
          rows="2"
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="coupon_code" className="form-label">Coupon Code</label>
        <input
          type="text"
          className="form-control"
          id="coupon_code"
          name="coupon_code"
          value={customerInfo.coupon_code}
          onChange={handleCustomerInfoChange}
        />
      </div>
    </div>







      </div>
    </div>
    
    <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasSearch" aria-labelledby="Search">

    </div>

    <header>
      <div className="container-fluid">
        <div className="row pt-3 border-bottom">
          
          <div className="col-sm-4 col-lg-3 text-center text-sm-start">
            <div className="main-logo">
              <a href="index.html">
                <img src="images/logo.png" style={{width:'100px'}} alt="logo" className="img-fluid"/>
              </a>
            </div>
          </div>
          
          <div className="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block pt-3">
            <nav className="main-menu d-flex navbar navbar-expand-lg">
              <div className="offcanvas offcanvas-end">
                <div className="offcanvas-body">
                  <Nav />
                </div>
              </div>
            </nav>
          </div>
          
          <div className="col-sm-8 col-lg-4 d-flex justify-content-end gap-5 align-items-center mt-4 mt-sm-0 justify-content-center justify-content-sm-end">
            <ul className="d-flex justify-content-end list-unstyled m-0">
              <li className="d-lg-none">
                <a href="#" className="rounded-circle bg-light p-2 mx-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                  <svg width="24" height="24" viewBox="0 0 24 24"><use xlinkHref="#cart"></use></svg>
                </a>
              </li>
            </ul>

            <div className="cart text-end d-none d-lg-block dropdown">
              <button className="border-0 bg-transparent d-flex flex-column gap-2 lh-1" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                <span className="fs-6 text-muted dropdown-toggle">Your Cart</span>
                <span className="cart-total fs-5 fw-bold">
                  {cartItems.reduce(
                    (sum, product) => sum + Number(product.price) * product.quantity, 0
                  ).toFixed(2)} DH
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="d-flex  justify-content-center justify-content-sm-between align-items-center">
            <nav className="main-menu d-flex navbar navbar-expand-lg">

              <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header justify-content-center">
                  <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-md-none">
                  <Nav />
                </div>
              </div>
              </nav>
          </div>
        </div>
      </div>
    </header>
    
    <section style={{backgroundImage: "url('images/background-pattern.jpg')", backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">

            <div className="banner-blocks">
            
              <div className="banner-ad large bg-info block-1">

                <div className="swiper main-swiper">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="row banner-content p-5">
                        <div className="content-wrapper col-md-7">
                          <div className="categories my-3">100% natural</div>
                          <h3 className="display-4">Discover Moroccan Argan Oil with "KATY"</h3>
                          <p>In the argan oil production process there are no additives or shortcuts. All hand made and natural.</p>
                          <a href="#" className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1 px-4 py-3 mt-3">Shop Now</a>
                        </div>
                        <div className="img-wrapper col-md-5">
                          <img src="images/product-thumb-1.png" style={{width:'550px !important', maxWidth:'none'}} className="img-fluid"/>
                        </div>
                      </div>
                    </div>
                  </div>
                
                  <div className="swiper-pagination"></div>
                </div>

              </div>
              
              <div className="banner-ad bg-success-subtle block-2" style={{background:"url('images/ad-image-1.png') no-repeat", backgroundPosition: 'right bottom'}}>
                <div className="row banner-content p-5">
                  <div className="content-wrapper col-md-7">
                    <div className="categories sale mb-3 pb-3">15% off</div>
                    <h3 className="banner-title">Food and beauty</h3>
                    <a href="#" className="d-flex align-items-center nav-link">Shop Collection <svg width="24" height="24"><use xlinkHref="#arrow-right"></use></svg></a>
                  </div>
                </div>
              </div>

              <div className="banner-ad bg-danger block-3" style={{background:"url('images/ad-image-2.png') no-repeat", backgroundPosition: 'right bottom'}}>
                <div className="row banner-content p-5">
                  <div className="content-wrapper col-md-7">
                    <div className="categories sale mb-3 pb-3">10% off</div>
                    <h3 className="item-title">Baked & clean<br/>products</h3>
                    <a href="#" className="d-flex align-items-center nav-link">Shop Collection <svg width="24" height="24"><use xlinkHref="#arrow-right"></use></svg></a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>

    <section className="py-5">
      <div className="container-fluid">
        
        <div className="row">
          <div className="col-md-12">

            <div className="bootstrap-tabs product-tabs">
              <div className="tabs-header d-flex justify-content-between border-bottom my-5">
                <h3>Trending Products</h3>
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a href="#" className="nav-link text-uppercase fs-6 active" id="nav-all-tab" data-bs-toggle="tab" data-bs-target="#nav-all">All</a>
                    <a href="#" className="nav-link text-uppercase fs-6" id="nav-fruits-tab" data-bs-toggle="tab" data-bs-target="#nav-fruits">Fruits & Veges</a>
                    <a href="#" className="nav-link text-uppercase fs-6" id="nav-juices-tab" data-bs-toggle="tab" data-bs-target="#nav-juices">Juices</a>
                  </div>
                </nav>
              </div>
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab">
                  
<Products products={products} onAddToCart={onAddToCart} setProducts={setProducts} />




                </div>
                <div className="tab-pane fade" id="nav-fruits" role="tabpanel" aria-labelledby="nav-fruits-tab">
                  
                </div>
                <div className="tab-pane fade" id="nav-juices" role="tabpanel" aria-labelledby="nav-juices-tab">
                  
                </div>                
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <section className="py-5">
      <div className="container-fluid">
        <div className="row">
          
          <div className="col-md-6">
            <div className="banner-ad bg-danger mb-3" style={{background: "url('images/ad-image-3.png')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right'}}>
              <div className="banner-content p-5">
                <div className="categories text-primary fs-3 fw-bold">Upto 25% Off</div>
                <h3 className="banner-title">Honey</h3>
                <p>Very tasty, from our cozy garden</p>
                <a href="#" className="btn btn-dark text-uppercase">Show Now</a>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="banner-ad bg-info" style={{background: "url('images/ad-image-4.png')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right'}}>
              <div className="banner-content p-5">
                <div className="categories text-primary fs-3 fw-bold">Upto 25% Off</div>
                <h3 className="banner-title">100% Organic</h3>
                <p>From a farm, with natural ingredients only</p>
                <a href="#" className="btn btn-dark text-uppercase">Show Now</a>
              </div>
            </div>
          </div>
             
        </div>
      </div>
    </section>

    <section className="py-5 overflow-hidden">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="section-header d-flex flex-wrap justify-content-between my-5">
              <h2 className="section-title">Best selling</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">

            <div className="products-carousel swiper">
              <div className="swiper-wrapper">
                
                <div className="product-item swiper-slide" style={{textAlign:'center'}}>
                  <span className="badge bg-success position-absolute m-3">-15%</span>
                  <figure>
                    <a href="index.html" title="Product Title">
                      <img src="images/products/58.png"  className="tab-image bestzzz"/>
                    </a>
                  </figure>
                  <h3>Amlou oil</h3>
                  <i>Spread</i>
                  <span className="price">18.00 DH DH</span>
                  <div>
                    <button className="btn btn-primary">Add to Cart <iconify-icon icon="uil:shopping-cart"/></button>
                  </div>
                </div>

              </div>
            </div>
      
          </div>
        </div>
      </div>
    </section>

    <section id="latest-blog" className="py-5">
      <div className="container-fluid">
        <div className="row">
          <div className="section-header d-flex align-items-center justify-content-between my-5">
            <h2 className="section-title">Our Recent Blogs</h2>
            <div className="btn-wrap align-right">
              <a href="#" className="d-flex align-items-center nav-link">Read All Articles <svg width="24" height="24"><use xlinkHref="#arrow-right"></use></svg></a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <article className="post-item card border-0 shadow-sm p-3">
              <div className="image-holder zoom-effect">
                <a href="#">
                  <img src="images/posts/2.jpg" alt="post" className="card-img-top"/>
                </a>
              </div>
              <div className="card-body">
                <div className="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                  <div className="meta-date"><svg width="16" height="16"><use xlinkHref="#calendar"></use></svg>22 Aug 2021</div>
                  <div className="meta-categories"><svg width="16" height="16"><use xlinkHref="#category"></use></svg>tips & tricks</div>
                </div>
                <div className="post-header">
                  <h3 className="post-title">
                    <a href="#" className="text-decoration-none">About me</a>
                  </h3>
                  <p>As a young ambassador, I am an active member of the Morocco-China Association,
                    enthusiastically participating in conferences and events across Beijing, Xian, Yulin and Shanghai.</p>
                </div>
              </div>
            </article>
          </div>
          <div className="col-md-4">
            <article className="post-item card border-0 shadow-sm p-3">
              <div className="image-holder zoom-effect">
                <a href="#">
                  <img src="images/posts/3.jpg" alt="post" className="card-img-top"/>
                </a>
              </div>
              <div className="card-body">
                <div className="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                  <div className="meta-date"><svg width="16" height="16"><use xlinkHref="#calendar"></use></svg>25 Aug 2021</div>
                  <div className="meta-categories"><svg width="16" height="16"><use xlinkHref="#category"></use></svg>trending</div>
                </div>
                <div className="post-header">
                  <h3 className="post-title">
                    <a href="#" className="text-decoration-none">A Moroccan Journey for Chinese Visitors</a>
                  </h3>
                  <p>I invite Chinese visitors to discover our country, its culture and way of life.
                    They&apos;ll get to experience authentic moments and participate in traditional activities.</p>
                </div>
              </div>
            </article>
          </div>
          <div className="col-md-4">
            <article className="post-item card border-0 shadow-sm p-3">
              <div className="image-holder zoom-effect">
                <a href="#">
                  <img src="images/posts/1.jpg" alt="post" className="card-img-top"/>
                </a>
              </div>
              <div className="card-body">
                <div className="post-meta d-flex text-uppercase gap-3 my-2 align-items-center">
                  <div className="meta-date"><svg width="16" height="16"><use xlinkHref="#calendar"></use></svg>28 Aug 2021</div>
                  <div className="meta-categories"><svg width="16" height="16"><use xlinkHref="#category"></use></svg>inspiration</div>
                </div>
                <div className="post-header">
                  <h3 className="post-title">
                    <a href="#" className="text-decoration-none">My professional identity</a>
                  </h3>
                  <p>I obtained my master's degree in Xian, specializing in teaching Chinese as a second language 
                    to foreigners. I had experience teaching Chinese language at Hassan 2 University and London Academy, 
                    and also teaching Arabic language at the primary school of Shanghai International Studies University.</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <Footer/>
    </>
  )
}

export default Home