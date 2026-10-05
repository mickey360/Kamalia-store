"use client";
import React,{useContext,useEffect,useMemo,useState} from "react";
import * as I from "lucide-react";
import { AppContext } from "@/components/store/AppProvider";

const { ShoppingBag,Heart,Search,Menu,X,ChevronRight,Star,Trash2,Plus,Minus,Truck,ShieldCheck,CreditCard,CheckCircle2,Package,Clock,ArrowRight,Filter,Sparkles,User,Copy,ExternalLink,Lock,Eye,RefreshCw,Check,Share2,HelpCircle,PhoneCall,MapPin,TrendingUp,BarChart2,Settings,SlidersHorizontal,ChevronDown,Percent,CheckCircle,AlertCircle,MessageCircle,Edit3,PlusCircle,Layers,ShoppingBasket,DollarSign,Send,LogOut } = I;

function DbSchemaViewerPage() {
  const schemaCode = `
// Prisma PostgreSQL Schema for Kamalia Store (Neon DB / Vercel)

model Product {
  id            String   @id @default(cuid())
  name          String
  category      String
  fabric        String
  price         Float
  originalPrice Float?
  rating        Float    @default(5.0)
  stock         Int      @default(20)
  image         String
  gallery       String[]
  description   String
  createdAt     DateTime @default(now())
}

model Order {
  id            String   @id @default(cuid())
  orderNumber   String   @unique
  totalAmount   Float
  paymentMethod String   // COD, JazzCash, EasyPaisa, Raast
  orderStatus   String   @default("Confirmed")
  customerName  String
  customerPhone String
  city          String
  address       String
  createdAt     DateTime @default(now())
}
  `;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2">
          <Settings size={20} className="text-emerald-800" /> Database Architecture Schema
        </h1>
        <p className="text-slate-500 text-xs">Pre-configured Prisma ORM Schema for Neon PostgreSQL deployment</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
        <pre className="text-xs text-amber-300 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
          {schemaCode}
        </pre>
      </div>
    </div>
  );
}
export default DbSchemaViewerPage;
