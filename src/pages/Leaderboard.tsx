import { Trophy, Medal, Star, TrendingUp } from 'lucide-react';

export default function Leaderboard() {
  const leaders = [
    { rank: 1, name: 'Ahmet Yılmaz', role: 'Elektrik Ustası', points: 15420, rating: 4.9, avatar: 'https://ui-avatars.com/api/?name=Ahmet+Yilmaz&background=random' },
    { rank: 2, name: 'Mehmet Demir', role: 'Sıhhi Tesisat', points: 14200, rating: 4.8, avatar: 'https://ui-avatars.com/api/?name=Mehmet+Demir&background=random' },
    { rank: 3, name: 'Can İnşaat', role: 'Firma', points: 12850, rating: 4.9, avatar: 'https://ui-avatars.com/api/?name=Can+Insaat&background=random' },
    { rank: 4, name: 'Ayşe Kaya', role: 'İç Mimar', points: 11500, rating: 5.0, avatar: 'https://ui-avatars.com/api/?name=Ayse+Kaya&background=random' },
    { rank: 5, name: 'Veli Usta', role: 'Boya & Badana', points: 9800, rating: 4.7, avatar: 'https://ui-avatars.com/api/?name=Veli+Usta&background=random' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2 mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-600 text-white shadow-lg mb-2">
          <Trophy size={32} />
        </div>
        <h1 className="text-3xl font-bold">Liderlik Tablosu</h1>
        <p className="text-slate-500">Platformun en iyi ustaları ve firmaları</p>
      </div>

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end gap-2 md:gap-6 mb-12 h-64">
        {/* 2nd Place */}
        <div className="flex flex-col items-center w-28 md:w-32">
          <img src={leaders[1].avatar} className="w-16 h-16 rounded-full border-4 border-slate-300 mb-2 z-10" />
          <div className="w-full h-32 bg-gradient-to-t from-slate-300 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-t-xl flex flex-col items-center pt-4 relative shadow-lg">
            <span className="text-2xl font-bold text-slate-500">2</span>
            <span className="text-xs font-bold mt-auto pb-4">{leaders[1].points} P</span>
          </div>
        </div>
        
        {/* 1st Place */}
        <div className="flex flex-col items-center w-32 md:w-40">
          <div className="relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-500">
              <Medal size={32} fill="currentColor" />
            </div>
            <img src={leaders[0].avatar} className="w-20 h-20 rounded-full border-4 border-yellow-400 mb-2 z-10 relative" />
          </div>
          <div className="w-full h-40 bg-gradient-to-t from-yellow-400 to-yellow-200 dark:from-yellow-600 dark:to-yellow-500 rounded-t-xl flex flex-col items-center pt-4 relative shadow-xl">
            <span className="text-3xl font-bold text-yellow-700 dark:text-yellow-100">1</span>
            <span className="text-sm font-bold mt-auto pb-4 text-yellow-900 dark:text-yellow-50">{leaders[0].points} P</span>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center w-28 md:w-32">
          <img src={leaders[2].avatar} className="w-16 h-16 rounded-full border-4 border-amber-600 mb-2 z-10" />
          <div className="w-full h-24 bg-gradient-to-t from-amber-700 to-amber-500 rounded-t-xl flex flex-col items-center pt-4 relative shadow-lg text-white">
            <span className="text-2xl font-bold">3</span>
            <span className="text-xs font-bold mt-auto pb-4">{leaders[2].points} P</span>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="glass rounded-3xl overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700/50 bg-white/40 dark:bg-slate-900/40 flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span className="w-12 text-center">Sıra</span>
          <span className="flex-1">Kullanıcı</span>
          <span className="w-24 text-center hidden md:block">Puan</span>
          <span className="w-24 text-center">Değerlendirme</span>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-700/50">
          {leaders.map((leader, i) => (
            <div key={i} className="p-4 flex items-center hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors">
              <span className="w-12 text-center font-bold text-lg text-slate-400">{leader.rank}</span>
              <div className="flex-1 flex items-center gap-3">
                <img src={leader.avatar} className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="font-bold text-sm">{leader.name}</h4>
                  <p className="text-xs text-slate-500">{leader.role}</p>
                </div>
              </div>
              <div className="w-24 text-center hidden md:flex items-center justify-center gap-1 font-bold text-sm text-blue-600">
                <TrendingUp size={14} /> {leader.points}
              </div>
              <div className="w-24 flex items-center justify-center gap-1 font-bold text-sm">
                <Star size={14} className="text-amber-500" fill="currentColor" /> {leader.rating}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}