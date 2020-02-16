import { Model, INTEGER, STRING, BOOLEAN } from 'sequelize';

export class Task extends Model {
  static init(sequelize) {
    const schema = {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      done: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    };

    const options = { sequelize };
    return super.init(schema, options);
  }

  static associate(models) {
    return {
      ...this.associations,
      User: Task.belongsTo(models.User)
    };
  }
}

export default Task;
