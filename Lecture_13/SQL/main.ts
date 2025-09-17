import {
  createCountry,
  createUser,
  updateCountryByName,
  deleteCountriesByPopulation,
  findAllCountries,
  findUserById,
  findAllUsersWithCountries,
  findDistinctCountriesFromUsers,
  findUsersOlder,
  findUsersBetween,
  findUsersInCountries,
  orderUsersByAgeAsc,
  orderCountriesByNameDescLimit,
  sumAgeInEachCountry,
  countUsersInEachCountry,
  findMinAgeUser,
  findAllInfoAboutMinAgeUser,
  countCountries,
  countCountriesWithPopulation,
  countTotalPopulation,
  getFullNames
} from './services/databaseService.js'
import sequelize from './db/connection.js'

async function runCrudDemo () {
  try {
    await sequelize.sync({ force: true })
    console.log('Database synced!')

    console.log('-'.repeat(50))
    console.log('1. CREATING COUNTRIES AND USERS')
    const usa = await createCountry('USA', 308000000, '+2123456789')
    const ukraine = await createCountry('Ukraine', 41000000, '+380632573505')
    const canada = await createCountry('Canada', 38000000, '+1123123123')
    const spain = await createCountry('Spain', 47000000, '+34123431324')
    await createCountry('Random', 1, '123321123')

    await createUser('Jane', 'Brown', 40, usa.id)
    await createUser('Taras', 'Shevchenko', 31, ukraine.id)
    await createUser('Karen', 'White', 22, usa.id)
    await createUser('David', 'Ricardo', 66, spain.id)
    await createUser('Jim', 'Bim', 99, canada.id)
    await createUser('Test', null, null, null)

    console.log('-'.repeat(50))
    console.log('2. READING ALL USERS AND THEIR COUNTRIES')
    const allUsers = await findAllUsersWithCountries()
    allUsers.forEach((user) => {
      const countryName = user.country ? user.country.name : 'N/A'
      console.log(`  - ${user.firstName} ${user.lastName || ''} lives in ${countryName}`)
    })

    console.log('-'.repeat(50))
    console.log('3. DISTINCT COUNTRIES IN USER LIST:')
    const distinctCountries = await findDistinctCountriesFromUsers()
    distinctCountries.forEach((country) => {
      if (country) {
        console.log(`  - ${country.name}`)
      } else {
        console.log('  - N/A')
      }
    })

    console.log('-'.repeat(50))
    console.log('4. USERS OLDER THAN 40 YEARS:')
    const usersOver = await findUsersOlder(40)
    usersOver.forEach((user) => {
      console.log(`  - ${user.firstName} ${user.lastName || ''}, Age: ${user.age}`)
    })

    console.log('-'.repeat(50))
    console.log('5. USERS BETWEEN 30 AND 50 YEARS:')
    const usersBetween = await findUsersBetween(30, 50)
    usersBetween.forEach((user) => {
      console.log(`  - ${user.firstName} ${user.lastName || ''}, Age: ${user.age}`)
    })

    console.log('-'.repeat(50))
    console.log('6. USERS IN COUNTRIES 2 and 4:')
    const usersInCountries = await findUsersInCountries([2, 4])
    usersInCountries.forEach((user) => {
      console.log(`  - ${user.firstName} ${user.lastName || ''} lives in ${user.country}`)
    })

    console.log('-'.repeat(50))
    console.log('7. USERS LIST FROM THE YOUNGEST TO THE OLDEST:')
    const usersAsc = await orderUsersByAgeAsc()
    usersAsc.forEach((user) => {
      console.log(`  - ${user.firstName} ${user.lastName || ''}, Age: ${user.age}`)
    })

    console.log('-'.repeat(50))
    console.log('8. COUNTRIES ORDERED BY NAME IN DESC (first 3):')
    const countriesDesc = await orderCountriesByNameDescLimit(3)
    countriesDesc.forEach((country) => {
      console.log(`  - ${country.name}`)
    })

    console.log('-'.repeat(50))
    console.log('9. TOTAL AGE IN EACH COUNTRY:')
    const totalAgeInCountry = await sumAgeInEachCountry()
    totalAgeInCountry.forEach((entry) => {
      console.log(`  - ${entry.country}: Total Age = ${entry.totalAge}`)
    })

    console.log('-'.repeat(50))
    console.log('10. COUNT USERS IN EACH COUNTRY:')
    const usersInCountry = await countUsersInEachCountry()
    usersInCountry.forEach((entry) => {
      console.log(`  - ${entry.country}: Total Users = ${entry.count}`)
    })

    console.log('-'.repeat(50))
    console.log('11. THE YOUNGEST USER:')
    const youngestUser = await findMinAgeUser()
    if (youngestUser) {
      console.log(`  - ${youngestUser.firstName} ${youngestUser.lastName || ''}, \
Age: ${youngestUser.age}`)
    } else {
      console.log('No youngest user found.')
    }

    console.log('-'.repeat(50))
    console.log('12. ALL INFO ABOUT THE YOUNGEST USER:')
    const youngestUserAllInfo = await findAllInfoAboutMinAgeUser()
    if (youngestUserAllInfo) {
      console.log(`  - ${youngestUserAllInfo.firstName} ${youngestUserAllInfo.lastName || ''}, \
Age: ${youngestUserAllInfo.age}, \
Country: ${youngestUserAllInfo.country}`)
    } else {
      console.log('No youngest user found.')
    }

    console.log('-'.repeat(50))
    console.log('13. COUNTRIES COUNT:')
    const countriesCount = await countCountries()
    console.log(`  - Total Countries: ${countriesCount}`)

    console.log('-'.repeat(50))
    console.log('14. TOTAL POPULATION FROM COUNTRIES AMOUNT:')
    const totalCountriesWithPopulationData = await countCountriesWithPopulation()
    const totalPopulation = await countTotalPopulation()
    console.log(`  - Total Population from ${totalCountriesWithPopulationData} countries: ${totalPopulation}`)

    console.log('-'.repeat(50))
    console.log('15. Users full names:')
    const users = await getFullNames()
    users.forEach((fullName) => {
      console.log(`  - ${fullName}`)
    })

    console.log('-'.repeat(50))
    console.log('16. UPDATING A COUNTRY')
    const updateResult = await updateCountryByName('Random', {
      name: 'United Kingdom',
      phone: '+447441426488',
      population: 67000000
    })
    console.log('Update successful:', updateResult)

    console.log('-'.repeat(50))
    console.log('17. DELETING COUNTRIES (population <= 40,000,000)')
    const deletedCount = await deleteCountriesByPopulation(40000000)
    console.log(`Deletion successful: ${deletedCount} countries deleted.`)

    console.log('-'.repeat(50))
    console.log('18. FINAL LIST OF COUNTRIES')
    const finalCountries = await findAllCountries()
    finalCountries.forEach((country) => {
      console.log(`  - ${country.name}, population: ${country.population}`)
    })

    console.log('-'.repeat(50))
    console.log('19. FINAL LIST OF USERS (with country details)')
    const finalUsers = await findAllUsersWithCountries()
    finalUsers.forEach((user) => {
      const countryName = user.country ? user.country.name : 'N/A'
      console.log(`  - ${user.firstName} ${user.lastName || ''} lives in ${countryName}`)
    })

    console.log('-'.repeat(50))
    console.log('20. WHERE IS JIM?')
    const id = 5
    const jim = await findUserById(id)
    if (jim) {
      console.log(`Found user: ${jim.firstName} ${jim.lastName}`)
    } else {
      console.log(`User with ID ${id} was not found. He was deleted with his country.`)
    }

    console.log('\nCRUD operations completed.')
  } catch (error) {
    console.error('Error during CRUD operations:', error)
  } finally {
    await sequelize.close()
    console.log('Database connection closed.')
  }
}

runCrudDemo()
