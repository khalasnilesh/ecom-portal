import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Skeleton from '@material-ui/lab/Skeleton';
import { withStyles } from '@material-ui/core/styles';
import { Axios } from "../utils";
import {motion} from 'framer-motion';
// import OurFeatures from "../components/Homepage/OurFeatures/OurFeatures";
import QuickOrderByCategory from "../components/Homepage/QuickOrderByCategory/QuickOrderByCategory";


const MainSliderPlaceholder = withStyles({
  root: {
    width: '90%',
    margin: '0 auto',
    height: '500px'
  }
})(Skeleton)

const Carousel = dynamic(() => import('../components/Homepage/Homepage-slider/Carousel'),{
  ssr: false,
  loading: () => <MainSliderPlaceholder variant="rect" />
})

const ProductSlider2 = dynamic(
  () => import("../components/Homepage/Product-slider/ProductSlider2"),
  {
    ssr: false,
  }
);

const LogoSlider = dynamic(() => import('../components/Homepage/Logo-slider/LogoSlider'), {
  ssr: false
})

// const logoArr = [
//   {
//     url:
//       "https://images.vaporbeast.com/image/upload/c_lpad,dpr_2.0,f_auto,q_auto/v1/media/wysiwyg/brandsliders/optimized/brandslider_vaporesso.jpg",
//   },
//   {
//     url:
//       "https://images.vaporbeast.com/image/upload/c_lpad,dpr_2.0,f_auto,q_auto/v1/media/wysiwyg/brandsliders/optimized/brandslider_voopoo.jpg",
//   },
//   {
//     url:
//       "https://images.vaporbeast.com/image/upload/c_lpad,dpr_2.0,f_auto,q_auto/v1/media/wysiwyg/brandsliders/optimized/brandslider_kangertech.jpg",
//   },
//   {
//     url:
//       "https://images.vaporbeast.com/image/upload/c_lpad,dpr_2.0,f_auto,q_auto/v1/media/wysiwyg/brandsliders/optimized/brandslider_squeezee.jpg",
//   },
//   {
//     url:
//       "https://images.vaporbeast.com/image/upload/c_lpad,dpr_2.0,f_auto,q_auto/v1/media/wysiwyg/brandsliders/Teslacigs-brandslider.jpg",
//   },
//   {
//     url: "https://images.vaporbeast.com/image/upload/c_lpad,dpr_2.0,f_auto,q_auto/v1/media/wysiwyg/brandsliders/optimized/brandslider_sigelei.jpg"
//   },
//   {
//     url: "https://images.vaporbeast.com/image/upload/c_lpad,dpr_2.0,f_auto,q_auto/v1/media/wysiwyg/brandsliders/optimized/brandslider_smok.jpg"
//   }
// ];

const easing = [.6, -.06, .01, 0.99]

const stagger = {
  animate: {
    transition: {
      staggerChildren: .2
    }
  }
}

const fadeInUp = {
  exit: { 
    y: 100,
    opacity: 0,
    transition: { duration: 0.2, ease: [0.48, 0.15, 0.25, 0.96] }
    },
  initial: {
    y: 60,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: .6,
      ease: easing
    }
  }
}

const Index = (props) => {
  const {onSaleProducts} = props;

  return (
      <motion.div exit={{ opacity: 0 }} initial="initial" variants={stagger} animate="animate">
        <motion.div variants={fadeInUp}>
          <Carousel />
        </motion.div>
        {/* <OurFeatures /> */}
        <QuickOrderByCategory />
        <ProductSlider2
        productsData={onSaleProducts}
        title="New Products"
        ></ProductSlider2>
        <ProductSlider2
        productsData={onSaleProducts}
        title="Best Sellers"
        ></ProductSlider2>
        <ProductSlider2
        productsData={onSaleProducts}
        title="Featured Products"
        ></ProductSlider2>
        {/* <LogoSlider images={logoArr} /> */}
      </motion.div>
  );
};

export async function getStaticProps () {
  let menuItems;
  let onSaleProducts;
  try {
    const res1 = await Axios.get("/menu");
    menuItems = await res1.data;
    const res2 = await Axios.get(`/home/productTag?name=onSale&customerTier=1`)
    onSaleProducts = await res2.data;
  } catch (error) {
    console.log(error)
  }
  return { props : { menuItems, onSaleProducts }}
}

export default Index;
