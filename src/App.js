import React, { useEffect } from 'react';
import HomePageBanner from './components/HomeComponents/HomePageBanner/HomePageBanner';
import SmallCard from './utils/Cards/card1/SmallCard';
import Collections from './components/HomeComponents/Collections/Collections';
import PopularPlaces from './components/HomeComponents/PopularPlaces/PopularPlaces';
import GetTheApp from './components/HomeComponents/GetTheApp/GetTheApp';
import ExploreOptionsNearMe from './components/HomeComponents/ExploreOptionsNearMe/ExploreOptionsNearMe';
import Footer from './components/Footer/Footer';

import orderOnlineImg from './images/orderonline.jpg';
import diningoutImg from './images/diningout.jpg';
import nightlifeandclubsImg from './images/nightlifeandclubs.jpg';

import css from './App.module.css';

import { orderOnlinePage, diningOutPage, nightLifePage } from './helpers/constants';

function App() {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log('Latitude:', position.coords.latitude);
          console.log('Longitude:', position.coords.longitude);
          // You can save the position to state or context here
        },
        error => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <>
      <HomePageBanner />
      <div className={css.bodySize}>
        <div className={css.chooseTypeCards}>
          <SmallCard imgSrc={orderOnlineImg} text="Order Online" link={"/show-case?page=" + orderOnlinePage} />
          <SmallCard imgSrc={diningoutImg} text="Dining Out" link={'/show-case?page=' + diningOutPage} />
          <SmallCard imgSrc={nightlifeandclubsImg} text="Night Life and Clubs" link={'/show-case?page=' + nightLifePage} />
        </div>
        <Collections />
        <PopularPlaces />
      </div>
      <GetTheApp />
      <ExploreOptionsNearMe />
      <Footer />
    </>
  );
}

export default App;
