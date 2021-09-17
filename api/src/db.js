import Sequelize from 'sequelize'
import initdb from './models/init-models.js'

const sequelize = new Sequelize(
    'mysql_17753_nsf2021',
    'nsf2021',
    'nsf@2021', {
    host: 'my01.winhost.com',
    dialect: 'mysql',
    logging: false
})


const db = initdb (sequelize);
export default db; 