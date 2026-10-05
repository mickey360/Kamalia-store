"use client";

import React,{useMemo,useState} from "react";
import { INITIAL_PRODUCTS_DATA } from "@/data/store-data";

export const AppContext = React.createContext<any>(null);

export function StoreProvider({children}:{children:React.ReactNode}) {

  // Navigation & View Controller
  const [activeTab, setActiveTab] = useState('home'); // home, shop, product-detail, checkout, order-success, track, admin, db-schema
  
  // Product Catalog State (Supports adding new products via Admin)
  const [products, setProducts] = useState(INITIAL_PRODUCTS_DATA);
  const [selectedProduct, setSelectedProduct] = useState(INITIAL_PRODUCTS_DATA[0]);
  
  // Catalog Filters
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [fabricFilter, setFabricFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState(12000);
  const [sortBy, setSortBy] = useState('popular');

  // Shopping Cart & Wishlist State
  const [cart, setCart] = useState([
    {
      product: INITIAL_PRODUCTS_DATA[0],
      size: 'Unstitched (7 Yards)',
      color: 'Emerald Green',
      quantity: 1,
      price: INITIAL_PRODUCTS_DATA[0].price
    }
  ]);
  const [wishlist, setWishlist] = useState(['kam-01', 'kam-04']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Promo Code State
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState('');

  // Orders State (Managed via Store & Admin)
  const [orders, setOrders] = useState([
    {
      id: 'KAM-91024',
      date: '2026-10-01',
      items: [
        { name: 'Kamalia Master Pure Slub Khaddar', qty: 1, price: 4850, size: 'Unstitched (7 Yards)' }
      ],
      totalAmount: 4850,
      paymentMethod: 'Cash on Delivery (COD)',
      paymentStatus: 'Pending (COD)',
      orderStatus: 'Dispatched',
      customer: {
        fullName: 'Chaudhry Hamza',
        phone: '03009876543',
        city: 'Lahore',
        address: 'House 14, Block B, DHA Phase 5'
      }
    },
    {
      id: 'KAM-90811',
      date: '2026-09-28',
      items: [
        { name: 'Royal Velvet Tilla Embroidered Shawl', qty: 1, price: 8900, size: 'Standard Shawl' }
      ],
      totalAmount: 8900,
      paymentMethod: 'JazzCash',
      paymentStatus: 'Paid',
      orderStatus: 'Delivered',
      customer: {
        fullName: 'Ayesha Malik',
        phone: '03214567890',
        city: 'Islamabad',
        address: 'Street 9, F-7/2'
      }
    }
  ]);

  const [latestOrder, setLatestOrder] = useState(null);

  // Global Toast Notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percentage') {
      return (cartSubtotal * appliedCoupon.value) / 100;
    }
    return appliedCoupon.value;
  }, [appliedCoupon, cartSubtotal]);

  const shippingFee = cartSubtotal >= 5000 || cartSubtotal === 0 ? 0 : 250;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // Cart Handlers
  const addToCart = (product, size, color, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        i => i.product.id === product.id && i.size === size && i.color === color
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, size, color, quantity, price: product.price }];
    });
    showToast(`Added "${product.name}" to cart!`);
    setIsCartOpen(true);
  };

  const updateCartQty = (index, delta) => {
    setCart(prev => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const removeFromCart = index => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast('Item removed from cart', 'info');
  };

  const toggleWishlist = productId => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your wishlist!');
        return [...prev, productId];
      }
    });
  };

  const applyPromoCode = () => {
    const code = couponInput.trim().toUpperCase();
    if (code === 'KAMALIA10' || code === 'EID2026') {
      setAppliedCoupon({ code, value: 10, type: 'percentage' });
      setCouponMessage('10% Flat Discount Applied!');
      showToast('10% Promo Code Applied');
    } else if (code === 'FREEFREE') {
      setAppliedCoupon({ code, value: 250, type: 'flat' });
      setCouponMessage('Free Shipping Voucher Applied!');
      showToast('Free Shipping Voucher Applied');
    } else {
      setCouponMessage('Invalid Coupon Code');
      showToast('Invalid Coupon Code', 'error');
    }
  };

  // Add Product (Admin Action)
  const addNewProduct = newProd => {
    setProducts(prev => [newProd, ...prev]);
    showToast(`Product "${newProd.name}" added successfully!`);
  };

  // Delete Product (Admin Action)
  const deleteProduct = prodId => {
    setProducts(prev => prev.filter(p => p.id !== prodId));
    showToast('Product removed from store catalog', 'info');
  };


  return <AppContext.Provider value={{
      activeTab,setActiveTab,products,setProducts,addNewProduct,deleteProduct,selectedProduct,setSelectedProduct,
      categoryFilter,setCategoryFilter,fabricFilter,setFabricFilter,searchQuery,setSearchQuery,priceRange,setPriceRange,sortBy,setSortBy,
      cart,addToCart,updateCartQty,removeFromCart,wishlist,toggleWishlist,cartSubtotal,discountAmount,shippingFee,grandTotal,
      appliedCoupon,couponInput,setCouponInput,couponMessage,applyPromoCode,isCartOpen,setIsCartOpen,isWishlistOpen,setIsWishlistOpen,
      orders,setOrders,latestOrder,setLatestOrder,toast,showToast
  }}>{children}</AppContext.Provider>;
}
