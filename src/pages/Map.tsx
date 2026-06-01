import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { Search, Filter, Briefcase, User, MapPin, Star, Phone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Fix for default marker icon in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons
const masterIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const jobIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map centering
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

export default function MapView() {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<'masters' | 'jobs'>('masters');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([41.0082, 28.9784]);

  // Dummy Data for Map
  const masters = [
    { id: 1, lat: 41.0082, lng: 28.9784, name: "Ahmet Yılmaz", role: "Elektrik Ustası", rating: 4.8, phone: "0555 123 4567", bio: "Akıllı ev sistemleri uzmanı." },
    { id: 2, lat: 41.0382, lng: 28.9884, name: "Mehmet Demir", role: "Sıhhi Tesisat", rating: 4.5, phone: "0555 987 6543", bio: "7/24 acil tesisat servisi." },
    { id: 3, lat: 41.0200, lng: 29.0000, name: "Kemal Usta", role: "Boya & Badana", rating: 4.9, phone: "0555 333 4455", bio: "Jotun ve Filli Boya uzman uygulamacı." },
  ];

  const jobs = [
    { id: 101, lat: 40.9882, lng: 29.0284, title: "Komple Elektrik Tesisatı", company: "Ayşe K.", budget: "₺15.000", type: "Acil", desc: "Evin tüm tesisatı yenilenecek." },
    { id: 102, lat: 41.0500, lng: 28.9500, title: "Mutfak Dolabı İmalatı", company: "Can İnşaat", budget: "₺25.000", type: "Proje", desc: "Özel ölçü MDF mutfak dolabı." },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleItemClick = (item: any, type: 'masters' | 'jobs') => {
    setSelectedItem({ ...item, type });
    setMapCenter([item.lat, item.lng]);
    // On mobile, scroll to map
    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-4 animate-in fade-in duration-500">
      
      {/* Sidebar (List View) */}
      <div className="w-full md:w-96 glass rounded-3xl flex flex-col overflow-hidden h-[40vh] md:h-full shrink-0 shadow-xl border border-slate-200 dark:border-slate-700/80">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
          <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-4">
            <button 
              onClick={() => setActiveTab('masters')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'masters' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <User size={16} /> Ustalar
            </button>
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'jobs' ? 'bg-white dark:bg-slate-700 shadow-sm text-red-600' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <Briefcase size={16} /> İlanlar
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder={`${activeTab === 'masters' ? 'Usta' : 'İlan'} ara...`} className="glass-input pl-10 py-2 text-sm" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          <AnimatePresence mode="wait">
            {activeTab === 'masters' ? (
              <motion.div key="masters" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                {masters.map(master => (
                  <div 
                    key={master.id} 
                    onClick={() => handleItemClick(master, 'masters')}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${selectedItem?.id === master.id ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700' : 'bg-white/50 dark:bg-slate-800/50 border-transparent hover:border-slate-300 dark:hover:border-slate-600'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-slate-900 dark:text-white">{master.name}</h3>
                      <span className="flex items-center gap-1 text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-md"><Star size={12} fill="currentColor" /> {master.rating}</span>
                    </div>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">{master.role}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{master.bio}</p>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="jobs" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-3">
                {jobs.map(job => (
                  <div 
                    key={job.id} 
                    onClick={() => handleItemClick(job, 'jobs')}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${selectedItem?.id === job.id ? 'bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700' : 'bg-white/50 dark:bg-slate-800/50 border-transparent hover:border-slate-300 dark:hover:border-slate-600'}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{job.title}</h3>
                      <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-md whitespace-nowrap">{job.budget}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">{job.company}</p>
                    <div className="flex items-center gap-1 text-xs font-medium bg-slate-200 dark:bg-slate-700 w-max px-2 py-1 rounded-md text-slate-700 dark:text-slate-300">
                      <MapPin size={12} /> Yakınınızda
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 rounded-3xl overflow-hidden glass border border-slate-200 dark:border-slate-700/80 shadow-xl relative z-0">
        {isClient && (
          <MapContainer center={mapCenter} zoom={12} style={{ height: '100%', width: '100%' }}>
            <ChangeView center={mapCenter} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            
            {/* Master Markers */}
            {(activeTab === 'masters' || selectedItem) && masters.map(master => (
              <Marker key={`m-${master.id}`} position={[master.lat, master.lng]} icon={masterIcon}>
                <Popup className="custom-popup">
                  <div className="p-1">
                    <h3 className="font-bold text-sm mb-1">{master.name}</h3>
                    <p className="text-xs text-blue-600 mb-2">{master.role}</p>
                    <button className="w-full bg-blue-600 text-white text-xs font-bold py-1.5 rounded-lg">Profili Gör</button>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Job Markers */}
            {(activeTab === 'jobs' || selectedItem) && jobs.map(job => (
              <Marker key={`j-${job.id}`} position={[job.lat, job.lng]} icon={jobIcon}>
                <Popup>
                  <div className="p-1">
                    <h3 className="font-bold text-sm mb-1">{job.title}</h3>
                    <p className="text-xs text-green-600 font-bold mb-2">{job.budget}</p>
                    <button className="w-full bg-red-600 text-white text-xs font-bold py-1.5 rounded-lg">İlana Git</button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        {/* Selected Item Floating Card (Desktop Overlay) */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-sm glass bg-white/90 dark:bg-slate-900/90 p-5 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-[1000]"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{selectedItem.name || selectedItem.title}</h3>
                  <p className="text-sm font-medium text-slate-500">{selectedItem.role || selectedItem.company}</p>
                </div>
                <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-full p-1"><X size={16}/></button>
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{selectedItem.bio || selectedItem.desc}</p>
              
              <button className={`w-full py-2.5 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-colors ${selectedItem.type === 'masters' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700'}`}>
                {selectedItem.type === 'masters' ? <><Phone size={16}/> İletişime Geç</> : <><ArrowRight size={16}/> Teklif Ver</>}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Needed icon
import { X } from 'lucide-react';