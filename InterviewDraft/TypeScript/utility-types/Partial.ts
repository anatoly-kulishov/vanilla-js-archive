/**
 * Partial<Type>
 * Released: 2.1
 *
 * Constructs a type with all properties of Type set to optional.
 * This utility will return a type that represents all subsets of a given type.
 */

interface Todo {
	title: string;
	description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
	return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
	title: "organize desk",
	description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
	description: "throw out trash",
});