import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/DashboardCard";
import DashboardChart from "../components/dashboardchart";
import { getDashboardData } from "../services/dashboard.service";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await getDashboardData();

      setDashboard(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const chartData = [
    {
      name: "Completed",
      value: dashboard.completedTasks,
    },
    {
      name: "Pending",
      value: dashboard.pendingTasks,
    },
    {
      name: "In Progress",
      value: dashboard.inProgressTasks,
    },
    {
      name: "Overdue",
      value: dashboard.overdueTasks,
    },
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h1 className="text-2xl font-bold">Loading Dashboard...</h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <DashboardCard
            title="Total Users"
            value={dashboard.totalUsers}
            color="bg-blue-600"
            onClick={() => navigate("/users")}
          />

          <DashboardCard
            title="Projects"
            value={dashboard.totalProjects}
            color="bg-green-600"
            onClick={() => navigate("/projects")}
          />

          <DashboardCard
            title="Tasks"
            value={dashboard.totalTasks}
            color="bg-yellow-500"
            onClick={() => navigate("/tasks")}
          />

          <DashboardCard
            title="Overdue"
            value={dashboard.overdueTasks}
            color="bg-red-600"
          />

          <DashboardCard
            title="Pending"
            value={dashboard.pendingTasks}
            color="bg-orange-500"
          />

          <DashboardCard
            title="In Progress"
            value={dashboard.inProgressTasks}
            color="bg-indigo-600"
          />

          <DashboardCard
            title="Completed"
            value={dashboard.completedTasks}
            color="bg-emerald-600"
          />

          <DashboardCard
            title="Active Projects"
            value={dashboard.activeProjects}
            color="bg-purple-600"
          />

        </div>

        <DashboardChart data={chartData} />

      </div>
    </MainLayout>
  );
}

export default Dashboard;