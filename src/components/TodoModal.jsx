// TodoModal.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../Redux/Slice/todoSlice";

const TodoModal = ({ isOpen, onClose }) => {
    // States
    const [text, setText] = useState("");
    const [expectedEndTime, setExpectedEndTime] = useState("");
    const [status, setStatus] = useState("Started");
    const [note, setNote] = useState("");
    const dispatch = useDispatch();
    // Functions
    const handleInputChange = (e) => setText(e.target.value)
    const handleExpectedEndTimeChange = (e) => setExpectedEndTime(e.target.value);
    const handleStatusChange = (e) => setStatus(e.target.value);
    const handleNoteChange = (e) => setNote(e.target.value)
    const handleAddTodo = () => {
        if (text.trim() && expectedEndTime.trim()) {
            dispatch(addTodo({ text, expectedEndTime, status, note }));
            setText("");
            setExpectedEndTime("");
            setStatus("Started");
            setNote("");
            onClose();
        }
    };

    return (
        <div className={`modal fixed ${isOpen ? "block" : "hidden"} inset-0 z-50 overflow-auto bg-black/20 backdrop-blur-md`}>
            <div className="modal-content gap-2 bg-white w-[90%] sm:w-[400px] mx-auto mt-32 p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg tracking-wide text-black">Add New Todo</h2>
                    <button onClick={onClose} className="text-black hover:text-red outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col gap-6">
                    <input
                        type="text"
                        value={text}
                        onChange={handleInputChange}
                        placeholder="Add a new todo..."
                        className="w-full px-4 py-2 border border-black/40 rounded-md focus:outline-none focus:border-red/60"
                    />
                    <textarea
                        value={note}
                        onChange={handleNoteChange}
                        placeholder="Add a note..."
                        className="w-full px-4 py-2 border border-black/40 rounded-md focus:outline-none focus:border-red/60 h-20 resize-none" // Set height and prevent resize
                    />
                    <div className="flex gap-4 justify-between items-center">
                        <div
                            className={`p-1 rounded-md text-white ${status === "Completed"
                                ? "bg-green-500"
                                : status === "Ongoing"
                                    ? "bg-yellow-400"
                                    : "bg-blue-500"
                                }`}
                        >
                            <select
                                onChange={handleStatusChange}
                                value={status}
                                className={`focus:outline-none text-sm bg-transparent `}
                            >
                                <option className="text-black" value="Started">
                                    Started
                                </option>
                                <option className="text-black" value="Ongoing">
                                    Ongoing
                                </option>
                                <option className="text-black" value="Completed">
                                    Completed
                                </option>
                            </select>
                        </div>
                        <input
                            type="date"
                            value={expectedEndTime}
                            onChange={handleExpectedEndTimeChange}
                            className="px-4 py-2 border w-full border-black/40 rounded-md focus:outline-none focus:border-red/60"
                        />
                    </div>
                    <button
                        onClick={handleAddTodo}
                        className="block px-4 py-2 bg-purple text-white rounded-md hover:bg-purple/80 ml-auto focus:outline-none"
                    >
                        Add Todo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoModal;
