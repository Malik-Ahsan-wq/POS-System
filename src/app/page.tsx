"use client";

import { useState, useMemo } from "react";
import { menu, MenuItem, categories, CartItem } from "../../data/menu";
import MenuGrid from "@/components/MenuGrid";
import Cart from "@/components/Cart";
import { Search, LayoutGrid, Pizza, UtensilsCrossed, IceCream, Sandwich, GlassWater } from "lucide-react";
import clsx from "clsx";

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMenu = useMemo(() => {
    return menu.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);
      if (exist) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (id: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    if (confirm("Are you sure you want to clear the cart?")) {
      setCart([]);
    }
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  // Helper to get icon for category
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Fast Food": return <Pizza size={20} />;
      case "Sides": return <LayoutGrid size={20} />;
      case "Sandwiches": return <Sandwich size={20} />;
      case "Drinks": return <GlassWater size={20} />;
      case "Main Course": return <UtensilsCrossed size={20} />;
      case "Dessert": return <IceCream size={20} />;
      default: return <LayoutGrid size={20} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar - Categories */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              POS
            </div>
            System
          </h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left font-medium",
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {getCategoryIcon(cat)}
              {cat}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 text-xs text-center text-gray-400">
          POS System v1.0
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center px-8 justify-between">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 rounded-xl transition-all outline-none"
            />
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Current Session</p>
            <p className="font-bold text-gray-800" suppressHydrationWarning>{new Date().toLocaleDateString()}</p>
          </div>
        </header>

        {/* Menu Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800">{selectedCategory} Menu</h2>
            <p className="text-gray-500 text-sm">{filteredMenu.length} items found</p>
          </div>
          <MenuGrid menu={filteredMenu} onAdd={addToCart} />
        </div>
      </main>

      {/* Right Sidebar - Cart */}
      <aside className="w-96 bg-white border-l border-gray-200 flex flex-col h-full shadow-2xl z-10">
        <Cart 
          cart={cart} 
          total={total} 
          updateQty={updateQty} 
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
      </aside>
    </div>
  );
}
