module.exports = (param) => {
	let final0 = param.replace('GMT', '')
    let final = final0.replace(final0.split(' ')[2], final0.split(' ')[1]).replace(final0.split(' ')[1], final0.split(' ')[2])
    let final2 = final.replace(final.split(' ')[2], final.split(' ')[2]+',')
    let cc = ''
    if (final2.split(' ')[4].split(':')[0] < 12) cc = ' AM'
    else cc = ' PM'
    let finalofaccount = final2.replace(final2.split(' ')[4], final2.split(' ')[4].split(':')[0] +':'+final2.split(' ')[4].split(':')[1]) + cc
    return finalofaccount
}