import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
  function DashboardChart({ data }) {
    const COLORS = [
      "#3B82F6",
      "#10B981",
      "#F59E0B",
      "#EF4444",
    ];
  
    return (
      <div className="bg-white rounded-xl shadow p-5 mt-8">
        <h2 className="text-xl font-semibold mb-5">
          Task Overview
        </h2>
  
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
  
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  export default DashboardChart;