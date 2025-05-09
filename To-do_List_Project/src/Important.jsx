import React from 'react';

// Accept props similar to Tasks component
function Important({ tasks = [], onDeleteTask = () => {}, onEditTask = () => {}, onCompleteTask = () => {} }) { // Added props with defaults
    return (
        <div className="p-8">
            <h2 className="text-xl relative right-[4vh] sm:right-auto lg:text-3xl font-bold mb-4">Important Tasks</h2> {/* Adjusted size and added positioning */}
            <p className="text-gray-600 relative right-[4vh] sm:right-auto lg:text-2xl">Here are your important tasks.</p> {/* Adjusted size and added positioning */}
            {/* Display the list of tasks (similar to Tasks component) */}
            <ul className="mt-4 list-none relative right-[4vh] sm:right-auto"> {/* Added positioning classes */}
                {tasks.map((task) => (
                    <li key={task.id} className="flex justify-between items-left mb-2 p-2 border rounded bg-white shadow-sm">
                        <span>{task.text}</span>
                        <div className="flex items-center ml-4 space-x-2">
                            {/* Checkmark Button - moved into the actions group */}
                            <button onClick={() => onCompleteTask(task.id)} className="p-1 text-green-500 hover:text-green-700" title="Complete Task"> {/* Removed mr-2, space-x-2 will handle spacing */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                            <button onClick={() => onEditTask(task.id)} className="p-1 text-blue-500 hover:text-blue-700" title="Edit Task">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                            {/* Remove/Delete Button */}
                            <button onClick={() => onDeleteTask(task.id)} className="p-1 text-yellow-600 hover:text-yellow-700" title="Remove from Important">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Important;