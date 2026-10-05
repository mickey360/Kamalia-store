"use client";
import React,{useContext,useState} from "react";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, MapPin, Truck, UserRound } from "lucide-react";
import { AppContext } from "../components/store/AppProvider";

export default function Navbar(){
  const {activeTab,setActiveTab,cart,wishlist,setIsCartOpen,setIsWishlistOpen,searchQuery,setSearchQuery}=useContext(AppContext);
  const [mobileOpen,setMobileOpen]=useState(false);
  const count=cart.reduce((sum,item)=>sum+item.quantity,0);
  const go=(tab:string)=>{setActiveTab(tab);setMobileOpen(false)};
  return <>
    <div className="bg-[#0b201b] text-[#f7f2e8] text-[11px] tracking-wide">
      <div className="section-wrap min-h-9 flex items-center justify-between gap-3">
        <div className="hidden sm:flex items-center gap-2"><Truck size={14} className="text-[#c6a86a]"/><span>Free delivery across Pakistan on orders over Rs. 5,000</span></div>
        <div className="mx-auto sm:mx-0 font-semibold">Cash on Delivery <span className="text-[#c6a86a]">•</span> 7 Days Easy Return</div>
        <div className="hidden lg:flex items-center gap-4 text-white/70"><span>WhatsApp Orders</span><span>•</span><button onClick={()=>go('track')} className="hover:text-white">Track Order</button></div>
      </div>
    </div>
    <header className="sticky top-0 z-40 bg-[#fbfaf7]/90 backdrop-blur-xl border-b border-[#e9e3d8]">
      <div className="section-wrap h-[76px] flex items-center gap-5">
        <button onClick={()=>go('home')} className="shrink-0 flex items-center gap-3 group" aria-label="Kamalia home">
          <img src="/logo-mark.svg" alt="Kamalia" className="w-11 h-11 transition-transform duration-300 group-hover:rotate-[-3deg]"/>
          <span className="hidden sm:block text-left"><span className="block serif text-[24px] tracking-[.18em] leading-none">KAMALIA</span><span className="block text-[8px] tracking-[.22em] text-[#a48348] font-bold mt-1">TRADITION WOVEN IN THREAD</span></span>
        </button>

        <nav className="hidden xl:flex items-center gap-7 ml-3 text-[13px] font-semibold text-[#304039]">
          <button onClick={()=>go('home')} className={activeTab==='home'?'text-[#0b201b]':''}>Home</button>
          <button onClick={()=>go('shop')} className={activeTab==='shop'?'text-[#0b201b]':''}>Collections</button>
          <button onClick={()=>go('shop')} className="inline-flex items-center gap-1">Men's Wear <ChevronDown size={13}/></button>
          <button onClick={()=>go('shop')} className="inline-flex items-center gap-1">Women's Wear <ChevronDown size={13}/></button>
          <button onClick={()=>go('shop')}>Shawls & Wraps</button>
          <button onClick={()=>go('track')}>Track Order</button>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:block relative w-[230px]">
            <Search size={16} className="absolute left-3.5 top-3 text-[#6d756f]"/>
            <input aria-label="Search products" value={searchQuery} onChange={e=>{setSearchQuery(e.target.value);if(activeTab!=='shop')setActiveTab('shop')}} placeholder="Search khaddar, karandi..." className="w-full rounded-full border border-[#ded8cc] bg-white/80 py-2.5 pl-10 pr-4 text-xs outline-none focus:border-[#b7924b] focus:ring-4 focus:ring-[#b7924b]/10"/>
          </div>
          <button onClick={()=>setIsWishlistOpen(true)} className="relative rounded-full p-2.5 hover:bg-white transition" aria-label="Wishlist"><Heart size={20} strokeWidth={1.7}/>{wishlist.length>0&&<span className="absolute right-0 top-0 min-w-4 h-4 px-1 rounded-full bg-[#b7924b] text-[#10221d] text-[9px] font-black flex items-center justify-center">{wishlist.length}</span>}</button>
          <button onClick={()=>setIsCartOpen(true)} className="relative rounded-full bg-[#0b201b] text-white p-2.5 hover:bg-[#15382f] transition shadow-lg" aria-label="Shopping bag"><ShoppingBag size={19}/>{count>0&&<span className="absolute -right-1 -top-1 min-w-4 h-4 px-1 rounded-full bg-[#d7b66f] text-[#10221d] text-[9px] font-black flex items-center justify-center">{count}</span>}</button>
          <button onClick={()=>setMobileOpen(v=>!v)} className="xl:hidden rounded-full p-2.5 hover:bg-white" aria-label="Menu">{mobileOpen?<X size={21}/>:<Menu size={21}/>}</button>
        </div>
      </div>
      {mobileOpen&&<div className="xl:hidden border-t border-[#e9e3d8] bg-[#fbfaf7] px-5 py-5 animate-fade-up">
        <div className="relative mb-4"><Search size={16} className="absolute left-3.5 top-3 text-[#6d756f]"/><input aria-label="Mobile search" value={searchQuery} onChange={e=>{setSearchQuery(e.target.value);go('shop')}} placeholder="Search products..." className="w-full rounded-xl border border-[#ded8cc] bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-[#b7924b]"/></div>
        <div className="grid grid-cols-2 gap-2 text-sm font-semibold"><button onClick={()=>go('home')} className="rounded-xl bg-white p-3 text-left">Home</button><button onClick={()=>go('shop')} className="rounded-xl bg-white p-3 text-left">Collections</button><button onClick={()=>go('shop')} className="rounded-xl bg-white p-3 text-left">Men's Wear</button><button onClick={()=>go('shop')} className="rounded-xl bg-white p-3 text-left">Women's Wear</button><button onClick={()=>go('shop')} className="rounded-xl bg-white p-3 text-left">Shawls & Wraps</button><button onClick={()=>go('track')} className="rounded-xl bg-white p-3 text-left">Track Order</button></div>
        <div className="mt-4 text-xs text-[#6d756f] flex items-center gap-2"><MapPin size={14}/> Delivered across Pakistan</div>
      </div>}
    </header>
  </>;
}
