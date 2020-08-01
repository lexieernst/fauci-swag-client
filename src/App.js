import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const apiKey = 'pk_test_51HB9t8Hs8cvrYh7rXFiciTTySGGJId9eEwEKjjBKTVugiqTMARIRGqLVIv1XyGn5mUGxECAbHF6KXQ8xLFvUHVeK00tt6HX14I'
const stripePromise = loadStripe(apiKey);


function App() {
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default App;
