const cookies = require('cookie');
const axios = require('axios');

const BASE_URL = process.env.BACKEND_API
export default async (req, res) => {
  const {token} = cookies.parse(req.headers.cookie);
  try {
    const response = await axios.get(`${BASE_URL}/cartLineItem/search`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(token)}`
      }
    })
    if(response.status === 200) {
      res.status(200).json({'success': true, 'data': response.data})
    } else {
      res.status(500).json({'success': false, 'data': 'no access'})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({'success': false, 'message': 'Error while fetching data'})
  }
}