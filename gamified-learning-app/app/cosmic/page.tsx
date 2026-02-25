"use client";
import React, { useState } from 'react';
import VRBackground from '@/components/game/VRBackground';

export default function CosmicDemo() {
  const [style, setStyle] = useState<'full' | 'minimal' | 'performance'>('full');
  const [showControls, setShowControls] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Cosmic VR Background */}
      <VRBackground style={style} />
      
      {/* Control Panel */}
      {showControls && (
        <div className="fixed top-4 left-4 z-30 bg-black/50 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <h2 className="text-lg font-bold text-cyan-400 mb-4">🌌 Cosmic VR Controls</h2>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-white/60 uppercase tracking-wider">Style Mode</label>
              <div className="flex gap-2 mt-1">
                {(['full', 'minimal', 'performance'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setStyle(mode)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      style === mode
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="text-xs text-white/40">
              <p>🎮 <span className="text-cyan-400">Click + Drag</span> to rotate</p>
              <p>🔍 <span className="text-cyan-400">Scroll</span> to zoom</p>
              <p>🥽 <span className="text-pink-400">VR Headset</span> supported</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Toggle Controls Button */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="fixed top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        {showControls ? '✕' : '⚙️'}
      </button>
      
      {/* Title Overlay */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          COSMIC VR
        </h1>
        <p className="text-white/60 text-sm md:text-base">
          Immersive Sci-Fi Anime Landscape
        </p>
      </div>
      
      {/* Feature List */}
      <div className="fixed bottom-4 right-4 z-20 text-right text-xs text-white/30 pointer-events-none">
        <p>✨ Giant planet with atmospheric shader</p>
        <p>🌟 Stars, galaxies & meteor shower</p>
        <p>🏔️ Mountain silhouettes</p>
        <p>🌃 Neon city with holographic displays</p>
        <p>🎨 Bloom, chromatic aberration & vignette</p>
      </div>
    </div>
  );
}