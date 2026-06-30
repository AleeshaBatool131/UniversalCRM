import React from "react";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import StatsCard from "../components/Cards/StatsCard.jsx";
import RevenueChart from "../components/Charts/RevenueChart.jsx";
import RecentActivity from "../components/Activity/RecentActivity.jsx";
import { statCards } from "../data/dashboardData.js";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {statCards.map((card) => (
          <StatsCard key={card.id} {...card} />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
}
