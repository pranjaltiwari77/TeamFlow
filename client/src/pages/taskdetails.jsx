import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { getTaskById } from "../services/task.service";
import TaskInfo from "../components/taskinfo";
import CommentSection from "../components/commentsection";
import ActivityTimeline from "../components/activitytimeline";

function TaskDetails() {
  const { id } = useParams();

  const [task, setTask] = useState(null);

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    try {
      const response = await getTaskById(id);
      setTask(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!task) {
    return (
      <MainLayout>
        <h2 className="text-center mt-10">
          Loading...
        </h2>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-6">

        <TaskInfo task={task} />
        <CommentSection taskId={id} />
        <ActivityTimeline taskId={id} />

      </div>
    </MainLayout>
  );
}

export default TaskDetails;