// import { useEffect, useState } from "react";
//
//
// interface ITodo {
//     userId: number;
//     id: number;
//     title: string;
//     completed: boolean;
// }
//
//
// interface IGroupedTodo {
//     userId: number;
//     todos: ITodo[];
// }
//
//
// const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
//
//
// const fetchTodoList = async (): Promise<ITodo[]> => {
//     const res = await fetch(TODOS_URL);
//     if (res.ok) {
//         return await res.json();
//     } else {
//         console.error("HTTP Error: " + res.status);
//         return [];
//     }
// };
//
//
// function App() {
//     const [todos, setTodos] = useState<ITodo[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isGrouped, setIsGrouped] = useState(false);
//     const [isFiltered, setIsFiltered] = useState(false);
//
//
//     // Fetch TODOs on component mount
//     useEffect(() => {
//         const loadTodos = async () => {
//             setIsLoading(true);
//             const todoList = await fetchTodoList();
//             setTodos(todoList.sort((a, b) => b.userId - a.userId));
//             setIsLoading(false);
//         };
//         loadTodos();
//     }, []);
//
//
//     // Filter and group TODOs based on user actions
//     const getFilteredTodos = (): ITodo[] => {
//         return isFiltered ? todos.filter((todo) => !todo.completed) : todos;
//     };
//
//
//     const getGroupedTodos = (): IGroupedTodo[] => {
//         // Получаем отфильтрованные данные
//         const filteredTodos = getFilteredTodos();
//
//
//         // Группируем с помощью явного цикла
//         const grouped: Record<number, ITodo[]> = {};
//         for (const todo of filteredTodos) {
//             if (!grouped[todo.userId]) {
//                 grouped[todo.userId] = [];
//             }
//             grouped[todo.userId].push(todo);
//         }
//
//
//         // Преобразуем объект в массив групп
//         return Object.entries(grouped).map(([userId, todos]) => ({
//             userId: Number(userId), // Ключи преобразуем в число
//             todos, // Массив задач в группе
//         }));
//     };
//
//
//     const filteredTodos = getFilteredTodos();
//     const groupedTodos = isGrouped ? getGroupedTodos() : [];
//
//
//     return (
//         <div>
//             {isLoading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>
//                     <h1>Total TODOs: {filteredTodos.length}</h1>
//                     <div>
//                         <button onClick={() => setIsFiltered((prev) => !prev)}>
//                             {isFiltered ? "Show All" : "Filter Incomplete"}
//                         </button>
//                         <button onClick={() => setIsGrouped((prev) => !prev)}>
//                             {isGrouped ? "Ungroup" : "Group by User"}
//                         </button>
//                     </div>
//                     <ul>
//                         {!isGrouped
//                             ? filteredTodos.map((todo) => (
//                                 <li key={todo.id}>
//                                     <b>User {todo.userId}</b> - {todo.title}{" "}
//                                     <mark>{todo.completed ? "✔" : "❌"}</mark>
//                                 </li>
//                             ))
//                             : groupedTodos.map((group) => (
//                                 <div key={group.userId}>
//                                     <h2>User {group.userId}</h2>
//                                     <ul>
//                                         {group.todos.map((todo) => (
//                                             <li key={todo.id}>
//                                                 {todo.title}{" "}
//                                                 <mark>{todo.completed ? "✔" : "❌"}</mark>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             ))}
//                     </ul>
//                 </>
//             )}
//         </div>
//     );
// }
//
//
// export default App;
//
