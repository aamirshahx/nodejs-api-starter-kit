import { Model, INTEGER, STRING, BOOLEAN } from 'sequelize';

export class Tasks extends Model {
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
    this.associations['Users'] = Tasks.belongsTo(models.Users);
    return this.association;
  }
}

export default Tasks;
