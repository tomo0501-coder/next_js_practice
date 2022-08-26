import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoDetail = () => {
  const router = useRouter();
  const query = router.query;
  const id = query.id;

  const [todoItemTitle, setTodoItemTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const notify = () => toast("Done!");

  useEffect(() => {
    if (router.isReady) {
      // get todo detail by id
      const todoListStr = localStorage.getItem("todoList");
      if (todoListStr) {
        const todoList = JSON.parse(todoListStr);
        const todoItem = todoList.find((todo) => todo.id === id);
        setTodoItemTitle(todoItem.title);
      }
    }
  }, [query, router]);

  const wait = (milisec) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, milisec);
    });
  };

  const editTodo = async (todoTitle) => {
    setIsLoading(true);
    await wait(500);
    const todoList = JSON.parse(localStorage.getItem("todoList"));
    const newTodoList = todoList.map((todoItem) => {
      if (todoItem.id === id) {
        todoItem.title = todoTitle;
      }
      return todoItem;
    });
    setTodoItemTitle(todoTitle);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
    setIsLoading(false);
    notify();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>TODOアプリ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/ye-connect.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h1>Todo詳細ページ</h1>
          <p>Todoのタイトル:「{todoItemTitle}」を編集します</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <input
                className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                autoFocus={true}
                placeholder="Todo List"
                value={todoItemTitle}
                onChange={(e) => setTodoItemTitle(e.target.value)}
              ></input>
            </div>

            <div className="todo_item_button">
              {isLoading ? (
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
                  Editing...
                </button>
              ) : (
                <button
                  onClick={() => {
                    editTodo(todoItemTitle);
                  }}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                
              )}
            </div>
          </div>

          {/** Link to index page */}
          <div>
            <Link href="/">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
  <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
  <span>Back</span>
</button>
            </Link>
          </div>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </main>
    </div>
  );
};

export default TodoDetail;