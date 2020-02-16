import { INTEGER, Model, STRING } from 'sequelize';

export class Users extends Model {
  static init(sequelize) {
    const schema = {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      password: {
        type: STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      }
    };

    const options = { sequelize };

    return super.init(schema, options);
  }

  static associate(models) {
    this.associations['Tasks'] = Users.hasMany(models.Tasks);
    return this.association;
  }
}
export default Users;
