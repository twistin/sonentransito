import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Vigo Master Node - Laboratorio de Identidad Sonora
const VIGO_CENTER: [number, number] = [42.2406, -8.7207];

// Custom Icons
const masterIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
    background: linear-gradient(135deg, #00ffc8 0%, #a855f7 100%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(0, 255, 200, 0.5);
    animation: pulse 2s infinite;
  ">
    <span style="font-size: 18px;">🧠</span>
  </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

const nodeIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
    background: #ff5f1f;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 0 10px rgba(255, 95, 31, 0.5);
  "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
});

// Recording Nodes Data
interface RecordingNode {
    id: string;
    name: string;
    coordinates: [number, number];
    audioUrl: string;
    description: string;
    date: string;
}

const recordingNodes: RecordingNode[] = [
    {
        id: 'madrid',
        name: 'Madrid',
        coordinates: [40.4168, -3.7038],
        audioUrl: '/assets/audio/salidas/2024-10-costa-da-vela/paisaje.mp3',
        description: 'Capturas sonoras del centro urbano madrileño',
        date: '2024-03-15',
    },
    {
        id: 'barcelona',
        name: 'Barcelona',
        coordinates: [41.3851, 2.1734],
        audioUrl: '/assets/audio/salidas/2024-10-costa-da-vela/paisaje.mp3',
        description: 'Paisajes sonoros del Mediterráneo catalán',
        date: '2024-05-22',
    },
    {
        id: 'sevilla',
        name: 'Sevilla',
        coordinates: [37.3891, -5.9845],
        audioUrl: '/assets/audio/salidas/2024-10-costa-da-vela/paisaje.mp3',
        description: 'Ritmos y ambientes del sur andaluz',
        date: '2024-07-10',
    },
    {
        id: 'bilbao',
        name: 'Bilbao',
        coordinates: [43.263, -2.935],
        audioUrl: '/assets/audio/salidas/2024-10-costa-da-vela/paisaje.mp3',
        description: 'Texturas industriales del País Vasco',
        date: '2024-09-05',
    },
    {
        id: 'costa-da-vela',
        name: 'Costa da Vela',
        coordinates: [42.2561, -8.8736],
        audioUrl: '/assets/audio/salidas/2024-10-costa-da-vela/paisaje.mp3',
        description: 'Capturas binaurales del litoral atlántico',
        date: '2024-10-28',
    },
];

// FlyTo Component
const FlyToLocation: React.FC<{ position: [number, number] | null }> = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.flyTo(position, 8, { duration: 1.5 });
        }
    }, [map, position]);

    return null;
};

// Map Resizer - fixes the half-loaded tiles issue
const MapResizer: React.FC = () => {
    const map = useMap();

    useEffect(() => {
        // Force map to recalculate size after render
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 100);

        // Also handle window resize
        const handleResize = () => map.invalidateSize();
        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, [map]);

    return null;
};

// Analysis Panel Component
interface AnalysisPanelProps {
    node: RecordingNode | null;
    onClose: () => void;
    isProcessing: boolean;
    analysisResults: AnalysisResults | null;
}

interface AnalysisResults {
    melodic: number;
    rhythmic: number;
    timbral: number;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ node, onClose, isProcessing, analysisResults }) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    if (!node) return null;

    return (
        <div className="absolute top-4 right-4 w-80 bg-black/90 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl z-[1000] overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-black uppercase tracking-wider text-white">{node.name}</h3>
                    <p className="text-[10px] text-white/50 uppercase tracking-wider">{node.date}</p>
                </div>
                <button
                    onClick={onClose}
                    className="text-white/50 hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                <p className="text-sm text-white/70">{node.description}</p>

                {/* Audio Player */}
                <div className="bg-white/5 rounded-lg p-3">
                    <audio
                        ref={audioRef}
                        controls
                        className="w-full h-10"
                        src={node.audioUrl}
                    />
                </div>

                {/* Processing Indicator */}
                {isProcessing && (
                    <div className="flex items-center gap-3 py-3">
                        <div className="relative">
                            <div className="w-8 h-8 border-2 border-neonGreen/30 rounded-full animate-ping absolute"></div>
                            <div className="w-8 h-8 border-2 border-t-neonGreen border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                        </div>
                        <div>
                            <p className="text-neonGreen text-sm font-bold">Procesando en Vigo...</p>
                            <p className="text-white/40 text-[10px]">Análisis de identidad sonora</p>
                        </div>
                    </div>
                )}

                {/* Analysis Results */}
                {analysisResults && !isProcessing && (
                    <div className="space-y-3">
                        <p className="text-[10px] text-white/50 uppercase tracking-widest">Análisis IA</p>

                        {/* Melodic */}
                        <div>
                            <div className="flex justify-between text-[11px] mb-1">
                                <span className="text-white/70">Similitud Melódica</span>
                                <span className="text-neonGreen font-bold">{analysisResults.melodic}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-neonGreen to-cyan-400 transition-all duration-1000"
                                    style={{ width: `${analysisResults.melodic}%` }}
                                />
                            </div>
                        </div>

                        {/* Rhythmic */}
                        <div>
                            <div className="flex justify-between text-[11px] mb-1">
                                <span className="text-white/70">Similitud Rítmica</span>
                                <span className="text-neonOrange font-bold">{analysisResults.rhythmic}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-neonOrange to-yellow-400 transition-all duration-1000"
                                    style={{ width: `${analysisResults.rhythmic}%` }}
                                />
                            </div>
                        </div>

                        {/* Timbral */}
                        <div>
                            <div className="flex justify-between text-[11px] mb-1">
                                <span className="text-white/70">Similitud Tímbrica</span>
                                <span className="text-neonPink font-bold">{analysisResults.timbral}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-neonPink to-purple-400 transition-all duration-1000"
                                    style={{ width: `${analysisResults.timbral}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-white/5 border-t border-white/5">
                <div className="flex items-center gap-2 text-[10px] text-white/40">
                    <span className="w-2 h-2 bg-neonGreen rounded-full animate-pulse"></span>
                    <span>Conectado a Laboratorio Vigo</span>
                </div>
            </div>
        </div>
    );
};

// Main Map Component
const VigoAnalysisMap: React.FC = () => {
    const [selectedNode, setSelectedNode] = useState<RecordingNode | null>(null);
    const [flyToPosition, setFlyToPosition] = useState<[number, number] | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);

    const handleNodeClick = (node: RecordingNode) => {
        setSelectedNode(node);
        setFlyToPosition(node.coordinates);
        setAnalysisResults(null);

        // Simulate IA processing
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setAnalysisResults({
                melodic: Math.floor(Math.random() * 30) + 60,
                rhythmic: Math.floor(Math.random() * 40) + 50,
                timbral: Math.floor(Math.random() * 35) + 55,
            });
        }, 2500);
    };

    const handleClose = () => {
        setSelectedNode(null);
        setFlyToPosition(VIGO_CENTER);
        setAnalysisResults(null);
    };

    return (
        <div className="relative w-full h-[600px] rounded-lg overflow-hidden border border-white/10">
            {/* CSS for animations */}
            <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        .leaflet-container {
          background: #1a1a2e;
          font-family: inherit;
        }
      `}</style>

            <MapContainer
                center={VIGO_CENTER}
                zoom={6}
                className="w-full h-full"
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                <MapResizer />
                <FlyToLocation position={flyToPosition} />

                {/* Master Node - Vigo */}
                <Marker position={VIGO_CENTER} icon={masterIcon}>
                    <Popup className="custom-popup">
                        <div className="text-center">
                            <p className="font-black text-sm">🧠 LABORATORIO DE IDENTIDAD SONORA</p>
                            <p className="text-xs text-gray-500">Vigo, Galicia</p>
                        </div>
                    </Popup>
                </Marker>

                {/* Recording Nodes */}
                {recordingNodes.map((node) => (
                    <React.Fragment key={node.id}>
                        {/* Connection Line */}
                        <Polyline
                            positions={[node.coordinates, VIGO_CENTER]}
                            pathOptions={{
                                color: selectedNode?.id === node.id ? '#00ffc8' : '#ff5f1f',
                                weight: selectedNode?.id === node.id ? 3 : 1,
                                opacity: selectedNode?.id === node.id ? 1 : 0.4,
                                dashArray: selectedNode?.id === node.id ? undefined : '5, 10',
                            }}
                        />

                        {/* Node Marker */}
                        <Marker
                            position={node.coordinates}
                            icon={nodeIcon}
                            eventHandlers={{
                                click: () => handleNodeClick(node),
                            }}
                        >
                            <Popup>
                                <div className="text-center">
                                    <p className="font-bold">{node.name}</p>
                                    <p className="text-xs">{node.description}</p>
                                </div>
                            </Popup>
                        </Marker>
                    </React.Fragment>
                ))}
            </MapContainer>

            {/* Analysis Panel */}
            <AnalysisPanel
                node={selectedNode}
                onClose={handleClose}
                isProcessing={isProcessing}
                analysisResults={analysisResults}
            />

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 z-[1000]">
                <p className="text-[9px] text-white/50 uppercase tracking-widest mb-2">Leyenda</p>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-gradient-to-r from-neonGreen to-purple-500"></span>
                        <span className="text-[10px] text-white/70">Laboratorio Central</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-neonOrange"></span>
                        <span className="text-[10px] text-white/70">Punto de Grabación</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-[2px] bg-neonGreen"></span>
                        <span className="text-[10px] text-white/70">Flujo de Datos Activo</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VigoAnalysisMap;
