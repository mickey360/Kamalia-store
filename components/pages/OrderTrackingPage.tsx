"use client";
import React,{useContext,useEffect,useMemo,useState} from "react";
import * as I from "lucide-react";
import { AppContext } from "@/components/store/AppProvider";

const { ShoppingBag,Heart,Search,Menu,X,ChevronRight,Star,Trash2,Plus,Minus,Truck,ShieldCheck,CreditCard,CheckCircle2,Package,Clock,ArrowRight,Filter,Sparkles,User,Copy,ExternalLink,Lock,Eye,RefreshCw,Check,Share2,HelpCircle,PhoneCall,MapPin,TrendingUp,BarChart2,Settings,SlidersHorizontal,ChevronDown,Percent,CheckCircle,AlertCircle,MessageCircle,Edit3,PlusCircle,Layers,ShoppingBasket,DollarSign,Send,LogOut } = I;

function OrderTrackingPage() {
  const { orders } = useContext(AppContext);
  const [searchOrderId, setSearchOrderId] = useState('KAM-91024');
  const [foundOrder, setFoundOrder] = useState(orders[0]);

  const handleTrack = e => {
    e.preventDefault();
    const res = orders.find(o => o.id.toLowerCase() === searchOrderId.trim().toLowerCase());
    setFoundOrder(res || null);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Track Order Shipment</h1>
        <p className="text-slate-500 text-xs">Enter your Kamalia Order Tracking Code (e.g. KAM-91024)</p>
      </div>

      <form onSubmit={handleTrack} className="flex gap-2 max-w-md mx-auto">
        <input 
          type="text" 
          value={searchOrderId}
          onChange={e => setSearchOrderId(e.target.value)}
          placeholder="Order ID..."
          className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-emerald-700 shadow-sm"
        />
        <button type="submit" className="bg-emerald-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow">
          Search
        </button>
      </form>

      {foundOrder ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-serif font-bold text-slate-900 text-base">Order #{foundOrder.id}</h3>
              <p className="text-slate-500 text-xs">Placed on {foundOrder.date}</p>
            </div>
            <span className="bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-xs px-3 py-1 rounded-full">
              {foundOrder.orderStatus}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {['Order Confirmed', 'Packed', 'Dispatched', 'Delivered'].map((st, i) => (
              <div key={st} className="space-y-1">
                <div className={`w-3 h-3 rounded-full mx-auto ${i <= 2 ? 'bg-emerald-800' : 'bg-slate-300'}`}></div>
                <p className={i <= 2 ? 'text-emerald-900 font-bold' : 'text-slate-400'}>{st}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-xs text-rose-600 font-bold text-center">No order found with ID "{searchOrderId}"</p>
      )}
    </div>
  );
}
export default OrderTrackingPage;
