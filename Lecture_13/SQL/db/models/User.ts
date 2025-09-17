import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../connection.js'
import { Country } from './Country.js'

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string | null;
  age: number | null;
  countryId: number | null;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number
  declare firstName: string
  declare lastName: string | null
  declare age: number | null
  declare countryId: number | null
  declare country?: Country
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    countryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Countries',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    tableName: 'Users',
    timestamps: false
  }
)

export default User
