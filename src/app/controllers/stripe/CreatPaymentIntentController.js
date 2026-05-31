// import 'dotenv/config';
// import Stripe from 'stripe';
// import * as Yup from 'yup';

// // ← só uma vez, remova a segunda linha

// const calculateOrderAmount = (items) => {
//   const total = items.reduce((acc, current) => {
//     return current.price * current.quantity + acc;
//   }, 0);
//   return total * 100;
// };

// class CreatePaymentIntentController {
//   async store(request, response) {
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//     const schema = Yup.object().shape({
//       id: Yup.number().required(),
//       quantity: Yup.number().required(),
//       price: Yup.number().required(),
//     });

//     try {
//       schema.validateSync(request.body, { abortEarly: false });
//     } catch (err) {
//       return response.status(400).json({ error: err.errors });
//     }

//     const { products } = request.body;
//     const amount = calculateOrderAmount(products);

//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount,
//         currency: 'brl',
//         automatic_payment_methods: {
//           enabled: true,
//         },
//       });

//       return response.json({
//         clientSecret: paymentIntent.client_secret,
//         // dpmChecherLink: `https://dashboard.stripe.com/settings/payment_methods/reviw?transaction_id=${paymentIntent.id}`,
//       });
//     } catch (err) {
//       return response.status(400).json({ error: err.message });
//     }
//   }
// }

// export default new CreatePaymentIntentController();

import Stripe from 'stripe';
import * as Yup from 'yup';

const calculateOrderAmount = (items) => {
  const total = items.reduce((acc, current) => {
    return current.price * current.quantity + acc;
  }, 0);
  return total;
};

class CreatePaymentIntentController {
  async store(request, response) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const schema = Yup.object().shape({
      products: Yup.array()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
            price: Yup.number().required(),
          })
        )
        .required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { products } = request.body;
    const amount = calculateOrderAmount(products);

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'brl',
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return response.json({
        clientSecret: paymentIntent.client_secret,
        //  dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
      });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default new CreatePaymentIntentController();
