import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function CreateJob() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'İnşaat',
    location: '',
    budget: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, user_id: user.id })
      });
      if (res.ok) {
        navigate('/jobs');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Yeni İş İlanı Oluştur</h1>
      
      <form onSubmit={handleSubmit} className="glass p-6 md:p-8 rounded-3xl space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1 ml-1">İş Başlığı</label>
          <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Örn: Evin tüm elektrik tesisatı yenilenecek" className="glass-input" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 ml-1">Kategori</label>
          <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="glass-input">
            <option>İnşaat</option>
            <option>Elektrik</option>
            <option>Tesisat</option>
            <option>Otomotiv</option>
            <option>Mobilya</option>
            <option>Boya & Badana</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 ml-1">Detaylı Açıklama</label>
          <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="İşin detaylarını, beklentilerinizi yazın..." className="glass-input resize-none"></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 ml-1">Konum</label>
            <input type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="İl, İlçe" className="glass-input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 ml-1">Tahmini Bütçe (TL)</label>
            <input type="text" required value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} placeholder="Örn: 5000 - 8000" className="glass-input" />
          </div>
        </div>

        <button type="submit" disabled={loading} className="glass-button w-full mt-4">
          {loading ? 'Oluşturuluyor...' : 'İlanı Yayınla'}
        </button>
      </form>
    </div>
  );
}