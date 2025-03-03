// src/pages/ProjectsPage.jsx
import React from 'react';
import Projects from '../components/sections/Projects';
import useGithubIssues from '../hooks/useGithubIssues';

const ProjectsPage = () => {
  // Fetch projects using the 'project' label
  const { 
    issues: projects, 
    loading: projectsLoading 
  } = useGithubIssues('project', null);

  return (
    <div className="pt-10">
      <Projects projects={projects} loading={projectsLoading} />
    </div>
  );
};

export default ProjectsPage;