import {
  ShoppingCart,
  Car,
  Landmark,
  Bolt,
  Ticket,
  ShoppingBag,
  Home,
  Utensils,
  Plane,
  Heart,
  Book,
  TrendingUp,
  MoreHorizontal,
  PiggyBank
} from "lucide-react";
import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  { name: 'Groceries', icon: ShoppingCart, type: 'expense' },
  { name: 'Transportation', icon: Car, type: 'expense' },
  { name: 'Housing', icon: Home, type: 'expense' },
  { name: 'Food', icon: Utensils, type: 'expense' },
  { name: 'Utilities', icon: Bolt, type: 'expense' },
  { name: 'Entertainment', icon: Ticket, type: 'expense' },
  { name: 'Shopping', icon: ShoppingBag, type: 'expense' },
  { name: 'Travel', icon: Plane, type: 'expense' },
  { name: 'Personal Care', icon: Heart, type: 'expense' },
  { name: 'Education', icon: Book, type: 'expense' },
  { name: 'Investment', icon: TrendingUp, type: 'expense' },
  { name: 'Salary', icon: Landmark, type: 'income' },
  { name: 'Freelance', icon: PiggyBank, type: 'income'},
  { name: 'Other', icon: MoreHorizontal, type: 'all' },
];
