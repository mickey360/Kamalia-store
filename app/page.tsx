"use client";
import { useContext } from "react";
import { StoreProvider, AppContext } from "@/components/store/AppProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomePage from "@/components/pages/HomePage";
import ShopPage from "@/components/pages/ShopPage";
import ProductDetailPage from "@/components/pages/ProductDetailPage";
import CheckoutPage from "@/components/pages/CheckoutPage";
import OrderSuccessPage from "@/components/pages/OrderSuccessPage";
import OrderTrackingPage from "@/components/pages/OrderTrackingPage";
import AdminPage from "@/components/admin/AdminPage";
import DbSchemaViewerPage from "@/components/admin/DbSchemaViewerPage";
import CartDrawer from "@/components/store/CartDrawer";
import WishlistDrawer from "@/components/store/WishlistDrawer";
import { AlertCircle, CheckCircle } from "lucide-react";

function StoreApp(){
 const {activeTab,setActiveTab,toast}=useContext(AppContext);
 return <div className="store-shell text-[#10221d] flex flex-col selection:bg-[#b7924b] selection:text-[#10221d]">
   <Navbar/>
   <main className="flex-1">{activeTab==='home'&&<HomePage/>}{activeTab==='shop'&&<ShopPage/>}{activeTab==='product-detail'&&<ProductDetailPage/>}{activeTab==='checkout'&&<CheckoutPage/>}{activeTab==='order-success'&&<OrderSuccessPage/>}{activeTab==='track'&&<OrderTrackingPage/>}{activeTab==='admin'&&<AdminPage/>}{activeTab==='db-schema'&&<DbSchemaViewerPage/>}</main>
   <Footer/><CartDrawer/><WishlistDrawer/>
   {toast&&<div className={`fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-5 py-3 rounded-lg shadow-2xl border text-xs font-bold animate-bounce ${toast.type==='error'?'bg-rose-900 border-rose-700 text-white':'bg-emerald-900 border-emerald-700 text-amber-200'}`}>{toast.type==='error'?<AlertCircle size={18}/>:<CheckCircle size={18}/>}<span>{toast.message}</span></div>}
 </div>
}
export default function Page(){return <StoreProvider><StoreApp/></StoreProvider>}
