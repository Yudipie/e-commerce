const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Controller to handle creating a Stripe checkout session
const createCheckoutSession = async (req, res) => {
  try {
    const { cartItems } = req.body;

    // Map cart items to Stripe line items (hardcoding price to 1 USD for testing)
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: 100, // 1 USD = 100 cents
      },
      quantity: item.quantity,
    }));

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });

    // Send the session ID to the client
    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createCheckoutSession };
