import React from 'react';
import { Cloud } from 'lucide-react';

const Header = ({ unit, onToggleUnit }) => {
    return (
        <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 shadow-lg">
            <div className="max-w-6vl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Cloud size={32} />
                    <h1 className="text-3xl font-bold">Weather Dashboard</h1>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-lg p-1">
                <button 
                    onClick={() => onToggleUnit('C')}
                    className={`px-4 py-2 rounded-md transition-all ${ unit === 'C' ? 'bg-white text-blue-600 font-semibold' : 'text-white'}`}
                    >
                        °C
                </button>
                <button
                    onClick={() => onToggleUnit('F')}
                    className={`px-4 py-2 rounded-md transition-all ${ unit === 'F' ? 'bg-white text-blue-600 font-semibold' : 'text-white'}`}
                    >
                        °F
                </button>
                </div>
            </div>
        </header>
    );
};

export default Header;