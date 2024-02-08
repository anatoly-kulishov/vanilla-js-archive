/**
 * NonNullable<Type>
 * Released: 2.8
 *
 * Constructs a type by excluding null and undefined from Type.
 */

type NonNullableType = NonNullable<string | number>;

const NonNullableGoodExample: NonNullableType = "123" || 0;
const NonNullableBadExample: NonNullableType = null; // Error: Type 'null' is not assignable to type 'NonNullableType'