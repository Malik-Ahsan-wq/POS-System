"use client";
import Receipt from "./Receipt";
import { CartItem } from "../../data/menu";
import { Trash2, ShoppingCart } from "lucide-react";

export default function Cart({
  cart,
  total,
  updateQty,
  removeFromCart,
  clearCart,
}: {
  cart: CartItem[];
  total: number;
  updateQty: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}) {
  const taxRate = 0; // 0% for now
  const tax = total * taxRate;
  const grandTotal = total + tax;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Cart Header */}
      <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <div className="flex items-center gap-2">
          <ShoppingCart className="text-blue-600" size={24} />
          <h2 className="text-xl font-bold text-gray-800">Current Order</h2>
        </div>
        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
          {cart.reduce((acc, item) => acc + item.qty, 0)} Items
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <ShoppingCart size={48} className="mb-2 opacity-20" />
            <p>No items in cart</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-gray-800">{item.name}</h4>
                  <p className="text-xs text-gray-500">Rs {item.price} / unit</p>
                </div>
                <p className="font-bold text-gray-800">Rs {item.price * item.qty}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded shadow text-gray-600 hover:text-red-500 font-bold disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="w-4 text-center font-bold text-sm">{item.qty}</span>
                  <button 
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded shadow text-gray-600 hover:text-green-500 font-bold"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cart Footer */}
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>Rs {total}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax (0%)</span>
            <span>Rs {tax}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>Rs {grandTotal}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={clearCart}
            disabled={cart.length === 0}
            className="px-4 py-3 border border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Clear
          </button>
          {/* We will pass cart and total to Receipt component which will contain the Print button */}
          <Receipt cart={cart} total={grandTotal} />
        </div>
      </div>
    </div>
  );
}
