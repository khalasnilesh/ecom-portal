const cookies = require('cookie');
const axios = require('axios');

const BASE_URL = process.env.BACKEND_API

export default async (req, res) => {
  const {token} = cookies.parse(req.headers.cookie);
  const {body} = req
  try {
    const response = await axios.delete(`${BASE_URL}/cartLineItem/clearSelected`,{
      headers: {
        'Authorization': `Bearer ${JSON.parse(token)}`
      },
      data: [...body]
    })
    if(response.status === 200) {
      res.status(200).json({'success': true})
    } else {
      console.log('Could not delete item')
      res.status(403).json({'success': false})
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({'success': false})
  }
}