export type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export type CartItem = MenuItem & { qty: number };

export const menu: MenuItem[] = [
  { id: 1, name: "Chicken Shawarma", price: 250, category: "Fast Food" },
  { id: 2, name: "Beef Shawarma", price: 300, category: "Fast Food" },
  { id: 3, name: "Zinger Burger", price: 350, category: "Fast Food" },
  { id: 4, name: "Chicken Burger", price: 300, category: "Fast Food" },
  { id: 5, name: "Beef Burger", price: 400, category: "Fast Food" },
  { id: 6, name: "Fries", price: 150, category: "Sides" },
  { id: 7, name: "Loaded Fries", price: 250, category: "Sides" },
  { id: 8, name: "Pizza Slice", price: 200, category: "Sides" },
  { id: 9, name: "BBQ Roll", price: 180, category: "Fast Food" },
  { id: 10, name: "Chicken Roll", price: 160, category: "Fast Food" },
  { id: 11, name: "Club Sandwich", price: 280, category: "Sandwiches" },
  { id: 12, name: "Grilled Sandwich", price: 260, category: "Sandwiches" },
  { id: 13, name: "Cold Drink", price: 100, category: "Drinks" },
  { id: 14, name: "Mineral Water", price: 80, category: "Drinks" },
  { id: 15, name: "Tea", price: 60, category: "Drinks" },
  { id: 16, name: "Coffee", price: 120, category: "Drinks" },
  { id: 17, name: "Ice Cream", price: 150, category: "Dessert" },
  { id: 18, name: "Pasta", price: 350, category: "Main Course" },
  { id: 19, name: "Chicken Biryani", price: 300, category: "Main Course" },
  { id: 20, name: "Beef Biryani", price: 350, category: "Main Course" }
];

export const categories = [
  "All",
  "Fast Food",
  "Sides",
  "Sandwiches",
  "Drinks",
  "Main Course",
  "Dessert"
];
