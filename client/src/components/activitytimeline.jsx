import { useEffect, useState } from "react";
import { getActivities } from "../services/activity.service";

function ActivityTimeline({ taskId }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const response = await getActivities(taskId);
      setActivities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-5">
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <p className="text-gray-500">
          No activity found.
        </p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity._id}
            className="border-l-4 border-blue-500 pl-4 py-3 mb-4"
          >
            <h3 className="font-semibold">
              {activity.action}
            </h3>

            <p className="text-gray-600">
              {activity.user?.name}
            </p>

            {activity.previousValue && (
              <p className="text-sm text-gray-500">
                {activity.previousValue} → {activity.newValue}
              </p>
            )}

            <small className="text-gray-400">
              {new Date(activity.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}

    </div>
  );
}

export default ActivityTimeline;