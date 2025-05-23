import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const navigate = useNavigate();

const handleDelete = async () => {
  if (window.confirm('Delete this order?')) {
    try {
      const response = await fetch(`http://localhost:8000/api/orders/${order.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Delete failed');
      
      alert('Order deleted successfully');
      navigate('/dashboard/orders');
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order');
    }
  }
};

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/orders/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <div className="text-center py-5">Loading order...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!order) return <div className="alert alert-warning">Order not found</div>;

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
            <Link to="/dashboard/orders" className="btn btn-outline-secondary" style={{color:'gray'}}>
                <svg style={{width:'20px', marginBottom:'2px', height:'17px'}} viewBox="0 0 15 26" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg"><path fill="#969394" d="m12.885.58 2.084 2.084L4.133 13.5l10.836 10.836-2.084 2.084L2.049 15.584-.035 13.5z" className="fill-231f20"></path></svg>
                Order List
            </Link>
            <h2>Order : {'#'+String(order.id).padStart(5, '0')}</h2>
            <button onClick={handleDelete} className="btn btn-outline-danger">Delete Order</button>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h5>Customer Information</h5>
            </div>
            <div className="card-body">
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Email:</strong> {order.email || 'N/A'}</p>
              <p><strong>Address:</strong> {order.address || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header">
              <h5>Order Summary</h5>
            </div>
            <div className="card-body">
              <div className='mb-3'><strong>Status:</strong> <span>
                <div className="status-badge" style={{
                    backgroundColor:order.status === 'cancelled' ? '#f44336' : 
                                    order.status === 'completed' ? '#4caf50' : '#ffeb3b',
                    color: order.status === 'pending' ? '#000000' : '#ffffff',
                    padding: '0px 10px',
                    borderRadius: '4px',
                    display: 'inline-block',
                    fontSize:'0.9rem',
                    fontWeight:'bold'
                }}>
                    {order.status}
                </div>
              </span></div>
              <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
              <p><strong>Total:</strong> {order.total} DH</p>
              {order.coupon_code && (
                <p><strong>Coupon:</strong> {order.coupon_code}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Order Items</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img 
                          src={'/images/products/'+product.photo} 
                          alt={product.name}
                          style={{ width: '50px', marginRight: '15px' }}
                        />
                        <div>
                          <h6 className="mb-0">{product.name}</h6>
                          <small className="text-muted">{product.type}</small>
                        </div>
                      </div>
                    </td>
                    <td>{product.price} DH</td>
                    <td>{product.pivot.quantity}</td>
                    <td>{(product.price * product.pivot.quantity).toFixed(2)} DH</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}



export default OrderDetail;