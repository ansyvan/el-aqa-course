// eslint-disable-next-line no-extend-native
Array.prototype.maraudersMap = function (fn) {
  const mapped = []

  for (let i = 0; i < this.length; i++) {
    mapped.push(fn(this[i], i, this))
  }
  return mapped
}

function defineNicknames () {
  return console.log(namesAndNicknames)
}

function findMarauders () {
  return console.log(marauderLocation)
}

const names = ['James', 'Sirius', 'Remus', 'Peter']
const nicknames = ['Prongs', 'Padfoot', 'Moony', 'Wormtail']
const mapPlaces = [
  'Hogwarts Castle',
  'Shrieking Shack',
  'Forbidden Forest',
  'Hogsmeade Village'
]
const namesAndNicknames = names.maraudersMap(function (name, index) {
  return `${name} ${nicknames[index]}`
})
const marauderLocation = nicknames.maraudersMap(function (nickname, index) {
  return `The location of ${nickname} is ${mapPlaces[index]}`
})

defineNicknames()
findMarauders()
