module.exports = {
HOST : "localhost",
USER: "postgres",
PASSWORD: "Netflix@2020",
DB: "webapp",
dialect: "postgres",
pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
},
dialectOptions: {
    useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: true
},
timezone: '-05:00'
}