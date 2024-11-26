// import { useEffect, useState } from 'react';
//
// // https://jsonplaceholder.typicode.com/todos
//
// interface ITodo {
//     userId: number;
//     id: number;
//     title: string;
//     completed: boolean;
// }
//
// const fetchTodoList = async (): any => {
//     const res = await fetch('https://jsonplaceholder.typicode.com/todos');
//     if (res.ok) {
//         return await res.json();
//     } else {
//         alert('Ошибка HTTP: ' + res.status);
//     }
//     return [];
// };
//
// function App() {
//     const [list, setList] = useState<ITodo[]>([]);
//     const [groupList, setGroupList] = useState<any[]>([]);
//
//     const [isGroup, setIsGroup] = useState(false);
//     const [isFiltered, setIsFiltered] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//
//     const handleSetTodoList = async () => {
//         const todoList = await fetchTodoList();
//         setList(todoList.sort((a, b) => b['userId'] - a['userId']));
//         setIsLoading(false);
//     };
//
//     const handleSetFiltredList = () => {
//         if (isFiltered && !isGroup) {
//             let data = list.filter((el) => !el.completed);
//             setList(data || []);
//         }
//
//         if (!isFiltered && !isGroup) {
//             handleSetTodoList();
//         }
//
//         if (isGroup && isFiltered) {
//             let data = groupList.map((group) => {
//                 const res = [group[0], group[1].filter((el: any) => !el.completed)];
//                 return res;
//             });
//             setGroupList(data);
//         }
//
//         if (!isFiltered && isGroup) {
//             handleSetGroupList(true);
//         }
//
//         setIsFiltered(!isFiltered);
//     };
//
//     const handleSetGroupList = (flag: boolean) => {
//         if (flag) {
//             const groupMap = new Map();
//
//             for (let i = 0; i < list.length; i++) {
//                 const curr = list[i];
//
//                 if (!groupMap.has(curr.userId)) {
//                     groupMap.set(curr.userId, [curr]);
//                 } else {
//                     groupMap.get(curr.userId).push(curr);
//                 }
//             }
//
//             setGroupList(Array.from(groupMap));
//             setIsGroup(true);
//         } else {
//             setIsGroup(false);
//         }
//     };
//
//     useEffect(() => {
//         handleSetTodoList();
//     }, []);
//
//     return (
//         <div>
//             <h1>{list.length}</h1>
//             <button onClick={handleSetFiltredList}>Filter</button>
//             <button onClick={() => handleSetGroupList(!isGroup)}>Group</button>
//             <ul>
//                 {isLoading && <div>loading...</div>}
//                 {!isLoading &&
//                     !isGroup &&
//                     list.map((el) => (
//                         <li key={el.id}>
//                             <span>{el.userId}</span>
//                             {el.title}
//                             <mark>{el.completed ? '+' : '-'}</mark>
//                         </li>
//                     ))}
//                 {isGroup &&
//                     groupList.map((group) => (
//                         <div>
//                             <h2>{group[0]}</h2>
//                             {group[1].map((el: any) => (
//                                 <li key={el.id}>
//                                     <span>{el.userId}</span>
//                                     {el.title}
//                                     <mark>{el.completed ? '+' : '-'}</mark>
//                                 </li>
//                             ))}
//                         </div>
//                     ))}
//             </ul>
//         </div>
//     );
// }
//
// export default App;
