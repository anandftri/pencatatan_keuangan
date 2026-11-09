import Header from "../components/Header";
import StatCard from "../components/StatCard";
import FinanceChart from "../components/FinanceChart";
import CategoryDonut from "../components/CategoryDonut";
import RecentTransactions from "../components/RecentTransactions";
import QuickActions from "../components/QuickActions";
import { stats } from "../data/mockData";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <Header />

      <div className="grid gap-5 md:grid-cols-3">
        {stats.map((s) => (
          <StatCard key={s.id} {...s} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <FinanceChart />
        <CategoryDonut />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <RecentTransactions />
        <QuickActions />
      </div>
    </div>
  );
}
