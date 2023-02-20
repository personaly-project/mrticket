/** @format */

interface IPageProps {
  ticketId: string | undefined;
  allTickets: ITicket[] | undefined;
}
import Head from "next/head";
import { NextPage } from "next";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { ticketsApi } from "../prisma";
import {
  AddressElement,
  Elements,
  useElements,
  PaymentElement,
  PaymentElementProps,
  PaymentElementComponent,
  useStripe,
  CardElement,
} from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";
import { ITicket } from "@/lib/types";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET!);

export function StripeCheckout({ ticketId, allTickets }: IPageProps) {
  interface IStripe {
    sessionId: string;
    publishableKey: string;
  }

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {stripePromise && (
          <Elements stripe={stripePromise}>
            <CheckoutForm ticketid={ticketId} allTickets={allTickets} />
          </Elements>
        )}
      </main>
    </>
  );
}

interface checkoutProps {
  ticketid: string | undefined;
  allTickets: ITicket[] | undefined;
}
export const CheckoutForm: React.FC<checkoutProps> = ({
  ticketid,
  allTickets,
}) => {
  const [paymentIntent, setPaymentIntent] = useState<any>(null);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const getPaymentData = async () => {
      const priceToPay: ITicket | undefined = allTickets?.find(
        (ticket) => ticket.id === ticketid
      );
      priceToPay?.price;

      if (!priceToPay) {
        console.log("priceToPay is null");
        return;
      }

      const data = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: priceToPay,
        }),
      }).then((res) => res.json());

      const stripe = await stripePromise;
      setClientSecret(data.clientSecret);

      if (stripe === null) {
        console.log("stripe is null");
        return;
      }
      const currentPaymentIntent = await stripe.retrievePaymentIntent(
        data.clientSecret
      );

      setPaymentIntent(currentPaymentIntent.paymentIntent);
    };

    getPaymentData();
    console.log("paymentIntent", paymentIntent, ticketid, allTickets);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.log("[error] CardElement is not yet retrieved");
      return;
    }
    //stripe card element
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      return;
    }

    if (!paymentIntent) {
      console.log("[error] PaymentIntent is not yet retrieved");
      return;
    }
    if (!clientSecret) {
      console.log("[error] clientSecret is not yet retrieved");
      return;
    }

    const confirmCardPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmCardPayment.error) {
      confirmCardPayment.error.message;
      console.log("[error]", confirmCardPayment.error);
    } else {
      // The payment has been processed!
      confirmCardPayment.paymentIntent.status;

      return window.location.replace("/success");
    }
  };

  return (
    <>
      {paymentIntent && (
        <div
          style={{
            marginTop: "100px",
            padding: "60px",
            display: "flex",
            flexDirection: "column",
            width: "500px",
            margin: "0 auto",
            border: "1px solid black",
            gap: "20px",
            height: "max-content",
          }}
        >
          <p>Amount: ${paymentIntent.amount}</p>
          <p
            style={{
              wordBreak: "break-all",

              width: "500px",
            }}
          >
            Payment Method: {paymentIntent.payment_method_types}
          </p>
        </div>
      )}
      <form
        style={{
          marginTop: "100px",
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          width: "500px",
          margin: "0 auto",
          border: "1px solid black",

          gap: "20px",
          height: "max-content",
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid black",
            fontSize: "16px",
            borderRadius: "5px",
          }}
        />
        <CardElement
          options={{
            style: {
              base: {
                padding: "10px",
                fontSize: "16px",

                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px",
          }}
          disabled={!stripe}
        >
          Pay
        </button>
        <Image
          width={100}
          height={100}
          src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg"
          alt="visa"
          style={{
            objectFit: "contain",
          }}
        />
      </form>
    </>
  );
};
