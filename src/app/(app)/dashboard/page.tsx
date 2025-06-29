"use client";

import AppHeader from "@/components/layout/header";
import OverviewCards from "@/components/dashboard/overview-cards";
import ExpenseChart from "@/components/dashboard/expense-chart";
import RecentTransactions from "@/components/dashboard/recent-transactions";
import { AddTransactionDialog } from "@/components/transactions/add-transaction-dialog";
import SalaryCard from "@/components/dashboard/salary-card";

export default function DashboardPage() {
  return (
    <>
      <AppHeader title="Dashboard">
        <AddTransactionDialog />
      </AppHeader>
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <OverviewCards />
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ExpenseChart />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <SalaryCard />
            <RecentTransactions />
          </div>
        </div>
      </div>
    </>
  );
}
