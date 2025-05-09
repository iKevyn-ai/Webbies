import React, { useState } from "react";

// Accept onAddTask function as a prop
function AddTaskButton({ onAddTask }) {
  const [isAdding, setIsAdding] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [taskDetails, setTaskDetails] = useState(""); // State for task details

  const handleShowInputForm = () => {
    setIsAdding(true);
  };

  const handleConfirmAddTask = () => {
    const trimmedText = taskText.trim();
    const trimmedDetails = taskDetails.trim(); // Trim details as well

    if (trimmedText !== "") {
      const newTaskData = { text: trimmedText };
      if (trimmedDetails !== "") {
        newTaskData.details = trimmedDetails;
      }
      // Defensive check: Ensure onAddTask is a function before calling it
      if (typeof onAddTask === 'function') {
        onAddTask(newTaskData); // Pass an object with text and details
      } else {
        console.error("AddTaskButton: onAddTask prop is not a function or is missing. Task data:", newTaskData);
      }
      setTaskText(""); // Clear input after adding
      setTaskDetails(""); // Clear details input
      setIsAdding(false); // Hide the form
    }
  };

  const handleCancelAddTask = () => {
    setTaskText(""); // Clear input
    setTaskDetails(""); // Clear details input
    setIsAdding(false); // Hide the form
  };

  const handleInputChange = (e) => {
    setTaskText(e.target.value);
  };

  const handleDetailsChange = (e) => {
    setTaskDetails(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleConfirmAddTask();
    }
  };

  if (!isAdding) {
    return (
      // Original button to trigger the form
      // The comment "// Increased right value to move button further left" is from your original code
      <button onClick={handleShowInputForm} className="addnew lg:text-6xl text-5xl relative lg:right-[10vh] text-white cursor-pointer">
        +
      </button>
    );
  }

  // Render the input form
  return (
    // Adjusted container for vertical layout of inputs and then buttons
    <div className="p-4 bg-white rounded-lg shadow-md relative top-[5vh] max-w-md mx-auto"> {/* Example: Centered form with max width */}
      <div className="space-y-3"> {/* Container for input fields */}
        <input
          type="text"
          value={taskText}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          placeholder="Enter your task title"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus // Automatically focus the input field
        />
        <textarea
          value={taskDetails}
          onChange={handleDetailsChange}
          placeholder="Add details or notes (optional)"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none" // Added resize-none, adjust height as needed
          rows="3"
        />
      </div>
      <div className="flex justify-end space-x-2 mt-4"> {/* Buttons below, aligned to the right */}
        <button
          onClick={handleConfirmAddTask}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
        >
          Add Task
        </button>
        <button
          onClick={handleCancelAddTask}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddTaskButton;