import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import CardSection from './CardSection';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const res = await fetch('http://localhost:4000/secret')
    const {client_secret} = await res.json()

// collect payment method details and submit payment details to stripe
    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      window.alert('Sorry, there was an error. Please try again.') 
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
        window.alert('Payment was successful!')
        // show a success page
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button className="Button" disabled={!stripe}>Buy T-Shirt</button>
    </form>
  );
}