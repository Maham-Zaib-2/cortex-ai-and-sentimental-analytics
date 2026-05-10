export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    const customers = [
      { id: 1, name: 'Ahmed Raza', email: 'ahmed@email.com', churnRisk: 82, loyaltyScore: 34, sentiment: 'negative', lastInteraction: '2 days ago' },
      { id: 2, name: 'Sara Malik', email: 'sara@email.com', churnRisk: 74, loyaltyScore: 41, sentiment: 'negative', lastInteraction: '5 days ago' },
      { id: 3, name: 'Zain Ali', email: 'zain@email.com', churnRisk: 69, loyaltyScore: 48, sentiment: 'neutral', lastInteraction: '1 week ago' },
      { id: 4, name: 'Fatima Khan', email: 'fatima@email.com', churnRisk: 61, loyaltyScore: 55, sentiment: 'neutral', lastInteraction: '3 days ago' },
      { id: 5, name: 'Omar Siddiqui', email: 'omar@email.com', churnRisk: 45, loyaltyScore: 67, sentiment: 'positive', lastInteraction: '1 day ago' },
      { id: 6, name: 'Ayesha Noor', email: 'ayesha@email.com', churnRisk: 38, loyaltyScore: 71, sentiment: 'positive', lastInteraction: '4 days ago' },
      { id: 7, name: 'Bilal Ahmed', email: 'bilal@email.com', churnRisk: 22, loyaltyScore: 84, sentiment: 'positive', lastInteraction: '2 days ago' },
      { id: 8, name: 'Sana Sheikh', email: 'sana@email.com', churnRisk: 15, loyaltyScore: 91, sentiment: 'positive', lastInteraction: 'Today' },
    ];

    res.status(200).json({ success: true, data: customers });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
