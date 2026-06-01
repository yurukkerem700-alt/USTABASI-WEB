import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { user_id } = req.query;
      let query = supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (user_id) query = query.eq('user_id', user_id);
      
      const { data: projects, error } = await query;
      if (error) throw error;
      
      // Fetch users manually since we might not have a strict FK constraint
      const userIds = [...new Set(projects.map(p => p.user_id).filter(Boolean))];
      let usersData = [];
      if (userIds.length > 0) {
        const { data: users } = await supabase.from('users').select('id, full_name, avatar_url').in('id', userIds);
        if (users) usersData = users;
      }
      
      const enrichedData = projects.map(p => ({
        ...p,
        users: usersData.find(u => u.id === p.user_id) || null
      }));
      
      return res.status(200).json(enrichedData);
    }
    if (req.method === 'POST') {
      const { user_id, title, description, category, location, budget } = req.body;
      const { data, error } = await supabase.from('projects').insert({ 
        user_id, title, description, category, location, budget, status: 'open' 
      }).select().single();
      if (error) throw error;
      return res.status(201).json(data);
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}