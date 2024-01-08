'use client'

import React, { useState } from "react"
import { TodoObject } from "./models/Todo";
import { v4 as uuidv4 } from 'uuid';

const Home: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [all, setAll] = useState<TodoObject[]>([]);

  const addAll = () => {
    console.log('entrou')
    setAll([{ id: uuidv4(), value: todo, done: false }, ...all]);
    setTodo("");
  }

  const makeAllDone = (id: string) => {
    setAll(all.map(todo => todo.id === id ? { ...todo, done: true } : todo));
  }

  const removeTodo = (id: string) => {
    setAll(all.filter(todo => todo.id !== id));
  }

  return (
    <>
      <header className="bg-slate-950 p-2 mx-64">
        <div className="flex flex-col items-center justify-center">
          <h1 className="my-2 text-3xl">Welcome to our website!</h1>
        </div>
      </header>
      <main className="p-4 flex flex-col items-center justify-center">
        <div className="flex">
          <input
            type="text"
            placeholder="Enter a new todo"
            className="flex p-2 rounded mr-5 text-slate-900 border-2"
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            value={todo}
          />

          <button
            className="bg-green-900 border-2 p-2 rounded"
            onClick={() => addAll()}>Add</button>
        </div>
        <ul className="mt-5 w-full max-w-md">
          {all.map((todo) => (
            <li
              key={todo.id}
              className={`bg-white p-4 my-2 rounded border border-gray-300 flex items-center justify-between ${todo.done ? 'line-through text-gray-500' : 'text-gray-700'
                }`}
            >
              <span onClick={() => makeAllDone(todo.id)} className="cursor-pointer">
                {todo.value}
              </span>

              <button
                className="text-red-500"
                onClick={() => removeTodo(todo.id)}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default Home;
