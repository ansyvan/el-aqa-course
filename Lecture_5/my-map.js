function selectRandom (array) {
  return array[Math.floor(Math.random() * array.length)]
}

function createUsersDoingTasks (names) {
  return names.map(name => ({
    firstName: name,
    lastName: selectRandom(surnames),
    task: selectRandom(tasks)
  }))
}

function printUsersWorkingHard () {
  const users = createUsersDoingTasks(names)
  const usersActivities = users.map((user) => (
    `${user.firstName} ${user.lastName} is ${user.task}`
  ))
  console.log(usersActivities)
}

const names = [
  'Adam', 'Alex', 'Monte', 'Aaron', 'Ben',
  'Carl', 'Dan', 'Tim', 'David', 'Edward',
  'Fred', 'Frank', 'George', 'Hal', 'Ike',
  'John', 'Alex', 'Jack', 'Joe', 'Larry',
  'Monte', 'Matthew', 'Mark', 'Nathan', 'Otto',
  'Peter', 'Roger', 'Steve', 'Ben', 'Thomas',
  'Tim', 'Ty', 'Victor', 'Walter'
]

const surnames = [
  'Snickerdoodle', 'Bubblebottom', 'Wobblekins',
  'Fluffernutter', 'Gigglepants', 'Picklesworth',
  'Noodleman', 'Sillywhiskers', 'Puddleduck',
  'Bumblefluff', 'Jellybean', 'Wafflesnatch',
  'Dingleberry', 'Snugglebum', 'Fizzlebop',
  'Poppycock', 'Toodleface', 'Crumpetson',
  'Fuzzlebutt', 'Tickletush'
]

const tasks = [
  'sorting socks by emotional trauma',
  'trying to convince a toaster to love again',
  'training a goldfish to moonwalk',
  'organizing a protest against Mondays',
  'alphabetizing a collection of empty shampoo bottles',
  'holding a meeting with houseplants',
  'investigating who ate their invisible sandwich',
  'writing a memoir of past lives as a cat',
  'knitting a scarf for summer',
  'conducting a scientific study on why socks disappear',
  'auditioning for a silent disco solo',
  'trying to teach spaghetti to stand up straight',
  'organizing thoughts into color-coded chaos',
  'taste-testing air for quality control',
  'painting their shadow a different color',
  'searching for the meaning of life in cereal boxes',
  'training pigeons for synchronized flying',
  'translating baby talk into Shakespearean English',
  'crafting a throne from used pizza boxes',
  'trying to win an argument with their echo'
]

printUsersWorkingHard()
