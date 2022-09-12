/**
 * Omit<Type, Keys>
 * Released: 3.5
 *
 * Constructs a type by picking all properties from Type and then removing Keys
 * (string literal or union of string literals).
 */

interface Todo {
	title: string;
	description: string;
	completed: boolean;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
	title: "Clean room",
	completed: false,
};

console.log(todo); // {title: "Clean room", completed: false}