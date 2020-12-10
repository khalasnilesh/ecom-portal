export const initializeLocalCart = () => {
  let cartLineItems = localStorage.getItem('cartLineItems')
    if(cartLineItems) {
  let totalCartPrice;
  let totalCartQuantity;
  cartLineItems = JSON.parse(cartLineItems)
  totalCartPrice = JSON.parse(localStorage.getItem('totalCartPrice'))
  totalCartQuantity = JSON.parse(localStorage.getItem('totalCartQuantity'))
  return {
    cartLineItems,
    totalCartPrice,
    totalCartQuantity
  }
    }
    localStorage.setItem('cartLineItems', JSON.stringify([]))
    localStorage.setItem('totalCartPrice', JSON.stringify(0))
    localStorage.setItem('totalCartQuantity', JSON.stringify(0))
    console.log('Local Cart created')
}

export const loadSavedLocalCart = () => {
  let cartLineItems;
  let totalCartPrice;
  let totalCartQuantity;
  cartLineItems = JSON.parse(localStorage.getItem('cartLineItems'))
  totalCartPrice = JSON.parse(localStorage.getItem('totalCartPrice'))
  totalCartQuantity = JSON.parse(localStorage.getItem('totalCartQuantity'))
  return Object.assign({}, {
    cartLineItems,
    totalCartPrice,
    totalCartQuantity
  })
}

  export const localAddToCart = (products) => {
    const cartLineItems = localStorage.getItem('cartLineItems')
    const totalCartPrice = localStorage.getItem('totalCartPrice')
    const totalCartQuantity = localStorage.getItem('totalCartQuantity')

    let serializedTotalCartPrice = JSON.parse(totalCartPrice)
    let serializedTotalCartQuantity = JSON.parse(totalCartQuantity)
    const serializedCartLineItems = JSON.parse(cartLineItems)
    let temp = [];
    products.forEach((product) => {
    serializedTotalCartQuantity += product.quantity
    serializedTotalCartPrice += (product.quantity * product.standardPrice)
    const index = serializedCartLineItems.findIndex((savedProduct) => {
      return product.productId === savedProduct.productId
    });
    if (index !== -1) {
      console.log('Quantity updated')
      serializedCartLineItems[index].quantity += product.quantity
    } else {
      console.log('Added to temp')
      temp.push(product)
    }
    })
    const updatedCartLineItems = [...serializedCartLineItems, ...temp]
    console.log(updatedCartLineItems)
    const serializedUpdatedCartLineItems = JSON.stringify(updatedCartLineItems)
    serializedTotalCartPrice = parseFloat(+(Math.round(serializedTotalCartPrice + "e+2")  + "e-2"))
    localStorage.setItem('cartLineItems', serializedUpdatedCartLineItems)
    localStorage.setItem('totalCartQuantity', JSON.stringify(serializedTotalCartQuantity))
    localStorage.setItem('totalCartPrice', JSON.stringify(serializedTotalCartPrice))
  }

  export const localUpdateCart = (products) => {
    const cartLineItems = localStorage.getItem('cartLineItems')
    const serializedCartLineItems = JSON.parse(cartLineItems)

    const indexes = []
    products.forEach((product) => {
      indexes.push({productId: product.productId, quantity: product.quantity})
    })

    indexes.forEach((toUpdateProduct) => {
      const index = serializedCartLineItems.findIndex((savedItem) => savedItem.productId === toUpdateProduct.productId)
      if(index !== -1) {
        serializedCartLineItems[index].quantity = toUpdateProduct.quantity
      } else {
        return
      }
    })

    let updatedCartQuantity = 0
    let updatedCartPrice = 0

    serializedCartLineItems.forEach((product) => {
      updatedCartQuantity += product.quantity
      updatedCartPrice += (product.quantity * product.standardPrice)
    })

    updatedCartPrice = parseFloat(+(Math.round(updatedCartPrice + "e+2")  + "e-2"))

    const updatedLineItems = JSON.stringify(serializedCartLineItems)
    localStorage.setItem('cartLineItems', updatedLineItems)
    localStorage.setItem('totalCartQuantity', JSON.stringify(updatedCartQuantity))
    localStorage.setItem('totalCartPrice', JSON.stringify(updatedCartPrice))
  }

  export const localRemoveFromCart = (products) => {
    const cartLineItems = localStorage.getItem('cartLineItems')
    const totalCartPrice = localStorage.getItem('totalCartPrice')
    const totalCartQuantity = localStorage.getItem('totalCartQuantity')

    let serializedTotalCartPrice = JSON.parse(totalCartPrice)
    let serializedTotalCartQuantity = JSON.parse(totalCartQuantity)
    const serializedCartLineItems = JSON.parse(cartLineItems)

    let updatedQuantity = serializedTotalCartQuantity - (products.reduce((acc, item) => {
      return acc + item.quantity
    }, 0))
    let updatedPrice = serializedTotalCartPrice - (products.reduce((acc, item) => {
      return acc + (item.quantity * item.standardPrice)
    }, 0))

    updatedPrice = parseFloat(+(Math.round(updatedPrice + "e+2")  + "e-2"))

    const indexes = []
    products.forEach((product) => indexes.push(product.productId))
    const updatedCartLineItems = serializedCartLineItems.filter(item => indexes.indexOf(item.productId) === -1)
    const serializedUpdatedCartLineItems = JSON.stringify(updatedCartLineItems)
    console.log(updatedCartLineItems)
    localStorage.setItem('cartLineItems', serializedUpdatedCartLineItems)
    localStorage.setItem('totalCartQuantity', JSON.stringify(updatedQuantity))
    localStorage.setItem('totalCartPrice', JSON.stringify(updatedPrice))
  }