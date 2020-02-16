import { Model, INTEGER, STRING } from 'sequelize';

export class User extends Model {
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
    return {
      ...this.associations,
      Task: User.hasMany(models.Task)
    };
  }
}

export default User;
