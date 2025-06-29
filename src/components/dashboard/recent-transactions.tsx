"use client";

import { useAppContext } from "@/context/app-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export default function RecentTransactions() {
  const { state } = useAppContext();
  const recentTransactions = state.transactions.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your last 5 transactions.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentTransactions.map((transaction) => {
            const Icon = transaction.category.icon;
            return (
              <li key={transaction.id} className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-full">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">{transaction.category.name}</p>
                </div>
                <div className={cn(
                  "font-semibold",
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                )}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
