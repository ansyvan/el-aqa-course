import { Op } from 'sequelize'
import { Country, User } from '../db/models/assosiations.js'

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
        [Op.gt]: minAge
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
        [Op.between]: [minAge, maxAge]
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
