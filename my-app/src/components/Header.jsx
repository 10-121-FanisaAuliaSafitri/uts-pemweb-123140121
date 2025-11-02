import React from 'react';

function Header() {
  return (
    <header className="text-center my-6">
      <h1 className="text-4xl font-bold text-white">
        {/* PERUBAHAN: dari text-green-700 menjadi text-white */}
        Dashboard Cuaca
      </h1>
      <p className="text-lg text-white/70">
        {/* PERUBAHAN: dari text-gray-600 menjadi text-white/70 */}
        UTS Pengembangan Aplikasi Web - NIM_ANDA
      </p>
    </header>
  );
}

export default Header;