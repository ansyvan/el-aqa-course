export function mergeObjects (...objects) {
  return Object.assign({}, ...objects)
}

export async function getUserInfo (id) {
  const user = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  const userJSON = await user.json()
  return userJSON
}
