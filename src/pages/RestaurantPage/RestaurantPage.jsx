import {useState} from 'react'
import { useSelector } from 'react-redux';

import css from './RestaurantPage.module.css'

import NavigationBar from '../../components/Navbars/NavigationBar2/NavigationBar2'
import DownloadAppUtil from '../../utils/RestaurantUtils/DownloadAppUtil/DownloadAppUtil'
import HeroComponent from '../../components/RestaurantComponents/HeroComponent/HeroComponent'
import OrderTitleComponent from '../../components/RestaurantComponents/OrderTitleComponent/OrderTitleComponent'
import OrderBodyComponent from '../../components/RestaurantComponents/OrderBodyComponent/OrderBodyComponent'
import Footer from '../../components/Footer/Footer'

const RestaurantPage = () => {

  const city = useSelector((state) => state.location.city);

  return <div className={css.outerDiv}>
    <NavigationBar />
    <div className={css.innerDiv}>
        <div className={css.breadcrumb}> 
            Home
            /
            India
            /
            { 'Hyderabad' || city }
        </div>
    </div>
    <HeroComponent />
    <div className={css.innerDiv2}>
      <OrderTitleComponent />
      <OrderBodyComponent />
    </div>
    <Footer />
  </div>
}

export default RestaurantPage