import React from 'react';
import GuestNav from '../components/guest-nav';
import logo from '../images/logo.svg';
import './welcome.css';
function Welcome () {
  return (
    <div className="flex flex-col min-h-screen">
      <GuestNav />
      <div className="flex flex-2 flex-col items-center justify-center">
        <h1 className="text-indigo text-2xl font-thin uppercase"> Save Your White Money For Your Black Day!!</h1>
        <h1 className="text-indigo text-xl font-thin uppercase">Simple money tracker</h1>
        <ul>
          <li>It takes seconds to record daily transactions. Put them into clear and visualized categories such as Expense: Food, Shopping or Income: Salary, Gift</li>
          <li>Set goals that are easy to stick to, based on your own spending habits. You’re one step closer to that stuff you want to buy.</li>
        </ul>
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
