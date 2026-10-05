"use client";
import React,{useContext,useEffect,useMemo,useState} from "react";
import * as I from "lucide-react";
import { AppContext } from "@/components/store/AppProvider";

const { ShoppingBag,Heart,Search,Menu,X,ChevronRight,Star,Trash2,Plus,Minus,Truck,ShieldCheck,CreditCard,CheckCircle2,Package,Clock,ArrowRight,Filter,Sparkles,User,Copy,ExternalLink,Lock,Eye,RefreshCw,Check,Share2,HelpCircle,PhoneCall,MapPin,TrendingUp,BarChart2,Settings,SlidersHorizontal,ChevronDown,Percent,CheckCircle,AlertCircle,MessageCircle,Edit3,PlusCircle,Layers,ShoppingBasket,DollarSign,Send,LogOut } = I;

function AdminPage() {
  const { products, addNewProduct, deleteProduct, orders, setOrders } = useContext(AppContext);
  const [adminTab, setAdminTab] = useState('inventory'); // inventory, add-product, orders

  // Add Product Form State
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'Unstitched',
    fabric: 'Slub Khaddar',
    season: 'Winter Collection',
    price: '',
    originalPrice: '',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    description: '',
    colors: 'Emerald Green, Navy Blue',
    sizes: 'Unstitched (7 Yards), Stitched Medium'
  });

  const handleAddProductSubmit = e => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;

    const formattedProduct = {
      id: `kam-${Date.now().toString().slice(-4)}`,
      name: newProd.name,
      category: newProd.category,
      fabric: newProd.fabric,
      season: newProd.season,
      price: Number(newProd.price),
      originalPrice: newProd.originalPrice ? Number(newProd.originalPrice) : null,
      rating: 5.0,
      reviewsCount: 1,
      isBestseller: false,
      isNew: true,
      stock: Number(newProd.stock),
      image: newProd.image || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      gallery: [newProd.image || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'],
      description: newProd.description || 'Authentic Kamalia suit fabric.',
      colors: newProd.colors.split(',').map(s => s.trim()),
      sizes: newProd.sizes.split(',').map(s => s.trim()),
      inStock: true
    };

    addNewProduct(formattedProduct);
    setNewProd({
      name: '',
      category: 'Unstitched',
      fabric: 'Slub Khaddar',
      season: 'Winter Collection',
      price: '',
      originalPrice: '',
      stock: 20,
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      description: '',
      colors: 'Emerald Green, Navy Blue',
      sizes: 'Unstitched (7 Yards), Stitched Medium'
    });
    setAdminTab('inventory');
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: status } : o));
  };

  const totalSalesRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
            <Lock size={20} className="text-emerald-800" /> Kamalia Store Admin Control Panel
          </h1>
          <p className="text-slate-500 text-xs">Manage product inventory catalog, orders, and sales performance.</p>
        </div>

        {/* Sub-Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setAdminTab('inventory')}
            className={`px-4 py-2 rounded-lg transition ${adminTab === 'inventory' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Manage Products ({products.length})
          </button>
          <button
            onClick={() => setAdminTab('add-product')}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-1 ${adminTab === 'add-product' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <PlusCircle size={14} /> Add New Product
          </button>
          <button
            onClick={() => setAdminTab('orders')}
            className={`px-4 py-2 rounded-lg transition ${adminTab === 'orders' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Customer Orders ({orders.length})
          </button>
        </div>
      </div>

      {/* Overview Analytics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-slate-500 font-semibold">Total Revenue Generated</span>
          <p className="text-2xl font-black text-emerald-900">Rs. {totalSalesRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-slate-500 font-semibold">Active Orders Received</span>
          <p className="text-2xl font-black text-slate-900">{orders.length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-slate-500 font-semibold">Live Store Catalog Items</span>
          <p className="text-2xl font-black text-slate-900">{products.length}</p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-slate-500 font-semibold">Dispatched Shipments</span>
          <p className="text-2xl font-black text-emerald-700">
            {orders.filter(o => o.orderStatus === 'Dispatched' || o.orderStatus === 'Delivered').length}
          </p>
        </div>
      </div>

      {/* Tab 1: Manage Products */}
      {adminTab === 'inventory' && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-serif font-bold text-slate-900 text-sm">Store Catalog Inventory</h3>
            <button 
              onClick={() => setAdminTab('add-product')}
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
            >
              <Plus size={14} /> Add Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-700">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Fabric</th>
                  <th className="p-3">Price (Rs.)</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-slate-900 flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-9 h-11 object-cover rounded-lg" />
                      <span>{p.name}</span>
                    </td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3">{p.fabric}</td>
                    <td className="p-3 font-extrabold text-emerald-900">Rs. {p.price.toLocaleString()}</td>
                    <td className="p-3 font-semibold">{p.stock} units</td>
                    <td className="p-3 text-right">
                      <button 
                        onClick={() => deleteProduct(p.id)}
                        className="text-rose-600 hover:text-rose-800 font-bold p-1"
                        title="Delete Product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Add New Product Form */}
      {adminTab === 'add-product' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
            Add New Product to Store Catalog
          </h3>

          <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-600 font-semibold mb-1 block">Product Name / Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Kamalia Pure Cotton Jacquard Suit"
                  value={newProd.name}
                  onChange={e => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-semibold focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold mb-1 block">Category *</label>
                <select
                  value={newProd.category}
                  onChange={e => setNewProd({ ...newProd, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-semibold focus:outline-none focus:border-emerald-700"
                >
                  <option value="Unstitched">Unstitched</option>
                  <option value="Stitched">Stitched</option>
                  <option value="Menswear">Menswear</option>
                  <option value="Shawls & Wraps">Shawls & Wraps</option>
                </select>
              </div>

              <div>
                <label className="text-slate-600 font-semibold mb-1 block">Fabric Type *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Slub Khaddar / Karandi"
                  value={newProd.fabric}
                  onChange={e => setNewProd({ ...newProd, fabric: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold mb-1 block">Price in PKR (Rs.) *</label>
                <input 
                  type="number" 
                  required
                  placeholder="4850"
                  value={newProd.price}
                  onChange={e => setNewProd({ ...newProd, price: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-bold focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold mb-1 block">Original Price (For Discount Display)</label>
                <input 
                  type="number" 
                  placeholder="5999"
                  value={newProd.originalPrice}
                  onChange={e => setNewProd({ ...newProd, originalPrice: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="text-slate-600 font-semibold mb-1 block">Initial Stock Quantity</label>
                <input 
                  type="number" 
                  value={newProd.stock}
                  onChange={e => setNewProd({ ...newProd, stock: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-slate-600 font-semibold mb-1 block">Cover Image URL *</label>
                <input 
                  type="text" 
                  required
                  value={newProd.image}
                  onChange={e => setNewProd({ ...newProd, image: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-slate-600 font-semibold mb-1 block">Product Description</label>
                <textarea 
                  rows={3}
                  value={newProd.description}
                  onChange={e => setNewProd({ ...newProd, description: e.target.value })}
                  placeholder="Describe thread quality, loom weave, color guarantee..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-emerald-700"
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-3">
              <button
                type="submit"
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow"
              >
                Publish Product to Store
              </button>
              <button
                type="button"
                onClick={() => setAdminTab('inventory')}
                className="bg-slate-100 text-slate-700 font-bold px-4 py-3 rounded-xl text-xs border border-slate-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Customer Orders Management */}
      {adminTab === 'orders' && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-100 font-bold text-xs text-slate-900">Recent Customer Orders</div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-700">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Destination</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Fulfillment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map(o => (
                  <tr key={o.id}>
                    <td className="p-3 font-bold text-emerald-900">{o.id}</td>
                    <td className="p-3">{o.customer.fullName} ({o.customer.phone})</td>
                    <td className="p-3">{o.customer.city}</td>
                    <td className="p-3">{o.paymentMethod}</td>
                    <td className="p-3 font-extrabold text-slate-900">Rs. {o.totalAmount.toLocaleString()}</td>
                    <td className="p-3">
                      <select
                        value={o.orderStatus}
                        onChange={e => updateOrderStatus(o.id, e.target.value)}
                        className="bg-slate-50 border border-slate-300 rounded p-1 text-xs text-slate-900 font-semibold"
                      >
                        <option value="Order Confirmed">Order Confirmed</option>
                        <option value="Packed">Packed</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
export default AdminPage;
