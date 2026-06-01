import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { id, role } = req.query;
      let query = supabase.from('users').select('*');
      if (id) query = query.eq('id', id);
      if (role) query = query.eq('role', role);
      const { data, error } = await query;
      if (error) throw error;
      return res.status(200).json(data);
    }
    if (req.method === 'POST') {
      const { id, email, role, full_name } = req.body;
      const { data, error } = await supabase.from('users').insert({ id, email, role, full_name }).select().single();
      if (error) throw error;
      return res.status(201).json(data);
    }
    if (req.method === 'PUT') {
      const { id, full_name, bio, location, lat, lng, avatar_url, phone } = req.body;
      const { data, error } = await supabase.from('users').update({ full_name, bio, location, lat, lng, avatar_url, phone }).eq('id', id).select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}