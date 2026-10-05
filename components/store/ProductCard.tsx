"use client";
import React,{useContext} from "react";
import { Heart, ShoppingBag, Star, ArrowUpRight } from "lucide-react";
import { AppContext } from "@/components/store/AppProvider";

export default function ProductCard({product}:{product:any}){
  const {setSelectedProduct,setActiveTab,toggleWishlist,wishlist,addToCart}=useContext(AppContext);
  const saved=wishlist.includes(product.id);
  const discount=product.originalPrice?Math.round((1-product.price/product.originalPrice)*100):0;
  const open=()=>{setSelectedProduct(product);setActiveTab('product-detail')};
  return <article className="product-card group">
    <div className="relative aspect-[4/5] overflow-hidden bg-[#eee9df] cursor-pointer" onClick={open}>
      <img src={product.image} alt={product.name} loading="lazy" className="product-image w-full h-full object-cover"/>
      <div className="absolute left-3 top-3 flex gap-1.5 flex-wrap max-w-[75%]">
        {product.isNew&&<span className="rounded-full bg-[#0b201b] text-white px-2.5 py-1 text-[9px] font-black uppercase tracking-wider">New</span>}
        {product.isBestseller&&<span className="rounded-full bg-[#d7b66f] text-[#10221d] px-2.5 py-1 text-[9px] font-black uppercase tracking-wider">Bestseller</span>}
      </div>
      <button onClick={e=>{e.stopPropagation();toggleWishlist(product.id)}} className={`absolute right-3 top-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition ${saved?'bg-white text-[#9b3145] border-white':'bg-black/20 text-white border-white/30 hover:bg-white hover:text-[#0b201b]'}`} aria-label={saved?'Remove from wishlist':'Add to wishlist'}><Heart size={16} fill={saved?'currentColor':'none'}/></button>
      <button onClick={open} className="absolute left-3 right-3 bottom-3 translate-y-14 group-hover:translate-y-0 transition-transform duration-300 rounded-xl bg-white/95 backdrop-blur py-3 text-xs font-black text-[#10221d] flex items-center justify-center gap-2 shadow-lg"><ArrowUpRight size={15}/> Quick view</button>
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between gap-2"><span className="text-[9px] font-black uppercase tracking-[.15em] text-[#a48348]">{product.fabric}</span><span className="flex items-center gap-1 text-[10px] text-[#68726c]"><Star size={11} fill="currentColor" className="text-[#c49643]"/>{product.rating} ({product.reviewsCount})</span></div>
      <button onClick={open} className="text-left mt-1.5 block text-[14px] leading-5 font-bold text-[#162b25] hover:text-[#a48348] transition line-clamp-2">{product.name}</button>
      <div className="mt-3 flex items-end gap-2"><span className="text-lg font-black text-[#0b201b]">Rs. {product.price.toLocaleString()}</span>{product.originalPrice&&<span className="text-[11px] text-[#89908c] line-through">Rs. {product.originalPrice.toLocaleString()}</span>}{discount>0&&<span className="ml-auto text-[9px] font-black text-[#4e765e] bg-[#e8f0e8] px-1.5 py-1 rounded">{discount}% OFF</span>}</div>
      <div className="mt-3 flex gap-1.5">{(product.colors||[]).slice(0,4).map((c:string,i:number)=><span key={c} title={c} className="w-4 h-4 rounded-full border border-white ring-1 ring-[#d8d1c4]" style={{background:['#173b32','#d9d0ba','#8d4a3e','#202a2b'][i%4]}}/> )}</div>
      <button onClick={()=>addToCart(product,product.sizes?.[0]||'Standard',product.colors?.[0]||'Classic',1)} className="mt-4 w-full rounded-xl bg-[#0b201b] hover:bg-[#15382f] text-white py-3 text-[11px] font-black tracking-wide flex items-center justify-center gap-2 transition"><ShoppingBag size={14}/> Add to bag</button>
    </div>
  </article>;
}
