/**
 * Readonly<Type>
 * Released: 2.1
 *
 * Constructs a type with all properties of Type set to readonly,
 * meaning the properties of the constructed type cannot be reassigned.
 */

const readonlyArrayExample: ReadonlyArray<number> = [1, 2, 3];

// readonlyArrayExample[0] = 0; // Index signature in type 'readonly number[]' only permits reading

const readOnlyNumber: Readonly<number> = 0;