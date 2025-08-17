import Stripe from 'stripe';

/**
 * Initialise and export a singleton instance of the Stripe SDK. The
 * secret key is read from the environment. It is important not to
 * expose the secret key to the client – only import this module in
 * server‑side code (API routes or `getServerSideProps`).
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  // Ensure API version consistency across deployments
  apiVersion: '2022-11-15',
});

export default stripe;
