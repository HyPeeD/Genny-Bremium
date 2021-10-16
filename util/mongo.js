const mongoose = require("mongoose")

module.exports = async (database) => {
	await mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
	return mongoose
}
