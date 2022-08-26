import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect} from 'react';

export default function Home() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const todoList = localStorage.getItem("todoList");
    if (todoList) {
      setTodoList(JSON.parse(todoList));
    }
  }, []);

  const addTodo = (todoTitle) => {
    const newTodo = {
      id: uuidv4(),
      title: todoTitle,
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
    setTodoTitle("");
  };

  const deleteTodo = (todoID) => {
    const newTodoList = todoList.filter((todoItem) => todoItem.id !== todoID);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
    setTodoList(newTodoList);
  };
  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="Todo App" content="Made by Tomo!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <h2 class="text-gray-800 font-bold" >TODO LIST</h2>
        <div>
            <form class="m-4 flex">
              <input class="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" placeholder="Todo List" value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)}/>
            <button type="button" class="px-8 rounded-r-lg bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r" onClick={() => {addTodo(todoTitle);}}>Add</button>
          </form>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ">
  <a href={`/pokemon`}>ポケモン</a>
 
</button>
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full">
                  <thead class="border-b">
                    <tr>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        #
                      </th>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Title
                      </th>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Detail
                      </th>
                      <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Detele
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {todoList.map((todoItem,index) => (
                      <tr class="border-b" key={index}>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {todoItem.title}
                        </td>

                        <td><div class='flex items-center justify-center '>
                            <div class="m-5">
                              <a
                              className="todo_item_title"
                              href={`/todo/${todoItem.id}`}
                            >
                                  <button class="flex p-2.5 bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300 text-white">
                                    <img src="https://www.svgrepo.com/show/55405/pencil.svg" class="h-6 w-6"></img>
                                  </button>
                              </a>
                            </div>
                        </div></td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <div class='flex items-center justify-center '>
                            <div class="m-5">
                                <button onClick={() => {deleteTodo(todoItem.id);}} class="flex p-2.5 bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white">
                                <img src="https://freesvg.org/img/trash.png" class="h-6 w-6"></img>
                                </button>
                            </div>
                        </div>
                        </td>
                      </tr>))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
