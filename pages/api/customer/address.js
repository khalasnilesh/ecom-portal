const cookies = require('cookie');
const axios = require('axios');

const BASE_URL = process.env.BACKEND_API
export default async (req, res) => {
  const {token} = cookies.parse(req.headers.cookie);
  try {
    const response = await axios.post(`${BASE_URL}/customer/address`, req.body, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(token)}`
      }
    })
    console.log(response)
    if (response.status === 201) {
      res.status(201).json({'success': true, 'added': true, 'data': response.data})
    } else {
      res.status(403).json({'success': false, 'added': false, 'access': 'not allowed'})
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({'success': false, 'message': 'Error while fetching data'})
  }
}