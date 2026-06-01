import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { user1, user2 } = req.query;
      if (!user1 || !user2) return res.status(400).json({ error: 'Missing users' });
      
      const { data, error } = await supabase.from('messages')
        .select('*')
        .or(`and(sender_id.eq.${user1},receiver_id.eq.${user2}),and(sender_id.eq.${user2},receiver_id.eq.${user1})`)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      return res.status(200).json(data);
    }
    if (req.method === 'POST') {
      const { sender_id, receiver_id, content, attachment_url } = req.body;
      const { data, error } = await supabase.from('messages').insert({ 
        sender_id, receiver_id, content, attachment_url, read: false 
      }).select().single();
      if (error) throw error;
      return res.status(201).json(data);
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}