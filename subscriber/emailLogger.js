
import { subscriber } from '../utils/pubsub.js';

export const initEmailLogger = () => {
  subscriber.subscribe('payment_successful', async (message) => {
    try {
      const { email, orderId } = JSON.parse(message);

      console.log('[EMAIL SIMULATION]');
      console.log(`To: ${email}`);
      console.log(`Subject: Order Confirmation`);
      console.log(`Message: Your order (${orderId}) has been successfully paid.`);
      console.log('No real email sent — this is a simulation.\n');
    } catch (error) {
      console.error('Failed to log simulated email:', error.message);
    }
  });
};
