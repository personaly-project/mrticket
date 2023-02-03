/** @format */
import Stripe from "stripe";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const stripeConfig = {
  apiVersion: "2020-08-27",
  secretKey: process.env.STRIPE_SECRET_KEY,
  publicKey: process.env.STRIPE_PUBLIC_KEY,
};
const stripe = new Stripe(
  "sk_test_51MWlLsGBL31qIrQExIrjz7aRXJWxfirJB6ABrOzfsccq55HZ3SNYIlDYP66Jv0pLk7WXq1eJkqaKFUlf0VoRnd0600sG0s3rKS",
  {
    apiVersion: "2022-11-15",
  }
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const payementIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: "usd",
      receipt_email: "test@test.com",
      payment_method_types: ["card"],
    });

    res.status(200).json({ clientSecret: payementIntent.client_secret });
  } catch (err) {
    res.status(500).json({ name: err });
  }
}
