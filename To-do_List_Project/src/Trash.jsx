import React from 'react';

// Accept props similar to Tasks component
function Trash({ tasks = [], onDeleteTask = () => {}, onRestoreTask = () => {} }) { // Added onRestoreTask prop
    return (
        <div className="p-8">
            <h2 className="text-xl relative right-[4vh] sm:right-auto lg:text-3xl font-bold mb-4">Trash</h2> {/* Adjusted size and added positioning */}
            <p className="text-gray-600 relative right-[4vh] sm:right-auto lg:text-2xl">Items in the trash.</p> {/* Adjusted size and added positioning */}
            {/* Display the list of tasks (similar to Tasks component) */}
            <ul className="mt-4 list-none relative right-[4vh] sm:right-auto"> {/* Changed list style and added positioning */}
                {tasks.map((task) => (
                    <li key={task.id} className="flex justify-between items-center mb-2">
                        <span className="text-gray-500 flex-grow">{task.text}</span> {/* Styling for trashed items, flex-grow to push buttons right */}
                        <div className="flex space-x-2"> {/* Container for buttons */}
                            <button
                                onClick={() => onRestoreTask(task.id)}
                                className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                                title="Restore Task">
                                Restore
                            </button>
                            <button onClick={() => onDeleteTask(task.id)} className="px-2 py-1 bg-red-700 text-white rounded hover:bg-red-800 text-xs" title="Delete Permanently">
                                Delete Permanently
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Trash;