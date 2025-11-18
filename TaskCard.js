import React from 'react';

const TaskCard = ({ task, onUpdate, onDelete, currentUserId }) => {
  const isOwner = currentUserId === task.userId || currentUserId === task.userId.toString();

  return (
    <div style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>Progress: {task.progress}</p>
      <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'None'}</p>

      {isOwner && (
        <div>
          <select
            value={task.progress}
            onChange={(e) => onUpdate(task._id, { progress: e.target.value })}
          >
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button onClick={() => onDelete(task._id)} style={{ marginLeft: 8 }}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
