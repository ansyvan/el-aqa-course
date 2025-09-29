import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../connection.js'

interface CountryAttributes {
  id: number;
  name: string;
  population: number;
  phone: string;
}

type CountryCreationAttributes = Optional<CountryAttributes, 'id'>;

export class Country extends Model<CountryAttributes, CountryCreationAttributes> {
  declare id: number
  declare name: string
  declare population: number
  declare phone: string
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
  }
)

export default Country
