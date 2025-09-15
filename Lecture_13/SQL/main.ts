import {
  createCountry,
  createUser,
  updateCountryByName,
  deleteCountriesByPopulation
} from './services/databaseService.js'
import sequelize from './db/connection.js'

async function runCrudDemo () {
  try {
    await sequelize.sync({ force: true })
    console.log('Database synced!')

    console.log('Creating countries...')
    const usa = await createCountry('USA', 308000000, '+2123456789')
    const ukraine = await createCountry('Ukraine', 41000000, '+380632573505')
    const canada = await createCountry('Canada', 38000000, '+1123123123')
    const spain = await createCountry('Spain', 47000000, '+34123431324')
    await createCountry('Random', 1, '123321123')

    console.log('Creating users...')
    await createUser('Jane', 'Brown', 40, usa.id)
    await createUser('Taras', 'Shevchenko', 31, ukraine.id)
    await createUser('Karen', 'White', 22, usa.id)
    await createUser('David', 'Ricardo', 66, spain.id)
    await createUser('Jim', 'Bim', 99, canada.id)
    await createUser('Test', null, null, null)

    console.log('Updating country...')
    const updateResult = await updateCountryByName('Random', {
      name: 'United Kingdom',
      phone: '+447441426488',
      population: 67000000
    })
    console.log('Update successful:', updateResult)

    console.log('Deleting countries...')
    const deleteResult = await deleteCountriesByPopulation('40000000')
    console.log('Deletion successfull:', deleteResult)

    console.log('CRUD operations completed.')
  } catch (error) {
    console.error('Error during CRUD operations:', error)
  } finally {
    await sequelize.close()
    console.log('Database connection closed.')
  }
}

runCrudDemo()
