"use client";
import React,{useContext,useMemo,useState} from "react";
import { ChevronDown, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { AppContext } from "@/components/store/AppProvider";
import ProductCard from "@/components/store/ProductCard";

export default function ShopPage(){
  const {products,categoryFilter,setCategoryFilter,fabricFilter,setFabricFilter,searchQuery,setSearchQuery,priceRange,setPriceRange,sortBy,setSortBy}=useContext(AppContext);
  const [filtersOpen,setFiltersOpen]=useState(false);
  const filtered=useMemo(()=>products.filter((p:any)=>{
    const category=categoryFilter==='All'||p.category===categoryFilter;
    const fabric=fabricFilter==='All'||p.fabric.toLowerCase().includes(fabricFilter.toLowerCase());
    const query=!searchQuery||`${p.name} ${p.description} ${p.fabric} ${(p.colors||[]).join(' ')}`.toLowerCase().includes(searchQuery.toLowerCase());
    return category&&fabric&&query&&p.price<=priceRange;
  }).sort((a:any,b:any)=>sortBy==='price-low'?a.price-b.price:sortBy==='price-high'?b.price-a.price:sortBy==='rating'?b.rating-a.rating:b.reviewsCount-a.reviewsCount),[products,categoryFilter,fabricFilter,searchQuery,priceRange,sortBy]);
  const reset=()=>{setCategoryFilter('All');setFabricFilter('All');setSearchQuery('');setPriceRange(12000)};
  const categories=['All','Unstitched','Stitched','Menswear','Shawls & Wraps'];
  const fabrics=['All','Khaddar','Karandi','Velvet','Wool','Lawn'];
  const FilterPanel=()=> <div className="space-y-7">
    <div className="flex items-center justify-between"><div><div className="eyebrow">Refine</div><h3 className="serif text-xl mt-1">Shop filters</h3></div><button onClick={reset} className="text-[10px] font-black uppercase tracking-wider text-[#a48348]">Reset</button></div>
    <div><label className="text-[10px] uppercase tracking-wider font-black text-[#6d756f]">Search</label><div className="relative mt-2"><Search size={15} className="absolute left-3 top-3 text-[#89908c]"/><input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Khaddar, suit, shawl..." className="w-full rounded-xl border border-[#ded8cc] bg-white py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#b7924b]"/></div></div>
    <div><label className="text-[10px] uppercase tracking-wider font-black text-[#6d756f]">Category</label><div className="mt-2 space-y-1">{categories.map(c=><button key={c} onClick={()=>setCategoryFilter(c)} className={`w-full text-left rounded-xl px-3 py-2.5 text-xs font-bold transition ${categoryFilter===c?'bg-[#0b201b] text-white':'hover:bg-[#f3efe7] text-[#45504a]'}`}>{c}</button>)}</div></div>
    <div><label className="text-[10px] uppercase tracking-wider font-black text-[#6d756f]">Fabric</label><div className="mt-2 flex flex-wrap gap-2">{fabrics.map(f=><button key={f} onClick={()=>setFabricFilter(f)} className={`rounded-full border px-3 py-2 text-[10px] font-bold transition ${fabricFilter===f?'border-[#0b201b] bg-[#0b201b] text-white':'border-[#ded8cc] bg-white text-[#52605a] hover:border-[#b7924b]'}`}>{f}</button>)}</div></div>
    <div><div className="flex justify-between text-[10px] uppercase tracking-wider font-black text-[#6d756f]"><span>Maximum price</span><span className="text-[#0b201b]">Rs. {priceRange.toLocaleString()}</span></div><input type="range" min="2000" max="15000" step="500" value={priceRange} onChange={e=>setPriceRange(Number(e.target.value))} className="w-full mt-3 accent-[#0b201b]"/></div>
  </div>;
  return <div className="section-wrap py-8 md:py-12">
    <div className="rounded-[26px] bg-[#0b201b] text-white px-6 py-8 md:px-10 md:py-10 relative overflow-hidden"><div className="absolute -right-20 -top-28 w-80 h-80 rounded-full border border-[#d7b66f]/20"/><div className="absolute right-12 bottom-[-80px] w-52 h-52 rounded-full border border-[#d7b66f]/10"/><div className="relative"><div className="eyebrow text-[#d7b66f]">Kamalia collection</div><h1 className="serif text-3xl md:text-5xl mt-2">Pakistani wear, curated.</h1><p className="text-white/65 text-sm mt-3 max-w-xl">Khaddar, karandi, lawn, kameez shalwar and winter layers — in PKR, with nationwide delivery.</p></div></div>
    <div className="mt-7 flex items-center justify-between gap-3"><button onClick={()=>setFiltersOpen(true)} className="lg:hidden rounded-full border border-[#d8d0c1] bg-white px-4 py-2.5 text-xs font-black flex items-center gap-2"><Filter size={14}/> Filters</button><p className="text-xs text-[#6d756f]"><strong className="text-[#172c25]">{filtered.length}</strong> products</p><div className="ml-auto flex items-center gap-2"><span className="hidden sm:block text-[10px] uppercase tracking-wider font-black text-[#89908c]">Sort</span><select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="rounded-full border border-[#d8d0c1] bg-white px-4 py-2.5 text-xs font-bold outline-none"><option value="popular">Most popular</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></div></div>
    <div className="grid grid-cols-1 lg:grid-cols-[270px_1fr] gap-7 mt-7">
      <aside className="hidden lg:block rounded-[22px] border border-[#e9e3d8] bg-white p-5 h-fit sticky top-28"><FilterPanel/></aside>
      <main>{filtered.length===0?<div className="rounded-[22px] border border-[#e9e3d8] bg-white py-20 text-center"><div className="mx-auto w-14 h-14 rounded-full bg-[#f4ead8] flex items-center justify-center"><Search size={22}/></div><h2 className="serif text-2xl mt-5">No pieces found</h2><p className="text-xs text-[#7b827d] mt-2">Try a different search or clear your filters.</p><button onClick={reset} className="mt-5 rounded-full bg-[#0b201b] text-white px-5 py-2.5 text-xs font-black">Clear filters</button></div>:<div className="grid grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5">{filtered.map((p:any)=><ProductCard key={p.id} product={p}/>)}</div>}</main>
    </div>
    {filtersOpen&&<div className="fixed inset-0 z-50 bg-[#0b201b]/55 backdrop-blur-sm lg:hidden"><div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-[#fbfaf7] p-6 overflow-y-auto animate-fade-up"><div className="flex justify-end mb-5"><button onClick={()=>setFiltersOpen(false)} className="rounded-full bg-white p-2"><X size={18}/></button></div><FilterPanel/><button onClick={()=>setFiltersOpen(false)} className="w-full mt-8 rounded-xl bg-[#0b201b] text-white py-3 text-xs font-black">Show {filtered.length} products</button></div></div>}
  </div>;
}
