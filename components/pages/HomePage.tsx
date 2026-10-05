"use client";
import React,{useContext} from "react";
import { ArrowRight, ChevronRight, Grid2X2, Heart, Leaf, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
import { AppContext } from "@/components/store/AppProvider";
import ProductCard from "@/components/store/ProductCard";

export default function HomePage(){
  const {setActiveTab,setSelectedProduct,setCategoryFilter,products}=useContext(AppContext);
  const featured=products.slice(0,6);
  const categories=[
    {name:'All Products',cat:'All',note:'The complete edit',icon:<Grid2X2 size={21}/>},
    {name:'Unstitched',cat:'Unstitched',note:'Khaddar & lawn',icon:<Leaf size={21}/>},
    {name:"Men's Wear",cat:'Menswear',note:'Kameez shalwar',icon:<Sparkles size={21}/>},
    {name:'Stitched',cat:'Stitched',note:'Ready to wear',icon:<ShieldCheck size={21}/>},
    {name:'Shawls & Wraps',cat:'Shawls & Wraps',note:'Winter layers',icon:<Star size={21}/>},
  ];
  const browse=(cat:string)=>{setCategoryFilter(cat);setActiveTab('shop')};
  return <div className="pb-20">
    <section className="relative min-h-[560px] md:min-h-[610px] overflow-hidden">
      <img src="/kamalia-hero.png" alt="Kamalia Pakistani heritage collection" className="absolute inset-0 w-full h-full object-cover object-center"/>
      <div className="absolute inset-0 hero-overlay"/>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(183,146,75,.13),transparent_27%)]"/>
      <div className="section-wrap relative z-10 min-h-[560px] md:min-h-[610px] flex items-center">
        <div className="max-w-[570px] text-white animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d7b66f]/50 bg-black/20 backdrop-blur px-3.5 py-2 eyebrow text-[#e2c782]"><Sparkles size={13}/> Premium Pakistani Wear</div>
          <h1 className="serif text-[48px] leading-[.98] md:text-[76px] mt-6 tracking-[-.03em]">Timeless tradition.<br/><i className="text-[#e5cb91]">Modern elegance.</i></h1>
          <p className="mt-6 max-w-[510px] text-white/80 text-sm md:text-base leading-7">Discover authentic Kamalia fabrics, Pakistani silhouettes and hand-finished pieces woven around our heritage — made for everyday life, celebrations and winter evenings.</p>
          <div className="mt-8 flex flex-wrap gap-3"><button onClick={()=>browse('All')} className="rounded-full bg-[#f7f2e8] text-[#10221d] px-6 py-3.5 text-xs font-black flex items-center gap-2 hover:bg-white transition shadow-xl">Shop the collection <ArrowRight size={16}/></button><button onClick={()=>browse('Menswear')} className="rounded-full border border-white/30 bg-white/10 backdrop-blur px-6 py-3.5 text-xs font-bold hover:bg-white/15 transition">Explore men's wear</button></div>
          <div className="mt-10 flex flex-wrap gap-5 text-[10px] text-white/75 font-semibold"><span className="flex items-center gap-2"><Truck size={15} className="text-[#d7b66f]"/> Nationwide delivery</span><span className="flex items-center gap-2"><ShieldCheck size={15} className="text-[#d7b66f]"/> Quality checked</span><span className="flex items-center gap-2"><Leaf size={15} className="text-[#d7b66f]"/> Heritage fabrics</span></div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2"><span className="w-8 h-1 rounded-full bg-[#d7b66f]"/><span className="w-2 h-1 rounded-full bg-white/50"/><span className="w-2 h-1 rounded-full bg-white/50"/></div>
    </section>

    <section className="border-b border-[#e9e3d8] bg-white">
      <div className="section-wrap grid grid-cols-2 md:grid-cols-4 divide-x divide-[#e9e3d8]">
        {[['Free Delivery','Across Pakistan','Truck'],['Easy Returns','7 days from delivery','Shield'],['Cash on Delivery','Available nationwide','Card'],['WhatsApp Support','Fast order assistance','Chat']].map(([title,note,icon],i)=><div key={title} className="px-4 py-5 md:px-7 flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-[#f4ead8] text-[#8c6d37] flex items-center justify-center">{icon==='Truck'?<Truck size={16}/>:icon==='Shield'?<ShieldCheck size={16}/>:icon==='Card'?<Grid2X2 size={16}/>:<Heart size={16}/>}</div><div><div className="text-[11px] font-black text-[#19322a]">{title}</div><div className="text-[9px] text-[#7b827d] mt-0.5">{note}</div></div></div>)}
      </div>
    </section>

    <section className="section-wrap pt-12 md:pt-16">
      <div className="flex items-end justify-between gap-4 mb-6"><div><div className="eyebrow">Shop by edit</div><h2 className="serif text-3xl md:text-4xl mt-2">Made for Pakistan</h2></div><button onClick={()=>browse('All')} className="hidden sm:flex items-center gap-1 text-xs font-black hover:text-[#a48348]">View all <ChevronRight size={15}/></button></div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
        {categories.map((item,i)=><button key={item.name} onClick={()=>browse(item.cat)} className={`group rounded-2xl border p-5 text-left transition hover:-translate-y-1 ${i===0?'bg-[#0b201b] border-[#0b201b] text-white':'bg-white border-[#e9e3d8] text-[#10221d] hover:border-[#c9b98f]'}`}><div className={`w-11 h-11 rounded-full flex items-center justify-center mb-7 ${i===0?'bg-white/10 text-[#d7b66f]':'bg-[#f4ead8] text-[#8c6d37]'}`}>{item.icon}</div><div className="text-sm font-black">{item.name}</div><div className={`text-[10px] mt-1 ${i===0?'text-white/55':'text-[#7a817d]'}`}>{item.note}</div></button>)}
      </div>
    </section>

    <section className="section-wrap pt-14 md:pt-20">
      <div className="flex items-end justify-between gap-4 mb-7"><div><div className="eyebrow">Handpicked for you</div><h2 className="serif text-3xl md:text-4xl mt-2">Featured products</h2><p className="text-xs text-[#7b827d] mt-2">Authentic Pakistani styles, thoughtfully selected for the season.</p></div><button onClick={()=>browse('All')} className="hidden sm:flex items-center gap-2 rounded-full border border-[#d8d0c1] px-4 py-2.5 text-xs font-black hover:bg-white">View all products <ArrowRight size={14}/></button></div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">{featured.map(p=><ProductCard key={p.id} product={p}/>)}</div>
    </section>

    <section className="section-wrap pt-14 md:pt-20"><div className="rounded-[28px] overflow-hidden bg-[#e9e0cf] relative min-h-[270px] flex items-center"><div className="absolute inset-0 bg-[linear-gradient(90deg,#10221d_0%,#10221d_48%,rgba(16,34,29,.5)_72%,transparent)]"/><div className="relative z-10 px-7 py-12 md:px-12 max-w-xl text-white"><div className="eyebrow text-[#d7b66f]">The Kamalia promise</div><h2 className="serif text-3xl md:text-4xl mt-3">From Punjab's loom to your wardrobe.</h2><p className="text-white/70 text-sm leading-6 mt-4">We keep the edit focused on Pakistani fabrics, silhouettes and craftsmanship — with straightforward pricing in PKR and delivery built for customers across the country.</p><button onClick={()=>setActiveTab('shop')} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f7f2e8] text-[#10221d] px-5 py-3 text-xs font-black">Discover Kamalia <ArrowRight size={14}/></button></div></div></section>
  </div>;
}
