function DashboardCard({
  title,
  value,
  color,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl p-6 shadow-lg text-white ${color}
      cursor-pointer hover:scale-105 transition duration-300`}
    >
      <h3 className="text-lg font-medium">
        {title}
      </h3>

      <p className="text-4xl font-bold mt-3">
        {value}
      </p>
    </div>
  );
}

export default DashboardCard;