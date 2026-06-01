import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { project_id, user_id } = req.query;
      let query = supabase.from('bids').select('*').order('created_at', { ascending: false });
      if (project_id) query = query.eq('project_id', project_id);
      if (user_id) query = query.eq('user_id', user_id);
      
      const { data: bids, error } = await query;
      if (error) throw error;
      
      const userIds = [...new Set(bids.map(b => b.user_id).filter(Boolean))];
      let usersData = [];
      if (userIds.length > 0) {
        const { data: users } = await supabase.from('users').select('id, full_name, avatar_url, rating').in('id', userIds);
        if (users) usersData = users;
      }
      
      const enrichedData = bids.map(b => ({
        ...b,
        users: usersData.find(u => u.id === b.user_id) || null
      }));
      
      return res.status(200).json(enrichedData);
    }
    if (req.method === 'POST') {
      const { project_id, user_id, amount, message } = req.body;
      const { data, error } = await supabase.from('bids').insert({ 
        project_id, user_id, amount, message, status: 'pending' 
      }).select().single();
      if (error) throw error;
      return res.status(201).json(data);
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}