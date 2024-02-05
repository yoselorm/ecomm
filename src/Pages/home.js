import React from 'react';
import Hero from '../Components/Hero';
import Banner from '../Components/Banner';
import BannerExtra from '../Components/BannerExtra';
import SubscribePane from '../Components/SubscribePane';
import Footer from '../Components/Footer';

const Home = () => {
    return (
        <div className='mx-auto'>
            <Hero/>
            <Banner/>
            <BannerExtra/>
            <SubscribePane/>
            <Footer/>
        </div>
    );
}

export default Home;
