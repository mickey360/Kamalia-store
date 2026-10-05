"use client";
import React,{useContext,useEffect,useMemo,useState} from "react";
import * as I from "lucide-react";
import { AppContext } from "@/components/store/AppProvider";
import { PAKISTAN_CITIES } from "@/data/store-data";

const { ShoppingBag,Heart,Search,Menu,X,ChevronRight,Star,Trash2,Plus,Minus,Truck,ShieldCheck,CreditCard,CheckCircle2,Package,Clock,ArrowRight,Filter,Sparkles,User,Copy,ExternalLink,Lock,Eye,RefreshCw,Check,Share2,HelpCircle,PhoneCall,MapPin,TrendingUp,BarChart2,Settings,SlidersHorizontal,ChevronDown,Percent,CheckCircle,AlertCircle,MessageCircle,Edit3,PlusCircle,Layers,ShoppingBasket,DollarSign,Send,LogOut } = I;

function CheckoutPage() {
  const { cart, grandTotal, shippingFee, setActiveTab, setLatestOrder, setOrders } = useContext(AppContext);
  const [step, setStep] = useState(1); // 1: Shipping Address, 2: Payment Method

  // Delivery Details Form
  const [formData, setFormData] = useState({
    fullName: 'Chaudhry Hamza',
    email: 'hamza@example.pk',
    phone: '03009876543',
    city: 'Lahore',
    address: 'House 14, Block B, DHA Phase 5',
    notes: 'Please call before delivering'
  });

  const [paymentGateway, setPaymentGateway] = useState('COD'); // COD, JazzCash, EasyPaisa, Raast
  const [accountNumber, setAccountNumber] = useState('03009876543');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newOrder = {
        id: `KAM-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toISOString().split('T')[0],
        items: cart.map(i => ({ name: i.product.name, qty: i.quantity, price: i.price, size: i.size })),
        totalAmount: grandTotal,
        paymentMethod: paymentGateway,
        paymentStatus: paymentGateway === 'COD' ? 'Pending (COD)' : 'Paid via Wallet',
        orderStatus: 'Order Confirmed',
        customer: { ...formData }
      };

      setLatestOrder(newOrder);
      setOrders(prev => [newOrder, ...prev]);
      setIsProcessing(false);
      setActiveTab('order-success');
    }, 1800);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Checkout Stepper */}
      <div className="flex items-center justify-center space-x-4 text-xs font-bold">
        <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-emerald-800' : 'text-slate-400'}`}>
          <span className="w-6 h-6 rounded-full border border-emerald-800 flex items-center justify-center">1</span>
          <span>Delivery Address</span>
        </div>
        <ChevronRight size={14} className="text-slate-300" />
        <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-emerald-800' : 'text-slate-400'}`}>
          <span className="w-6 h-6 rounded-full border border-emerald-800 flex items-center justify-center">2</span>
          <span>Payment Gateway</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Form Details */}
        <div className="md:col-span-2 space-y-6">
          {step === 1 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <MapPin size={18} className="text-emerald-800" /> Dispatch Delivery Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-slate-600 font-semibold mb-1 block">Full Name *</label>
                  <input 
                    type="text" 
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="text-slate-600 font-semibold mb-1 block">Phone Number (For Courier SMS) *</label>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="text-slate-600 font-semibold mb-1 block">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="text-slate-600 font-semibold mb-1 block">Destination City *</label>
                  <select
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 font-semibold focus:outline-none focus:border-emerald-700"
                  >
                    {PAKISTAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-slate-600 font-semibold mb-1 block">Complete Street Address *</label>
                  <input 
                    type="text" 
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition mt-4 shadow"
              >
                Continue to Select Payment Method
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <CreditCard size={18} className="text-emerald-800" /> Select Pakistani Payment Method
              </h3>

              <div className="space-y-3">
                {[
                  { id: 'COD', name: 'Cash on Delivery (COD)', desc: 'Pay cash to TCS / Leopard / Trax courier upon receiving your parcel at home' },
                  { id: 'JazzCash', name: 'JazzCash Mobile Account', desc: 'Instant OTP request pushed directly to your JazzCash mobile app' },
                  { id: 'EasyPaisa', name: 'EasyPaisa Account', desc: 'Fast mobile wallet transfer with zero extra charges' },
                  { id: 'Raast', name: 'Raast Direct Banking', desc: 'Instant State Bank Raast ID transfer' }
                ].map(gw => (
                  <div
                    key={gw.id}
                    onClick={() => setPaymentGateway(gw.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition flex items-start space-x-3 ${
                      paymentGateway === gw.id ? 'bg-emerald-50 border-emerald-700 ring-2 ring-emerald-200' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                      paymentGateway === gw.id ? 'border-emerald-800 bg-emerald-800' : 'border-slate-400'
                    }`}>
                      {paymentGateway === gw.id && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{gw.name}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{gw.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {paymentGateway !== 'COD' && (
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
                  <label className="text-xs text-amber-900 font-bold block">
                    Enter {paymentGateway} Account Phone Number:
                  </label>
                  <input 
                    type="text"
                    value={accountNumber}
                    onChange={e => setAccountNumber(e.target.value)}
                    placeholder="03001234567"
                    className="w-full bg-white border border-amber-300 rounded-lg p-2.5 text-xs text-slate-900 font-bold focus:outline-none"
                  />
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="bg-slate-100 text-slate-700 font-bold text-xs px-4 py-3 rounded-xl border border-slate-300"
                >
                  Back
                </button>
                
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2 shadow-lg"
                >
                  {isProcessing ? (
                    <RefreshCw size={16} className="animate-spin" />
                  ) : (
                    <>
                      <Lock size={14} />
                      <span>Confirm Order (Rs. {grandTotal.toLocaleString()})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 h-fit space-y-4 shadow-sm">
          <h3 className="font-serif font-bold text-base text-slate-900 border-b border-slate-100 pb-3">Order Summary</h3>
          
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cart.map((item, idx) => (
              <div key={idx} className="flex space-x-3 text-xs">
                <img src={item.product.image} alt={item.product.name} className="w-10 h-12 object-cover rounded-lg" />
                <div className="flex-1">
                  <h4 className="text-slate-900 font-bold line-clamp-1">{item.product.name}</h4>
                  <p className="text-slate-500 text-[10px]">Qty: {item.quantity} • {item.size}</p>
                </div>
                <span className="text-emerald-900 font-extrabold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600 font-medium">
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span>{shippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `Rs. ${shippingFee}`}</span>
            </div>
            <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-2 border-t border-slate-100">
              <span>Total Payable</span>
              <span className="text-emerald-900">Rs. {grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CheckoutPage;
