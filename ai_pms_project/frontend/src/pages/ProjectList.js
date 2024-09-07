import React from 'react';

function ProjectList() {
  return (
    <div className="page-content">
      <h1 className="page-title">Project List</h1>
      <ul className="project-list">
        <li className="project-item">
          <h2>Project Alpha</h2>
          <p>Status: In Progress</p>
          <p>Deadline: December 31, 2024</p>
        </li>
        <li className="project-item">
          <h2>Project Beta</h2>
          <p>Status: Planning</p>
          <p>Deadline: March 15, 2025</p>
        </li>
        {/* Add more project items as needed */}
      </ul>
    </div>
  );
}

export default ProjectList;