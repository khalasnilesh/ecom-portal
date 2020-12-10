
const cookies = require('cookie');
const axios = require('axios');

const BASE_URL = process.env.BACKEND_API
const getStates = async (req, res) => {
  const {token} = cookies.parse(req.headers.cookie);
  try {
    const response = await axios.get(`${BASE_URL}/state`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(token)}`
      }
    })
    res.status = 200
    res.json({'success': true, 'data': response.data})
  } catch (error) {
    console.log(error)
    res.json({'success': false, 'message': 'Error while fetching data'})
  }
}
module.exports = getStates;