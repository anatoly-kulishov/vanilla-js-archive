/**
 * Pick<Type, Keys>
 * Released: 2.1
 *
 * Constructs a type by picking the set of properties Keys
 * (string literal or union of string literals) from Type.
 */

interface Todo {
	title: string;
	description: string;
	completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
	title: "Clean room",
	completed: false,
};

console.log(todo); // {title: "Clean room", completed: false}