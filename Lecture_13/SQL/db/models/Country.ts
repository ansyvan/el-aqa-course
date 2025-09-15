import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../connection.js'

interface CountryAttributes {
  id: number
  name: string
  population?: number
  phone?: string
}

type CountryCreationAttributes = Optional<CountryAttributes, 'id'>

class Country extends Model<CountryAttributes, CountryCreationAttributes> implements CountryAttributes {
  public id!: number
  public name!: string
  public population?: number
  public phone?: string
}

Country.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    population: {
      type: DataTypes.INTEGER
    },
    phone: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    tableName: 'Countries',
    timestamps: false
  })

export default Country
