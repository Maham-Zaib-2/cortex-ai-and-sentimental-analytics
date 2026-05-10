export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const alerts = [
    { id: 1, customer: 'Ahmed Raza', type: 'High Churn Risk', message: 'Sentiment dropped for 3 consecutive days. Last 3 interactions all negative.', priority: 'high', time: '2 min ago' },
    { id: 2, customer: 'Sara Malik', type: 'Negative Sentiment', message: 'Spike in billing issue keywords detected across last 5 messages.', priority: 'high', time: '18 min ago' },
    { id: 3, customer: 'Zain Ali', type: 'Competitor Mention', message: 'Customer mentioned switching to competitor platform.', priority: 'medium', time: '30 min ago' },
    { id: 4, customer: 'Fatima Khan', type: 'Negative Sentiment', message: 'Customer satisfaction score dropped below alert threshold.', priority: 'medium', time: '1 hour ago' },
    { id: 5, customer: 'Omar Siddiqui', type: 'No Response', message: 'Customer has not responded to last 2 follow-up messages.', priority: 'medium', time: '2 hours ago' },
  ];

  res.status(200).json(alerts);
}
