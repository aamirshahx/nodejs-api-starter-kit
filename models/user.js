import { INTEGER, Model, STRING } from 'sequelize';

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
    this.associations['Task'] = User.hasMany(models.Task);
    return this.association;
  }
}
export default User;
