const mongoose = require('mongoose')

module.exports = async (database) => {
	try {
		await mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
		return mongoose
	} catch (e) {
		console.log(e)
		await mongoose.connection.close()
		await mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
		return mongoose
	}
}
