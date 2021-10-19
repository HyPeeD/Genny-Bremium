const mongoose = require('mongoose')

module.exports = async (database) => {
	if (mongoose.connection) await mongoose.connection.close()
	await mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
	return mongoose
}
