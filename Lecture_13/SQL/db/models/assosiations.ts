import User from './User.js'
import Country from './Country.js'

Country.hasMany(User, { foreignKey: 'countryId', as: 'users' })

User.belongsTo(Country, { foreignKey: 'countryId', as: 'country' })

export { User, Country }
