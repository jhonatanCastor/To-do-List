'use client'

import React, { useState } from "react";
import { TodoObject } from "./models/Todo";
import { v4 as uuidv4 } from 'uuid';

const Home: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [all, setAll] = useState<TodoObject[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState<string>('');

  const addAll = () => {
    setAll([{ id: uuidv4(), value: todo, done: false }, ...all]);
    setTodo("");
  }

  const makeAllDone = (id: string) => {
    setAll(all.map(todo => todo.id === id ? { ...todo, done: true } : todo));
  }

  const removeTodo = (id: string) => {
    setAll(all.filter(todo => todo.id !== id));
  }

  const startEditingTask = (id: string, value: string) => {
    setEditingTaskId(id);
    setEditedTask(value);
  }

  const updateTask = (id: string) => {
    setAll(all.map(todo => todo.id === id ? { ...todo, value: editedTask } : todo));
    setEditingTaskId(null);
  }

  return (
    <>
      <body className=" bg-black p-20">
        <div className="bg-slate-400 mx-64 mt-10 rounded">
          <header className="bg-slate-950 rounded-t border-b-2 border-indigo-500">
            <div className="flex flex-col items-center justify-center">
              <h1 className="my-2 text-3xl text-white">{`These are your tasks for today: ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}`}</h1>
            </div>
            <div className="flex justify-center mt-2 p-4 ">
              <input
                type="text"
                placeholder="Enter a new todo"
                className="flex p-2 rounded mr-5 text-slate-900 border-2 w-96 h-12"
                onChange={(e) => {
                  setTodo(e.target.value);
                }}
                value={todo}
              />
              <button
                className="bg-green-900 border-2 p-2 rounded w-24 font-bold text-white"
                onClick={() => addAll()}
              >
                Add
              </button>
            </div>
          </header>
          <main className="p-4 flex flex-col items-center justify-center max-h-96 overflow-y-auto w-full">
            <ul className="mt-5 w-full max-w-md">
              {all.map((todo) => (
                <li
                  key={todo.id}
                  className={`bg-white p-4 my-2 rounded border border-gray-300 flex items-center justify-between ${todo.done ? 'line-through text-gray-500' : 'text-gray-700'
                    }`}
                >
                  {editingTaskId === todo.id ? (
                    <input
                      type="text"
                      value={editedTask}
                      onChange={(e) => setEditedTask(e.target.value)}
                    />
                  ) : (
                    <span
                      onClick={() => makeAllDone(todo.id)}
                      className="cursor-pointer"
                    >
                      {todo.value}
                    </span>
                  )}

                  <div>
                    {editingTaskId === todo.id ? (
                      <button
                        className="text-green-500"
                        onClick={() => updateTask(todo.id)}
                      >
                        ✔️
                      </button>
                    ) : (
                      <button
                        className="text-blue-500"
                        onClick={() => startEditingTask(todo.id, todo.value)}
                      >
                        ✏️
                      </button>
                    )}

                    <button
                      className="text-red-500 ml-2"
                      onClick={() => removeTodo(todo.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </main>
        </div>
      </body>
    </>
  );
}

export default Home;
