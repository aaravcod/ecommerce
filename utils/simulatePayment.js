export const generateSimulatedPayment = (userEmail) => {
  return {
    paymentId: 'SIMULATED_' + Date.now(),
    status: 'success',
    email: userEmail || 'test@example.com',
  };
};
