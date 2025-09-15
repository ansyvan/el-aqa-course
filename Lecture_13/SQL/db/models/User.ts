import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../connection.js'

interface UserAttributes {
  id: number
  firstname: string
  lastname?: string | null
  age?: number | null
  countryId?: number | null
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number
  public firstname!: string
  public lastname?: string | null
  public age?: number | null
  public countryId?: number | null
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
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
}, {
  sequelize,
  tableName: 'Users',
  timestamps: false
})

export default User
