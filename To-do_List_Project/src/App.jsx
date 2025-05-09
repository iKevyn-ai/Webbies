import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom"; // Import useLocation
import Completed from "./Completed";
import Trash from "./Trash";
import Important from "./Important";
import { useState, useEffect } from "react";
import AddTaskButton from "./AddTaskButton";

// --- Tasks Component (remains largely the same, but ensure it accepts all needed props) ---
// Tasks component should be a presentational component, receiving tasks via props.
// Removed localStorage logic and local state from here.
function Tasks({ tasks = [], onDeleteTask, onEditTask, onCompleteTask }) { 
    return (
        <div className="p-8">
            {/* Removed relative positioning */}
            <h2 className="text-xl relative right-[4vh] sm:right-auto lg:text-3xl font-bold mb-4">Tasks</h2>
            <p className="text-gray-600 relative right-[4vh] sm:right-auto lg:text-2xl">Here are your tasks.</p>
            {/* Display the list of tasks */}
            <ul className="mt-4 list-none relative right-[4vh] sm:right-auto"> {/* Added positioning classes */}
                {tasks.map((task) => ( // Use parentheses for implicit return
                    // Use task.id as key for better performance and stability
                    <li key={task.id} className="flex justify-between items-center mb-2 p-2 border rounded bg-white shadow-sm">
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
                            {/* Delete Button */}
                            <button onClick={() => onDeleteTask(task.id)} className="p-1 text-red-500 hover:text-red-700" title="Delete Task">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
                                </svg>
                            </button> {/* This closes the Delete button */}
                        </div> {/* Changed from </button> to </div> to close the flex container */}
                    </li>
                ))}
            </ul>
        </div>
    );
}


// --- Main App Component ---
function App() {
    const [trashTasks, setTrashTasks] = useState(() => {
        const savedTrashTasks = localStorage.getItem('todoAppTrashTasks');
        return savedTrashTasks ? JSON.parse(savedTrashTasks) : [];
    });
    // --- State ---
    // Initialize state from localStorage or use default values
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('todoAppTasks');
        return savedTasks ? JSON.parse(savedTasks) : [
            { id: 1, text: "Review project requirements" },
            { id: 2, text: "Set up development environment" },
        ];
    });
    const [importantTasks, setImportantTasks] = useState(() => {
        const savedImportantTasks = localStorage.getItem('todoAppImportantTasks');
        return savedImportantTasks ? JSON.parse(savedImportantTasks) : [
            { id: 3, text: "Deploy the application" }
        ];
    });
    const [completedTasks, setCompletedTasks] = useState(() => {
        const savedCompletedTasks = localStorage.getItem('todoAppCompletedTasks');
        return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : [];
    });

    // --- Effects ---
    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('todoAppTasks', JSON.stringify(tasks));
        localStorage.setItem('todoAppImportantTasks', JSON.stringify(importantTasks));
        localStorage.setItem('todoAppCompletedTasks', JSON.stringify(completedTasks));
        localStorage.setItem('todoAppTrashTasks', JSON.stringify(trashTasks)); // Save trashTasks
    }, [tasks, importantTasks, completedTasks, trashTasks]); // Add trashTasks to dependency array

    // --- Hooks ---
    // Get the current location object to determine the active page
    const location = useLocation();

    // --- Handlers ---

    // Add a new task to the correct list based on the current route
    const handleAddTask = (newTaskData) => { // Renamed parameter for clarity
        // newTaskData is an object like { text: "Task Title", details: "Optional details" }
        const newTask = {
            id: Date.now(),
            text: newTaskData.text, // Correctly access the text property
            details: newTaskData.details || "" // Store details, defaulting to empty string if not present
        };

        // Check the current path to decide where to add the task
        if (location.pathname.startsWith('/important')) {
            setImportantTasks(prevImportantTasks => [...prevImportantTasks, newTask]);
        } else {
            // Default to adding to the main 'tasks' list for /tasks or other paths
            setTasks(prevMainTasks => [...prevMainTasks, newTask]);
        }
    };

    // Delete a task from the main 'tasks' list
    const handleDeleteTask = (taskId) => {
        const taskToTrash = tasks.find(task => task.id === taskId);
        if (taskToTrash) {
            // Add originalList property before moving to trash
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            setTrashTasks(prevTrash => [...prevTrash, { ...taskToTrash, originalList: 'tasks' }]);
        }
    };

    // Delete/Remove a task from the 'important' list
    const handleRemoveImportant = (taskId) => {
        const taskToTrash = importantTasks.find(task => task.id === taskId);
        if (taskToTrash) {
            // Add originalList property before moving to trash
            setImportantTasks(prevImportant => prevImportant.filter(task => task.id !== taskId));
            setTrashTasks(prevTrash => [...prevTrash, { ...taskToTrash, originalList: 'important' }]);
        }
    };

    // Delete a task from the 'completed' list
    const handleDeleteCompleted = (taskId) => {
        const taskToTrash = completedTasks.find(task => task.id === taskId);
        if (taskToTrash) {
            // Add originalList property before moving to trash
            // For completed tasks, we might decide to always restore them to the main 'tasks' list
            // or add an 'originalList: 'completed'' if we want to restore to completed.
            // For simplicity, let's assume they go back to 'tasks' or 'important' based on a potential original flag,
            // or default to 'tasks' if they were completed directly without being important.
            // If a task was important then completed, it might lose its 'important' status upon restore this way.
            // A more complex system could preserve more state.
            // For now, let's mark it as coming from 'completed' and handle restore logic.
            setCompletedTasks(prevCompleted => prevCompleted.filter(task => task.id !== taskId));
            setTrashTasks(prevTrash => [...prevTrash, { ...taskToTrash, originalList: 'completed' }]);
        }
    };

    // Permanently delete a task from the trash
    const handlePermanentlyDeleteTask = (taskId) => {
        setTrashTasks(prevTrash => prevTrash.filter(task => task.id !== taskId));
    };

    // Restore a task from the trash
    const handleRestoreTask = (taskId) => {
        const taskToRestore = trashTasks.find(task => task.id === taskId);
        if (!taskToRestore) return;

        const { originalList, ...restoredTask } = taskToRestore; // Destructure to remove originalList

        setTrashTasks(prevTrash => prevTrash.filter(task => task.id !== taskId));

        if (originalList === 'important') {
            setImportantTasks(prevImportant => [...prevImportant, restoredTask]);
        } else { // Default to restoring to 'tasks' list (covers 'tasks' and 'completed')
            setTasks(prevTasks => [...prevTasks, restoredTask]);
        }
    };

    // Edit a task in a specific list
    const handleEditTask = (taskId, listType) => {
        const newText = prompt("Enter the new task text:");
        if (newText === null || newText.trim() === "") return; // Handle cancel or empty input

        const updateList = (setter) => {
            setter(prevList => prevList.map(task =>
                task.id === taskId ? { ...task, text: newText.trim() } : task
            ));
        };

        if (listType === 'tasks') updateList(setTasks);
        else if (listType === 'important') updateList(setImportantTasks);
        // Add 'completed' if editing completed tasks is needed
    };

    // Move a task to the 'completed' list
    const handleCompleteTask = (taskId, listType) => {
        let taskToMove = null;
        if (listType === 'tasks') taskToMove = tasks.find(task => task.id === taskId);
        else if (listType === 'important') taskToMove = importantTasks.find(task => task.id === taskId);

        if (taskToMove) {
            if (listType === 'tasks') setTasks(prev => prev.filter(task => task.id !== taskId));
            else if (listType === 'important') setImportantTasks(prev => prev.filter(task => task.id !== taskId));
            setCompletedTasks(prev => [...prev, { ...taskToMove }]);
        }
    };

    // Placeholder for actions not yet implemented or needed for default route
    const handleNoOp = () => {}; // Placeholder function that does nothing

    return (
        // Router is now handled by the AppWrapper
            <div className="flex h-screen overflow-x-hidden"> {/* Added overflow-x-hidden */}
                {/* Sidebar */}
                <div className="w-64 bg-green-100 text-gray-700 p-4 font-sans">
                    {/* Header */}
                    <div className="flex items-center mb-8">
                        {/* List Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-900 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <rect x="3" y="4" width="18" height="16" rx="2" fill="#e0ece3" stroke="#234d20"/>
                            <path d="M7 8h10M7 12h10M7 16h6" stroke="#234d20" strokeWidth={2} strokeLinecap="round"/>
                        </svg>
                        <span className="text-2xl font-bold text-green-900 tracking-wide">TO-DO</span>
                    </div>
                    {/* Navigation Buttons */}
                    <div className="space-y-2">
                        <Link to="/tasks">
                            <button className="flex items-center w-full py-2 px-4 rounded-lg bg-green-200 hover:bg-green-300 transition-colors">
                                {/* Check Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-lg">tasks</span>
                            </button>
                        </Link>
                        <Link to="/important">
                            <button className="flex items-center w-full py-2 px-4 rounded-lg bg-green-200 hover:bg-green-300 transition-colors">
                                {/* Star Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.631c.969 0 1.371 1.24.588 1.81l-5.37 3.905a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.37-3.905a1 1 0 00-1.176 0l-5.37 3.905c-.784.57-1.838-.197-1.54-1.118l2.036-6.29a1 1 0 00-.364-1.118L2.342 11.717c-.783-.57-.38-1.81.588-1.81h6.631a1 1 0 00.95-.69l2.036-6.29z" />
                                </svg>
                                <span className="text-lg">important</span>
                            </button>
                        </Link>
                        <Link to="/completed">
                            <button className="flex items-center w-full py-2 px-4 rounded-lg bg-green-200 hover:bg-green-300 transition-colors">
                                {/* Check Mark Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-lg">completed</span>
                            </button>
                        </Link>
                        <Link to="/trash">
                            <button className="flex items-center w-full py-2 px-4 rounded-lg bg-green-200 hover:bg-green-300 transition-colors">
                                {/* Trash Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
                                </svg>
                                <span className="text-lg">trash</span>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col p-4"> {/* Added flex flex-col and padding */}
                    {/* Moved Add Task Box Here */}
                    <div className="addtask mb-4"> {/* Added margin-bottom */}
                        {/* Removed relative positioning from inner container */}
                        <div className="flex items-center justify-between box-border h-36 w-[48vw] bg-[#C4DCD3] border-2 rounded-lg p-4"> {/* Adjusted flex, added padding */}
                            <p className="addnewp text-lg lg:text-4xl font-bold"> {/* Removed relative positioning */}
                                Add your tasks using the button.
                            </p>
                            <AddTaskButton onAddTask={handleAddTask} /> {/* Button stays */}
                        </div>
                    </div>
                    <Routes>
                        {/* Pass tasks state AND the delete handler */}
                        <Route
                            path="/tasks"
                            element={<Tasks
                                tasks={tasks}
                                onDeleteTask={handleDeleteTask}
                                onEditTask={(taskId) => handleEditTask(taskId, 'tasks')} // Pass edit handler
                                onCompleteTask={(taskId) => handleCompleteTask(taskId, 'tasks')} // Pass complete handler
                            />}
                        />
                        <Route
                            path="/important"
                            element={<Important
                                tasks={importantTasks} // Pass importantTasks state
                                onDeleteTask={handleRemoveImportant} // Pass specific handler
                                onEditTask={(taskId) => handleEditTask(taskId, 'important')}
                                onCompleteTask={(taskId) => handleCompleteTask(taskId, 'important')}
                            />}
                        />
                        <Route
                            path="/completed"
                            element={<Completed
                                tasks={completedTasks} // Pass completedTasks state
                                onDeleteTask={handleDeleteCompleted} // Pass specific handler
                            />}
                        />
                        <Route
                            path="/trash"
                            element={<Trash
                                tasks={trashTasks} // Pass the actual trashTasks
                                onDeleteTask={handlePermanentlyDeleteTask} // Pass the handler for permanent deletion
                                onRestoreTask={handleRestoreTask} // Pass the restore handler
                            />}
                        />
                        {/* Default route shows tasks */}
                        <Route path="*" element={<Tasks
                                tasks={tasks}
                                onDeleteTask={handleDeleteTask}
                                onEditTask={(taskId) => handleEditTask(taskId, 'tasks')} // Pass edit handler
                                onCompleteTask={(taskId) => handleCompleteTask(taskId, 'tasks')} // Pass complete handler
                            />}
                        /> {/* Default to showing tasks */}
                    </Routes>
                </div>
            </div>
    );
}

// Wrapper component to provide Router context for useLocation hook
function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper; // Export the wrapper as the default