module.exports = (param) => {
	var seconds = Math.floor(param/1000)
    param %= 1000
    var minutes = Math.floor(seconds/60)
    seconds %= 60
    var hours = Math.floor(minutes/60)
    minutes %= 60
    var days = Math.floor(hours/24)
    hours %= 24
    var years = Math.floor(days/365)
    days %= 365
    var written = false
    return (years ? (written = true, years + ' Year') : '') + (written ? ', ' : '') + (days ? (written = true, days + ' Days') : '') + (written ? ', ' : '') + (hours ? (written = true, hours+' Hours') : '') + (written ? ', ' : '') + (minutes ? (written = true, minutes + ' Minutes') : '')
}