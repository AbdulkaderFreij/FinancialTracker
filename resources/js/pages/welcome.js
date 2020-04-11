import React from 'react';
import GuestNav from '../components/guest-nav';
import logo from '../images/logo.svg';
import './welcome.css';
function Welcome () {
  return (
    <div className="flex flex-col min-h-screen">
      <GuestNav />
      <div className="flex flex-2 flex-col items-center justify-center">
        <h1 className="text-indigo text-2xl p-2 font-thin uppercase"> Save Your White Money For Your Black Day!!</h1>
        <div className="flex items-center">
          <img src='/images/icons/laravel.svg' className="h-24" />
          <span className="text-3xl font-thin ml-8">&#43;</span>
          <img src='/images/icons/react.svg' className="h-32" />
          <span className="text-3xl font-thin mr-8 ml-7">&#61;</span>
          <img src={logo} className="h-24" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
