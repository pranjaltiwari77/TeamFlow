import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ProjectForm from "../components/projectform";
import {
  getProjects,
  createProject,
} from "../services/project.service";
import { toast } from "sonner";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateProject = async (projectData) => {
    console.log(projectData); // 👈 Add this
  
    try {
      await createProject(projectData);
  
      toast.success("Project Created Successfully");
  
      loadProjects();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Projects
        </h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + New Project
        </button>
      </div>

      <ProjectForm onSubmit={handleCreateProject} />

      <div className="space-y-4 mt-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white p-5 rounded-lg shadow"
          >
            <h2 className="text-xl font-bold">
              {project.name}
            </h2>

            <p>{project.description}</p>

            <p className="mt-2">
              Status : {project.status}
            </p>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default Projects;