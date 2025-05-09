import React from 'react';

// Accept props similar to Tasks component
function Completed({ tasks = [], onDeleteTask = () => {} }) { // Added default prop
    return (
        <div className="p-8">
            <h2 className="text-xl relative right-[4vh] sm:right-auto lg:text-3xl font-bold mb-4">Completed Tasks</h2> {/* Adjusted size and added positioning */}
            <p className="text-gray-600 relative right-[4vh] sm:right-auto lg:text-2xl">Here are your completed tasks.</p> {/* Adjusted size and added positioning */}
            {/* Display the list of tasks (similar to Tasks component) */}
            <ul className="mt-4 list-none relative right-[4vh] sm:right-auto"> {/* Added positioning classes */}
                {tasks.map((task) => (
                    <li key={task.id} className="flex justify-between items-center mb-2 p-2 border rounded bg-gray-100 shadow-sm"> {/* Adjusted background */}
                        <span className="line-through text-gray-500">{task.text}</span> {/* Added styling for completed */}
                        {/* Delete Button */}
                        <button onClick={() => onDeleteTask(task.id)} className="p-1 text-red-500 hover:text-red-700" title="Delete Task">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
                             </svg>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Completed;