import React, { useState } from 'react';

const initialTasks = {
  todo: [
    { id: 'task1', content: 'Task 1', priority: 'Medium', assignee: 'John', status: 'To Do' },
    { id: 'task2', content: 'Task 2', priority: 'High', assignee: 'Jane', status: 'To Do' },
  ],
  inProgress: [
    { id: 'task3', content: 'Task 3', priority: 'Low', assignee: 'Alice', status: 'In Progress' },
  ],
  done: [
    { id: 'task4', content: 'Task 4', priority: 'Medium', assignee: 'Bob', status: 'Done' },
  ],
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newAssignee, setNewAssignee] = useState('');
  const [currentView, setCurrentView] = useState('kanban');
  const [draggedTask, setDraggedTask] = useState(null);

  const onDragStart = (e, task, sourceColumnId) => {
    setDraggedTask({ task, sourceColumnId });
    e.dataTransfer.setData('text/plain', task.id);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetColumnId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text');
    if (draggedTask && draggedTask.sourceColumnId !== targetColumnId) {
      const updatedTasks = { ...tasks };
      const taskToMove = updatedTasks[draggedTask.sourceColumnId].find(t => t.id === taskId);
      updatedTasks[draggedTask.sourceColumnId] = updatedTasks[draggedTask.sourceColumnId].filter(t => t.id !== taskId);
      updatedTasks[targetColumnId] = [...updatedTasks[targetColumnId], {...taskToMove, status: targetColumnId}];
      setTasks(updatedTasks);
    }
    setDraggedTask(null);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: `task${Date.now()}`,
        content: newTask,
        priority: newPriority,
        assignee: newAssignee,
        status: 'To Do',
      };
      setTasks(prev => ({
        ...prev,
        todo: [...prev.todo, newTaskObj],
      }));
      setNewTask('');
      setNewPriority('Medium');
      setNewAssignee('');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low': return '#90EE90';
      case 'Medium': return '#FFFFE0';
      case 'High': return '#FFA07A';
      default: return '#F0F0F0';
    }
  };

  const renderKanbanView = () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {Object.entries(tasks).map(([columnId, columnTasks]) => (
        <div 
          key={columnId} 
          style={{ 
            backgroundColor: '#F0F0F0', 
            padding: '1rem', 
            borderRadius: '0.5rem', 
            width: '33%' 
          }}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, columnId)}
        >
          <h2 style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '1rem' }}>
            {columnId === 'inProgress' ? 'In Progress' : columnId.charAt(0).toUpperCase() + columnId.slice(1)}
          </h2>
          <div style={{ minHeight: '200px' }}>
            {columnTasks.map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => onDragStart(e, task, columnId)}
                style={{
                  padding: '0.5rem',
                  marginBottom: '0.5rem',
                  backgroundColor: getPriorityColor(task.priority),
                  borderRadius: '0.25rem',
                  cursor: 'move'
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{task.content}</div>
                <div style={{ fontSize: '0.875em', color: '#666', display: 'flex', alignItems: 'center', marginTop: '0.25rem' }}>
                  <span style={{ marginRight: '0.5rem' }}>{task.priority}</span>
                  <span style={{ marginRight: '0.25rem' }}>👤</span>
                  <span>{task.assignee}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderTableView = () => (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <th style={tableHeaderStyle}>Task</th>
          <th style={tableHeaderStyle}>Priority</th>
          <th style={tableHeaderStyle}>Assignee</th>
          <th style={tableHeaderStyle}>Status</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(tasks).flat().map((task) => (
          <tr key={task.id}>
            <td style={tableCellStyle}>{task.content}</td>
            <td style={tableCellStyle}>{task.priority}</td>
            <td style={tableCellStyle}>{task.assignee}</td>
            <td style={tableCellStyle}>{task.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderListView = () => (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {Object.values(tasks).flat().map((task) => (
        <li key={task.id} style={{ 
          marginBottom: '0.5rem', 
          padding: '0.5rem', 
          backgroundColor: getPriorityColor(task.priority),
          borderRadius: '0.25rem'
        }}>
          <div style={{ fontWeight: 'bold' }}>{task.content}</div>
          <div style={{ fontSize: '0.875em', color: '#666' }}>
            Priority: {task.priority} | Assignee: {task.assignee} | Status: {task.status}
          </div>
        </li>
      ))}
    </ul>
  );

  const tableHeaderStyle = {
    padding: '0.5rem',
    textAlign: 'left',
    borderBottom: '1px solid #ddd'
  };

  const tableCellStyle = {
    padding: '0.5rem',
    borderBottom: '1px solid #ddd'
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text"
          placeholder="New task" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)}
          style={{ flexGrow: 1, padding: '0.5rem' }}
        />
        <select 
          value={newPriority} 
          onChange={(e) => setNewPriority(e.target.value)}
          style={{ padding: '0.5rem', width: '120px' }}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input 
          type="text"
          placeholder="Assignee" 
          value={newAssignee} 
          onChange={(e) => setNewAssignee(e.target.value)}
          style={{ padding: '0.5rem', width: '120px' }}
        />
        <button onClick={addTask} style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2em' }}>+</span> Add Task
        </button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '0.5rem' }}>View: </label>
        <select 
          value={currentView} 
          onChange={(e) => setCurrentView(e.target.value)}
          style={{ padding: '0.5rem' }}
        >
          <option value="kanban">Kanban</option>
          <option value="table">Table</option>
          <option value="list">List</option>
        </select>
      </div>
      
      {currentView === 'kanban' && renderKanbanView()}
      {currentView === 'table' && renderTableView()}
      {currentView === 'list' && renderListView()}
    </div>
  );
};

export default TaskBoard;