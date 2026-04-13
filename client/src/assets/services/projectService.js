// src/assets/services/projectService.js

const projectService = {
  getProjects: async () => {
    try {
      const response = await fetch("http://localhost:5000/projects"); // backend URL
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in projectService:", error);
      return [];
    }
  },
};

export default projectService;