"use client";
import { Printer } from "lucide-react";
import { CartItem } from "../../data/menu";
import { useEffect, useState } from "react";

export default function Receipt({ cart, total }: { cart: CartItem[]; total: number }) {
  const [orderId, setOrderId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrderId(Math.floor(Math.random() * 10000).toString().padStart(4, '0'));
      setDate(new Date().toLocaleDateString());
      setTime(new Date().toLocaleTimeString());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <button
        onClick={handlePrint}
        disabled={cart.length === 0}
        className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors print:hidden"
      >
        <Printer size={20} />
        Print
      </button>

      {/* PRINT AREA */}
      <div id="receipt-print" className="hidden print:block text-black font-mono p-2">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold uppercase tracking-wider">My Restaurant</h2>
          <p className="text-sm">123 Food Street, City</p>
          <p className="text-sm">Tel: +92 300 1234567</p>
        </div>

        <div className="mb-4 text-xs border-b border-dashed border-black pb-2">
          <div className="flex justify-between">
            <span>Date: {date}</span>
            <span>Time: {time}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Order #: {orderId}</span>
            <span>Cashier: Admin</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between font-bold border-b border-black mb-2 pb-1 text-sm">
            <span className="w-1/2 text-left">Item</span>
            <span className="w-1/4 text-center">Qty</span>
            <span className="w-1/4 text-right">Price</span>
          </div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm mb-1">
              <span className="w-1/2 text-left truncate">{item.name}</span>
              <span className="w-1/4 text-center">{item.qty}</span>
              <span className="w-1/4 text-right">{item.price * item.qty}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-black pt-2 mb-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>Rs {total}</span>
          </div>
        </div>

        <div className="text-center text-xs">
          <p className="font-bold mb-1">*** THANK YOU ***</p>
          <p>Please visit again!</p>
          <p className="mt-2 text-[10px]">Software by Trae AI</p>
        </div>
      </div>
    </>
  );
}
