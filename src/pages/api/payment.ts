/** @format */
import Stripe from "stripe";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  amount: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const secretKey = process.env.STRIPETEST_SKEY;
    if (typeof secretKey !== "string") {
      throw new Error("Stripe secret key is not a string");
    }
    const stripe = new Stripe(secretKey, {
      apiVersion: "2022-11-15",
    });

    const amount = req.body.amount.price;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      receipt_email: "test@test.com",
      payment_method_types: ["card"],
    });
    if (!paymentIntent) {
      res.status(500);
    }

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500);
  }
}
