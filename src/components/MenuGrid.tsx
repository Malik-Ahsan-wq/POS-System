"use client";
import { MenuItem } from "../../data/menu";

export default function MenuGrid({
  menu,
  onAdd,
}: {
  menu: MenuItem[];
  onAdd: (item: MenuItem) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {menu.map((item) => (
        <button
          key={item.id}
          onClick={() => onAdd(item)}
          className="group bg-white border border-gray-200 p-4 rounded-xl hover:shadow-lg transition-all duration-200 text-left flex flex-col justify-between h-32 hover:border-blue-500 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:bg-blue-100"></div>
          
          <div className="relative z-10">
            <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">{item.name}</h3>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{item.category}</p>
          </div>
          
          <div className="relative z-10 flex items-end justify-between w-full mt-auto">
            <p className="font-bold text-blue-600 text-lg">Rs {item.price}</p>
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              +
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
