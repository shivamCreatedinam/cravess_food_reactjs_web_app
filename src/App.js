import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import { setLocation, setCity } from './Redux/slices/Location';
import { orderOnlinePage, diningOutPage, nightLifePage } from './helpers/constants';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          dispatch(setLocation({ latitude, longitude }));
          reverseGeocode(latitude, longitude);
          // console.log(latitude, longitude)
        },
        error => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [dispatch]);

  function reverseGeocode(latitude, longitude) {
    const apiKey = process.env.REACT_APP_MAP_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          const results = data.results;
          if (results.length > 0) {
            const locality = results[0].address_components.find(component =>
              component.types.includes("locality")
            );
            if (locality) {
              dispatch(setCity(locality.long_name));
              // console.log(locality.long_name)
            } else {
              console.warn('Locality not found in address components');
            }
          }
        } else {
          alert("Geocode was not successful for the following reason: " + data.status);
        }
      })
      .catch(error => console.error('Error:', error));
  }

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
