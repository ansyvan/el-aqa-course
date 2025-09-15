import { User, Country } from '../db/models/assosiations.js'
import { Op } from 'sequelize'

export async function createCountry (
  name: string,
  population: number,
  phone: string
): Promise<Country> {
  const newCountry = await Country.create({ name, population, phone })
  console.log('Country created:', newCountry.toJSON())
  return newCountry
}

export async function createUser (
  firstname: string,
  lastname: string | null,
  age: number | null,
  countryId: number | null
): Promise<User> {
  const newUser = await User.create({ firstname, lastname, age, countryId })
  console.log('User created:', newUser.toJSON())
  return newUser
}

export async function findAllCountries () {
  const countries = await Country.findAll({ include: [{ model: User, as: 'user' }] })
  return countries
}

export async function findAllUsers () {
  const users = await User.findAll({ include: [{ model: Country, as: 'country' }] })
  return users
}

export async function updateCountryByName (
  currentName: string,
  newDetails: { name?: string; population?: number; phone?: string }
) {
  const [affectedRows] = await Country.update(newDetails, {
    where: { name: currentName }
  })
  console.log(`Updated ${affectedRows} countries`)
  return affectedRows > 0
}

export async function deleteCountriesByPopulation (maxPopulation: string) {
  const deletedRows = await Country.destroy({
    where: {
      population: { [Op.lt]: maxPopulation }
    }
  })
  console.log(`Deleted ${deletedRows} countries`)
  return deletedRows > 0
}
