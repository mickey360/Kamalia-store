"use client";
import React,{useContext,useEffect,useMemo,useState} from "react";
import * as I from "lucide-react";
import { AppContext } from "@/components/store/AppProvider";

const { ShoppingBag,Heart,Search,Menu,X,ChevronRight,Star,Trash2,Plus,Minus,Truck,ShieldCheck,CreditCard,CheckCircle2,Package,Clock,ArrowRight,Filter,Sparkles,User,Copy,ExternalLink,Lock,Eye,RefreshCw,Check,Share2,HelpCircle,PhoneCall,MapPin,TrendingUp,BarChart2,Settings,SlidersHorizontal,ChevronDown,Percent,CheckCircle,AlertCircle,MessageCircle,Edit3,PlusCircle,Layers,ShoppingBasket,DollarSign,Send,LogOut } = I;

function OrderSuccessPage() {
  const { latestOrder, setActiveTab } = useContext(AppContext);

  if (!latestOrder) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-md">
        <CheckCircle2 size={36} />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Order Confirmed!</h1>
        <p className="text-slate-600 text-xs">
          Thank you for shopping with Kamalia Clothings. Order Number <span className="text-emerald-800 font-extrabold">#{latestOrder.id}</span> has been dispatched for packing.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left space-y-3 text-xs text-slate-700 shadow-sm">
        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span className="text-slate-500 font-semibold">Payment Gateway:</span>
          <span className="font-bold text-slate-900">{latestOrder.paymentMethod} ({latestOrder.paymentStatus})</span>
        </div>
        <div className="flex justify-between border-b border-slate-100 pb-2">
          <span className="text-slate-500 font-semibold">Shipping Address:</span>
          <span className="font-bold text-slate-900">{latestOrder.customer.address}, {latestOrder.customer.city}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500 font-semibold">Total Amount:</span>
          <span className="font-extrabold text-emerald-900 text-sm">Rs. {latestOrder.totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setActiveTab('track')}
          className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow"
        >
          Track Shipment
        </button>
        <button
          onClick={() => setActiveTab('shop')}
          className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-300 px-6 py-2.5 rounded-xl text-xs"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
export default OrderSuccessPage;
