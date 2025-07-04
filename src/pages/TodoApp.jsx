import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";

const TodoApp = () => {
  const db = getDatabase();
  let [task, setTask] = useState("");
  let [taskEditValue, setTaskEditValue] = useState("");
  let [taskError, setTaskerror] = useState("");
  let [taskEditError, setTaskEditError] = useState("");
  let [taskEditId, setTaskEditId] = useState("");
  let [taskList, setTaskList] = useState([]);
  let [taskEditModal, setTaskEditModal] = useState(false);

  let handleChange = (e) => {
    setTask(e.target.value);
    setTaskerror("");
  };

  let handleAdd = () => {
    if (task == "") {
      setTaskerror("Task Can not be empty!");
    } else {
      set(push(ref(db, "todolist/")), {
        name: task,
      })
        .then(() => {
          setTask("");
        })
        .catch(() => {
          alert("Failed");
        });
    }
  };

  let handleDelete = (id) => {
    remove(ref(db, "todolist/" + id));
  };

  let handleEditChange = (e) => {
    setTaskEditValue(e.target.value);
  };

  let handleEdit = (item) => {
    setTaskEditId(item.id);
    setTaskEditModal(true);
    setTaskEditValue(item.name);
  };

  let handleUpdate = () => {
    setTaskEditModal(false);
    update(ref(db, "todolist/" + taskEditId), {
      name: taskEditValue,
    });
  };

  useEffect(() => {
    const todoRef = ref(db, "todolist/");
    onValue(todoRef, (snapshot) => {
      let todolistArray = [];
      snapshot.forEach((item) => {
        todolistArray.push({ ...item.val(), id: item.key });
      });
      setTaskList(todolistArray);
    });
  }, []);

  return (
    <>
      {/* <div className="flex items-center justify-center mt-4">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            To-Do List
          </h2>

          <div className="flex mb-2">
            <input
              value={task}
              onChange={handleChange}
              type="text"
              placeholder="Enter a task..."
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
          <span className="text-red-600">{taskError}</span>

          <ul className="space-y-2 mt-4">
            {taskList.map((item, index) => (
              <li className="flex justify-between items-center bg-gray-200 p-2 rounded">
                <span>
                  {index + 1}. {item.name}
                </span>
                <div>
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-white bg-gray-600 text-sm p-2 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-white bg-red-700 text-sm p-2"
                  >
                    &times;
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {taskEditModal && (
        <div className="flex justify-center mx-auto w-md bg-white p-4 mt-4 shadow-lg rounded-xl">
          <input
            value={taskEditValue}
            onChange={handleEditChange}
            type="text"
            placeholder="Enter a task..."
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
          >
            Update
          </button>
          <br />
          <button
            onClick={() => setTaskEditModal(false)}
            className="bg-red-500 text-white px-4 py-2 rounded-r-md"
          >
            Close
          </button>
        </div>
      )} */}

      <div className="flex items-center justify-center px-4 mt-4 overflow-x-hidden">
        <div className="bg-white w-full max-w-lg p-4 sm:p-6 rounded-xl shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-800">
            To-Do List
          </h2>

          <div className="flex flex-col sm:flex-row gap-2 mb-2">
            <input
              value={task}
              onChange={handleChange}
              type="text"
              placeholder="Enter a task..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
          <span className="text-red-600 text-sm">{taskError}</span>

          <ul className="space-y-2 mt-4">
            {taskList.map((item, index) => (
              <li
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 p-2 rounded"
              >
                <span className="text-sm sm:text-base break-words w-full sm:w-auto">
                  {index + 1}. {item.name}
                </span>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-gray-600 text-white text-xs sm:text-sm px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-700 text-white text-xs sm:text-sm px-3 py-1 rounded"
                  >
                    &times;
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {taskEditModal && (
        <div className="flex flex-col sm:flex-row justify-center items-center px-4 mx-auto w-full max-w-lg bg-white p-4 mt-4 shadow-lg rounded-xl gap-2 overflow-x-hidden">
          <input
            value={taskEditValue}
            onChange={handleEditChange}
            type="text"
            placeholder="Edit task..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          />
          <div className="flex gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Update
            </button>
            <button
              onClick={() => setTaskEditModal(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoApp;
