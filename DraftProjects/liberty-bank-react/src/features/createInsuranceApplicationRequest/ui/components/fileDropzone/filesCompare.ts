export default function filesCompare(f1: File, f2: File) {
  const name = f1.name === f2.name;
  const size = f1.size === f2.size;
  return name && size;
}
