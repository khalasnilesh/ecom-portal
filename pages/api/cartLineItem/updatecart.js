const cookies = require('cookie');
const axios = require('axios');

const BASE_URL = process.env.BACKEND_API
export default async (req, res) => {
  const {token} = cookies.parse(req.headers.cookie);
  try {
    const response = await axios.put(`${BASE_URL}/cartLineItem/updateAll`, req.body, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(token)}`
      }
    })
    if (response.status === 200 && response.data) {
      res.status(200).json(response.data)
    } else {
      res.status(403).json({'success': false, 'data': 'No access'})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({'success': false, 'error': 'Error while sending request'})
  }
}