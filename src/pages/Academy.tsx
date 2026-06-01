import { useState } from 'react';
import { Play, Award, CheckCircle, Lock, BookOpen } from 'lucide-react';

export default function Academy() {
  const [activeTab, setActiveTab] = useState('courses');

  const courses = [
    { id: 1, title: 'İleri Seviye Akıllı Ev Sistemleri', category: 'Elektrik', duration: '4 Saat', level: 'İleri', progress: 45, image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=80' },
    { id: 2, title: 'Yeni Nesil Isı Pompası Kurulumu', category: 'Tesisat', duration: '6 Saat', level: 'Orta', progress: 0, image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400&q=80' },
    { id: 3, title: 'İş Güvenliği ve Şantiye Kuralları', category: 'Genel', duration: '2 Saat', level: 'Başlangıç', progress: 100, image: 'https://images.unsplash.com/photo-1504307651254-35680f356f58?w=400&q=80' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Ustabaşı Akademi</h1>
          <p className="text-slate-500 mt-1">Kendini geliştir, sertifikaları topla ve sıralamada yüksel.</p>
        </div>
        <div className="flex items-center gap-2 glass-panel px-4 py-2">
          <Award className="text-amber-500" />
          <span className="font-bold">Seviye 4 Usta</span>
          <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full ml-2 overflow-hidden">
            <div className="h-full bg-amber-500 w-[60%]"></div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700/50 pb-2">
        <button onClick={() => setActiveTab('courses')} className={`pb-2 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'courses' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}>Eğitimler</button>
        <button onClick={() => setActiveTab('certificates')} className={`pb-2 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'certificates' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}>Sertifikalarım</button>
        <button onClick={() => setActiveTab('exams')} className={`pb-2 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'exams' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'}`}>Sınavlar</button>
      </div>

      {activeTab === 'courses' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="glass rounded-2xl overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform">
              <div className="relative h-48">
                <img src={course.image} className="w-full h-full object-cover" alt={course.title} />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Play fill="currentColor" size={24} />
                  </div>
                </div>
                <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-medium">
                  {course.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold mb-2 line-clamp-2">{course.title}</h3>
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><BookOpen size={14} /> {course.duration}</span>
                  <span>•</span>
                  <span>{course.level}</span>
                </div>
                
                {course.progress > 0 ? (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-blue-600">% {course.progress} Tamamlandı</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                ) : (
                  <button className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 font-medium rounded-xl text-sm transition-colors">
                    Eğitime Başla
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'certificates' && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="glass p-6 rounded-2xl flex items-center gap-4 border-l-4 border-amber-500">
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
              <Award size={32} />
            </div>
            <div>
              <h3 className="font-bold">İş Güvenliği Sertifikası</h3>
              <p className="text-sm text-slate-500">Geçerlilik: 2026'ya kadar</p>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1 font-medium">
                <CheckCircle size={14} /> Doğrulanmış
              </div>
            </div>
          </div>
          <div className="glass p-6 rounded-2xl flex items-center gap-4 opacity-60 grayscale">
            <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
              <Lock size={32} />
            </div>
            <div>
              <h3 className="font-bold">İleri Seviye Elektrik</h3>
              <p className="text-sm text-slate-500">Eğitimi tamamla ve kilidi aç</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}