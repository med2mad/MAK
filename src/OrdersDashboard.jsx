import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatusDropdown from './StatusDropdown';

function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Delete this order?')) {
        try {
        const response = await fetch(`http://localhost:8000/api/orders/${orderId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Delete failed');
        
        setOrders(orders.filter(order => order.id !== orderId));
        alert('Order deleted successfully');
        } catch (error) {
        console.error('Error deleting order:', error);
        alert('Failed to delete order');
        }
    }
    };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-center py-5">Loading orders...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/" className="btn btn-outline-secondary" style={{color:'gray'}}>
            <svg style={{width:'20px', marginBottom:'2px', height:'17px'}} viewBox="0 0 15 26" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg"><path fill="#969394" d="m12.885.58 2.084 2.084L4.133 13.5l10.836 10.836-2.084 2.084L2.049 15.584-.035 13.5z" className="fill-231f20"></path></svg>
            Shop
        </Link>
        <h2>Orders</h2>
        <div></div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>{'#'+String(order.id).padStart(5, '0')}</td>
                    <td>{order.name}</td>
                    <td>{order.phone}</td>
                    <td>{order.total} DH</td>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                    <td>
                        <Link to={`/orders/${order.id}`} style={{marginRight:'10px'}} className="btn btn-sm btn-outline-info">
                            View
                        </Link>
                        <button onClick={() => handleDeleteOrder(order.id)} className="btn btn-sm btn-outline-danger">
                            Delete
                        </button>
                    </td>
                    <td>
                        <StatusDropdown 
                            currentStatus={order.status} 
                            orderId={order.id}
                            onStatusChange={(orderId, newStatus) => {
                                setOrders(orders.map(o => 
                                    o.id === orderId ? {...o, status: newStatus} : o
                                ));
                            }}
                        />
                    </td>
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

// Helper function for status badge styling
function getStatusBadgeClass(status) {
  switch (status) {
    case 'pending':
      return 'bg-warning text-dark';
    case 'completed':
      return 'bg-success';
    case 'cancelled':
      return 'bg-danger text-dark';
    default:
      return 'bg-secondary';
  }
}

export default OrdersDashboard;