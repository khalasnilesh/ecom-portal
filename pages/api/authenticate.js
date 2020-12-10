const axios = require('axios');
const {AxiosServer} = require('../../utils');
const Cookies = require('js-cookie');

const BASE_URL = process.env.BACKEND_API

const authenticate = async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/authenticate`, req.body)
    if (response.status === 200 && response.data) {
      Cookies.set('token', JSON.stringify(response.data.jwt))
      return res.status(200).json({'success': true, 'token': response.data.jwt})
    } else {
      return res.status(403).json({'success': true, 'error': 'Invalid username or password!'})
    }
  } catch (error) {
    console.log(error)
    res.status = 500
    return res.json({'success': false, 'error': 'Error while sending request!'})
  }
}

module.exports = authenticate;