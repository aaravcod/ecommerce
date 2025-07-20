import { subscriber, publisher } from '../utils/pubsub.js';


const simulatePayment = async () => {
  await subscriber.subscribe('order_created', async (message) => {
    const { orderId, userEmail } = JSON.parse(message);

    console.log(`Received order_created for ${orderId}`);

    await new Promise((r) => setTimeout(r, 2000));

    await publisher.publish(
      'payment_successful',
      JSON.stringify({
        orderId,
        paymentId: 'SIM_' + Date.now(),
        email: userEmail,
      })
    );
  });
};

export default simulatePayment;
