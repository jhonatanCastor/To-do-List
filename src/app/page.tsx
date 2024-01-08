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
        <ul className="mt-5">
          {
            all.map(todo => (
              <li
                onClick={() => makeAllDone(todo.id)}
                className={`bg-slate-800 p-2 my-2 text-3xl rounded ml-5 cursor-pointer ${todo.done ? 'line-through' : 'no-underline'}`}

              >
                {todo.value}
              </li>
            ))
          }
        </ul>
      </main>
    </>
  )
}

export default Home;
