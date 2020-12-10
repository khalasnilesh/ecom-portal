const {AxiosServer} = require('../../../utils');

const getUserData = async (req, res) => {
  try {
    const response = await AxiosServer.get('/customer/1', {
      headers: {
        'Authorization': `${req.headers.authorization}`
      }
    })
    res.status = 200
    res.json({'success': true, 'data': response.data})
  } catch (error) {
    console.log(error)
    res.json({'success': false, 'message': 'Error while fetching data'})
  }
}
module.exports = getUserData;