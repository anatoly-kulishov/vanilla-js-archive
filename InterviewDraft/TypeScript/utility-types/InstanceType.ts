/**
 * InstanceType<Type>
 * Released: 2.8
 *
 * Constructs a type consisting of the instance type of a constructor function in Type.
 */

class C {
	x = 0;
	y = 0;
}

type T0 = InstanceType<typeof C>;

const obj_c: T0 = {
	x: 0,
	y: 0
}