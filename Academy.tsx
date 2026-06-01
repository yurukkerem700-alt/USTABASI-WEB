import { ShoppingBag, Search, Filter, Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Marketplace() {
  const products = [
    { id: 1, title: 'Bosch Profesyonel Kırıcı Delici (İkinci El)', price: '₺4.500', category: 'Ekipman', rating: 4.8, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80', seller: 'Ahmet Usta' },
    { id: 2, title: 'Toptan Filli Boya İç Cephe (15L x 10 Kova)', price: '₺12.000', category: 'Malzeme', rating: 5.0, image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80', seller: 'Yapı Market A.Ş.' },
    { id: 3, title: 'Makita Akülü Vidalama Seti (Sıfır Ayarında)', price: '₺3.200', category: 'Ekipman', rating: 4.5, image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80', seller: 'Mehmet Elektrik' },
    { id: 4, title: '2. El İskele Sistemi (100 m2)', price: '₺18.500', category: 'Büyük Ekipman', rating: 4.2, image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=400&q=80', seller: 'Can İnşaat' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShoppingBag className="text-orange-500" size={32} /> USTABAŞI Marketplace
          </h1>
          <p className="text-slate-500 mt-2">Malzeme, ekipman ve ikinci el alet alım satım platformu.</p>
        </div>
        <button className="glass-button flex items-center gap-2 px-6">
          <ShoppingCart size={18} /> İlan Ver
        </button>
      </div>

      <div className="glass rounded-2xl p-3 flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input type="text" placeholder="Matkap, boya, iskele vb. arayın..." className="glass-input pl-10 py-2.5" />
        </div>
        <button className="glass-panel px-4 py-2 flex items-center gap-2 text-sm font-medium hover:bg-slate-100 transition-colors">
          <Filter size={18} /> Filtrele
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {['Tümü', 'İkinci El Ekipman', 'Sıfır Malzeme', 'Toptan Alım', 'Araç & İş Makinesi'].map((cat, i) => (
          <button key={i} className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${i === 0 ? 'bg-orange-500 text-white shadow-md' : 'glass-panel hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, i) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl overflow-hidden hover:shadow-xl transition-all group flex flex-col"
          >
            <div className="aspect-square relative overflow-hidden bg-slate-100">
              <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                <Star size={12} className="text-amber-500" fill="currentColor" /> {product.rating}
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-1">{product.category}</span>
              <h3 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{product.title}</h3>
              <p className="text-xs text-slate-500 mb-4">Satıcı: {product.seller}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="font-bold text-lg">{product.price}</span>
                <button className="text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg transition-colors">
                  İncele
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}