export function updateObjectInArray<T extends { id: number }> (
  array: T[],
  key: number,
  newKeyValue: Partial<T>
): T[] {
  const mappedArray = array.map((item) => {
    if (item.id === key) {
      return { ...item, ...newKeyValue }
    } else {
      return item
    }
  })
  return mappedArray
}
