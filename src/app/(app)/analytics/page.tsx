import AppHeader from "@/components/layout/header";
import TrendsChart from "@/components/analytics/trends-chart";

export default function AnalyticsPage() {
  return (
    <>
      <AppHeader title="Analytics" />
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <TrendsChart />
      </div>
    </>
  );
}
