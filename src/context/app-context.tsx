"use client";

import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';
import type { Transaction, Budget, TaxDetails } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { calculateTaxes } from '@/ai/tools/tax-calculator';

interface AppState {
  transactions: Transaction[];
  budgets: Budget[];
  annualSalary?: number;
  taxDetails?: TaxDetails;
}

type AppAction =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_BUDGET'; payload: Budget }
  | { type: 'DELETE_BUDGET'; payload: string }
  | { type: 'SET_SALARY_AND_TAXES'; payload: { annualSalary: number, taxDetails: TaxDetails } };


const initialState: AppState = {
  transactions: [
    { id: '2', type: 'expense', amount: 75.50, date: new Date('2024-07-05'), description: 'Weekly Groceries', category: CATEGORIES.find(c => c.name === 'Groceries')! },
    { id: '3', type: 'expense', amount: 30, date: new Date('2024-07-06'), description: 'Gasoline', category: CATEGORIES.find(c => c.name === 'Transportation')! },
    { id: '4', type: 'expense', amount: 1200, date: new Date('2024-07-01'), description: 'Rent', category: CATEGORIES.find(c => c.name === 'Housing')! },
    { id: '5', type: 'expense', amount: 25.00, date: new Date('2024-07-10'), description: 'Movie tickets', category: CATEGORIES.find(c => c.name === 'Entertainment')! },
  ],
  budgets: [
    { id: 'b1', categoryName: 'Groceries', amount: 400 },
    { id: 'b2', categoryName: 'Entertainment', amount: 150 },
  ],
  annualSalary: 60000, // Default annual salary
  taxDetails: undefined,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };
    case 'SET_BUDGET': {
      const existingBudgetIndex = state.budgets.findIndex(b => b.categoryName === action.payload.categoryName);
      if (existingBudgetIndex > -1) {
        const updatedBudgets = [...state.budgets];
        updatedBudgets[existingBudgetIndex] = action.payload;
        return { ...state, budgets: updatedBudgets };
      }
      return {
        ...state,
        budgets: [...state.budgets, action.payload],
      };
    }
    case 'DELETE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.filter(b => b.id !== action.payload),
      };
    case 'SET_SALARY_AND_TAXES':
      return {
        ...state,
        annualSalary: action.payload.annualSalary,
        taxDetails: action.payload.taxDetails,
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  useEffect(() => {
    const initializeTaxDetails = async () => {
      if (state.annualSalary && !state.taxDetails) {
        try {
          const taxDetails = await calculateTaxes(state.annualSalary);
          dispatch({ type: 'SET_SALARY_AND_TAXES', payload: { annualSalary: state.annualSalary, taxDetails } });
        } catch (e) {
            console.error("Failed to calculate initial taxes", e);
        }
      }
    };
    initializeTaxDetails();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
