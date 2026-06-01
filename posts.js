import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'POST') {
      const { fileName, fileBase64, contentType, bucket = 'portfolio' } = req.body;
      const buffer = Buffer.from(fileBase64, 'base64');
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(`${Date.now()}_${fileName}`, buffer, { contentType, upsert: true });
      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);
        
      return res.status(200).json({ url: urlData.publicUrl });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}