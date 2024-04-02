// Todo.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStatus, deleteTodo } from "../Redux/Slice/todoSlice";
import TodoModal from "../components/TodoModal.jsx";

const Todo = () => {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  // Functions
  const handleUpdateStatus = (id, status) => dispatch(updateStatus({ id, status }))
  const handleDeleteTodo = (id) => dispatch(deleteTodo(id));
  const handleToggleTodoDetails = (todo) => setSelectedTodo((prevTodo) => (prevTodo && prevTodo.id === todo.id ? null : todo))

  return (
    <div className="max-w-lg max-sm:mx-4 mx-auto mt-8">
      {todos?.length !== 0 ? (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="block px-4 py-2 bg-purple text-white rounded-md hover:bg-purple/80 focus:outline-none"
          >
            Add New Todo
          </button>
          <TodoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <ul className="mt-4">
            {todos.map((todo) => (

              <li
                key={todo.id}
                className={`flex flex-col py-3 border-b border-grey`}
              >
                <div className="flex items-center justify-between">
                  <span className={`cursor-pointer w-full ${todo.status === "Completed" ? "text-gray-400 line-through" : ""}`} onClick={() => handleToggleTodoDetails(todo)} >
                    {todo.text}
                  </span>
                  <div className="flex">
                    <div
                      className={`p-1 rounded-md text-white ${todo.status === "Completed"
                        ? "bg-green-500"
                        : todo.status === "Ongoing"
                          ? "bg-yellow-400"
                          : "bg-blue-500"
                        }`}
                    >
                      <select
                        value={todo.status}
                        onChange={(e) => handleUpdateStatus(todo.id, e.target.value)}
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
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="ml-2 hover:bg-red focus:outline-none p-1 rounded-md text-white bg-red/80 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {selectedTodo && selectedTodo.id === todo.id && (
                  <div className="mt-2 p-4 bg-grey/40 shadow-md rounded-md">
                    <p>Status: {todo.status}</p>
                    <p>End Time: {todo.expectedEndTime.split('-').reverse().join('/')}</p>
                    <p className="font-semibold underline underline-offset-4">Note </p>
                    <div className="w-full overflow-auto bg-white p-2 m-1 ml-0 rounded-md">

                      {todo.note}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4 items-center">
            <p className="font-gelasio text-xl md:text-2xl">Welcome , Create your Todos for the day here</p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="block px-4 py-2 bg-purple max-md:text-sm text-white rounded-md hover:bg-purple/80 focus:outline-none"
            >
              Add Your First Todo
            </button>
            <TodoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
};

export default Todo;
