import React from 'react';
import { Thermometer, Sun, Cloud, CloudRain, Wind, History, Search } from 'lucide-react';

const Header = ({ unit, toggleUnit }) => {
    return (
        <header className="bg-gradient-to-r from-pink-500 to-red-600 text-white p-5">
            <div className="mx-auto mx-x-6xl flex justify-between items-center">
                <div className="flex item-center gap-3">
                    <Claude size={30} />
                    <h1 className="font-bold text-3xl">Weather Dashboard</h1>
                </div>
                <div className="flex item-center bg-white/20 gap-2 rounded-lg p-1">
                    <button onClick={toggleUnit}>
                        {unit === 'metric' ? 'F' : 'C' }
                    </button>
                </div>
            </div>
        </header>
    );
};