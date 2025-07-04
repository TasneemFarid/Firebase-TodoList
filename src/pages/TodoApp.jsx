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
      <div className="flex items-center justify-center mt-4">
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
      )}
    </>
  );
};

export default TodoApp;
