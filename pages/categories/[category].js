import React from 'react';
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import ProductGrid from '../../components/Product-Grid/ProductGrid';
import {asyncfetchCategoryProducts} from '../../store/asyncActions/asyncActions';
import {motion} from 'framer-motion';


const CategoryPage = () => {
  const router = useRouter()
  const _id = router.query.id;
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(asyncfetchCategoryProducts(_id))
  }, [_id])
  return (
    <>
      <motion.div exit={{ opacity: 0, y: 60 }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}>
        <ProductGrid />
      </motion.div>
    </>
  )
}


export default CategoryPage;