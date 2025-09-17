import { Op } from 'sequelize'
import { Country, User } from '../db/models/assosiations.js'
import sequelize from '../db/connection.js'

export async function createCountry (
  name: string,
  population: number,
  phone: string
) {
  const newCountry = await Country.create({ name, population, phone })
  console.log(`Country created with ID: ${newCountry.id} and name: ${newCountry.name}`)
  return newCountry
}

export async function createUser (
  firstName: string,
  lastName: string | null,
  age: number | null,
  countryId: number | null
) {
  const newUser = await User.create({ firstName, lastName, age, countryId })
  console.log(`User created with ID: ${newUser.id} and name: ${newUser.firstName}`)
  return newUser
}

export async function findAllUsers () {
  const users = await User.findAll()
  return users
}

export async function findAllCountries () {
  const countries = await Country.findAll()
  return countries
}

export async function findAllUsersWithCountries () {
  const users = await User.findAll({
    include: [{ model: Country, as: 'country' }]
  })
  return users
}

export async function findUserById (id: number) {
  const user = await User.findByPk(id, {})
  return user
}

export async function updateCountryByName (
  currentName: string,
  newDetails: { name?: string; population?: number; phone?: string }
) {
  const [affectedRows] = await Country.update(newDetails, {
    where: { name: currentName }
  })
  return affectedRows > 0
}

export async function deleteCountriesByPopulation (maxPopulation: number) {
  const deletedCount = await Country.destroy({
    where: {
      population: {
        [Op.lte]: maxPopulation
      }
    }
  })
  return deletedCount
}

export async function findDistinctCountriesFromUsers () {
  const usersWithCountries = await User.findAll({
    where: {
      countryId: {
        [Op.ne]: null
      }
    },
    group: ['countryId'],
    include: [{
      model: Country,
      as: 'country',
      required: true
    }]
  })
  return usersWithCountries.map(user => user.country)
}

export async function findUsersOlder (minAge: number) {
  const users = await User.findAll({
    where: {
      age: {
        [Op.gt]: minAge,
        [Op.ne]: null
      }
    },
    attributes: ['firstName', 'lastName', 'age']
  })
  return users
}

export async function findUsersBetween (minAge: number, maxAge: number) {
  const users = await User.findAll({
    where: {
      age: {
        [Op.between]: [minAge, maxAge],
        [Op.ne]: null
      }
    },
    attributes: ['firstName', 'lastName', 'age']
  })
  return users
}

export async function findUsersInCountries (countriesIds: number[]) {
  const users = await User.findAll({
    where: {
      countryId: {
        [Op.in]: countriesIds
      }
    },
    include: [{
      model: Country,
      as: 'country',
      required: true
    }],
    attributes: ['firstName', 'lastName', 'age', 'countryId']
  })
  return users.map(user => ({
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    country: user.country ? user.country.name : 'N/A'
  }))
}

export async function orderUsersByAgeAsc () {
  const users = await User.findAll({
    order: [['age', 'ASC']]
  })
  return users
}

export async function orderCountriesByNameDescLimit (limit: number) {
  const countries = await Country.findAll({
    order: [['name', 'DESC']],
    limit
  })
  return countries
}

export async function sumAgeInEachCountry () {
  const users = await User.findAll({
    attributes: [
      'countryId',
      [sequelize.fn('SUM', sequelize.col('age')), 'totalAge']
    ],
    where: {
      age: { [Op.ne]: null }
    },
    group: ['countryId'],
    include: [{
      model: Country,
      as: 'country',
      required: true,
      attributes: ['name']
    }]
  })
  return users.map(user => ({
    country: user.country ? user.country.name : 'N/A',
    totalAge: user.get('totalAge') || 0
  }))
}

export async function countUsersInEachCountry () {
  const users = await User.findAll({
    attributes: [
      'countryId',
      [sequelize.fn('COUNT', sequelize.col('User.id')), 'count']
    ],
    where: {
      age: { [Op.ne]: null }
    },
    group: ['countryId'],
    include: [{
      model: Country,
      as: 'country',
      required: true,
      attributes: ['name']
    }]
  })
  return users.map(user => ({
    country: user.country ? user.country.name : 'N/A',
    count: user.get('count') || 0
  }))
}

export async function findMinAgeUser () {
  const user = await User.findOne({
    where: {
      age: { [Op.ne]: null }
    },
    order: [['age', 'ASC']]
  })
  return user
    ? {
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age
      }
    : null
}

export async function findAllInfoAboutMinAgeUser () {
  const user = await User.findOne({
    where: {
      age: {
        [Op.and]: [
          { [Op.ne]: null },
          sequelize.literal('age = (SELECT MIN(age) FROM Users)')
        ]
      }
    },
    include: [{
      model: Country,
      as: 'country',
      required: false,
      attributes: ['name']
    }]
  })
  return user
    ? {
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        country: user.country ? user.country.name : 'N/A'
      }
    : null
}

export async function countCountries () {
  return await Country.count()
}

export async function countCountriesWithPopulation () {
  return await Country.count({
    where: { population: { [Op.gt]: 0 } }
  })
}

export async function countTotalPopulation () {
  const totalPopulation = await Country.sum('population')
  return totalPopulation || 0
}

export async function getFullNames () {
  const users = await User.findAll({
    attributes: [
      [sequelize.fn('CONCAT', sequelize.col('firstName'), ' ', sequelize.col('lastName')), 'fullName']
    ]
  })
  return users.map(user => user.get('fullName') as string)
}
