/**
 * Required<Type>
 * Released: 2.8
 *
 * Constructs a type consisting of all properties of Type set to required. The opposite of Partial.
 */

interface Todo {
	title?: string;
	description?: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Required<Todo>) {
	return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
	title: "organize desk",
	description: "clear clutter",
};

/** Logs: argument of type '{ description: string; } is not assignable to parameter of type 'Required */
// const todo2 = updateTodo(todo1, {
// 	description: "throw out trash",
// });