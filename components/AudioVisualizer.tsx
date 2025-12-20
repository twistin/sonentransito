/**
 * AudioVisualizer - A minimalist oscilloscope/glitch-style audio visualizer
 * 
 * Uses Web Audio API to analyze frequency data from any audio source.
 * Designed with a SuperCollider-inspired aesthetic: lines, dots, and glitch effects.
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';

type VisualizerMode = 'oscilloscope' | 'bars' | 'dots' | 'glitch';
type VisualizerPosition = 'corner' | 'header' | 'inline';

interface AudioVisualizerProps {
    /** Audio element ref to connect to */
    audioRef?: React.RefObject<HTMLAudioElement>;
    /** Visualization mode */
    mode?: VisualizerMode;
    /** Position preset */
    position?: VisualizerPosition;
    /** Width in pixels (ignored for header position) */
    width?: number;
    /** Height in pixels */
    height?: number;
    /** Primary color (CSS color string) */
    color?: string;
    /** Secondary color for accents */
    accentColor?: string;
    /** Show even when no audio is playing (shows idle animation) */
    showIdle?: boolean;
    /** Additional CSS classes */
    className?: string;
}

// Singleton for global audio context
let globalAudioContext: AudioContext | null = null;
const connectedElements = new WeakSet<HTMLAudioElement>();

const getAudioContext = (): AudioContext => {
    if (!globalAudioContext) {
        globalAudioContext = new AudioContext();
    }
    return globalAudioContext;
};

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
    audioRef,
    mode = 'oscilloscope',
    position = 'corner',
    width = 120,
    height = 40,
    color = '#ff5f1f',
    accentColor = '#a855f7',
    showIdle = true,
    className = '',
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationRef = useRef<number>(0);
    const [isActive, setIsActive] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const timeRef = useRef(0);

    // Connect to audio element
    const connectToAudio = useCallback((audioElement: HTMLAudioElement) => {
        if (connectedElements.has(audioElement)) {
            setIsConnected(true);
            return;
        }

        try {
            const ctx = getAudioContext();
            const source = ctx.createMediaElementSource(audioElement);
            const analyser = ctx.createAnalyser();

            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.7;

            source.connect(analyser);
            analyser.connect(ctx.destination);

            analyserRef.current = analyser;
            connectedElements.add(audioElement);
            setIsConnected(true);
        } catch (error) {
            console.warn('AudioVisualizer: Could not connect to audio element', error);
        }
    }, []);

    // Auto-detect audio elements on the page
    useEffect(() => {
        if (audioRef?.current) {
            connectToAudio(audioRef.current);
            return;
        }

        // Look for any audio element on the page
        const findAndConnectAudio = () => {
            const audioElements = document.querySelectorAll('audio');
            audioElements.forEach((audio) => {
                if (!connectedElements.has(audio)) {
                    audio.addEventListener('play', () => {
                        connectToAudio(audio);
                        setIsActive(true);
                    });
                    audio.addEventListener('pause', () => setIsActive(false));
                    audio.addEventListener('ended', () => setIsActive(false));
                }
            });
        };

        findAndConnectAudio();

        // Observe DOM for new audio elements
        const observer = new MutationObserver(findAndConnectAudio);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [audioRef, connectToAudio]);

    // Drawing functions
    const drawOscilloscope = useCallback((
        ctx: CanvasRenderingContext2D,
        dataArray: Uint8Array,
        w: number,
        h: number
    ) => {
        const bufferLength = dataArray.length;
        const sliceWidth = w / bufferLength;

        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();

        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * h) / 2;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            x += sliceWidth;
        }

        ctx.lineTo(w, h / 2);
        ctx.stroke();

        // Add glow effect
        ctx.shadowColor = color;
        ctx.shadowBlur = 4;
    }, [color]);

    const drawBars = useCallback((
        ctx: CanvasRenderingContext2D,
        dataArray: Uint8Array,
        w: number,
        h: number
    ) => {
        const bufferLength = Math.min(32, dataArray.length);
        const barWidth = w / bufferLength - 1;

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = (dataArray[i] / 255) * h;
            const x = i * (barWidth + 1);

            // Gradient from accent to primary
            const gradient = ctx.createLinearGradient(x, h, x, h - barHeight);
            gradient.addColorStop(0, accentColor);
            gradient.addColorStop(1, color);

            ctx.fillStyle = gradient;
            ctx.fillRect(x, h - barHeight, barWidth, barHeight);
        }
    }, [color, accentColor]);

    const drawDots = useCallback((
        ctx: CanvasRenderingContext2D,
        dataArray: Uint8Array,
        w: number,
        h: number
    ) => {
        const bufferLength = Math.min(24, dataArray.length);
        const spacing = w / bufferLength;

        for (let i = 0; i < bufferLength; i++) {
            const amplitude = dataArray[i] / 255;
            const radius = Math.max(1, amplitude * 4);
            const x = i * spacing + spacing / 2;
            const y = h / 2 + (amplitude - 0.5) * h * 0.8;

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = amplitude > 0.6 ? color : accentColor;
            ctx.fill();

            // Trail effect
            ctx.globalAlpha = 0.3;
            ctx.beginPath();
            ctx.arc(x, h / 2, 1, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }, [color, accentColor]);

    const drawGlitch = useCallback((
        ctx: CanvasRenderingContext2D,
        dataArray: Uint8Array,
        w: number,
        h: number,
        time: number
    ) => {
        const bufferLength = dataArray.length;
        const avgAmplitude = dataArray.reduce((a, b) => a + b, 0) / bufferLength / 255;

        // Horizontal scan lines
        const numLines = 8;
        for (let i = 0; i < numLines; i++) {
            const lineY = (i / numLines) * h;
            const offset = Math.sin(time * 0.01 + i) * avgAmplitude * 10;

            ctx.strokeStyle = i % 2 === 0 ? color : accentColor;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.3 + avgAmplitude * 0.7;

            ctx.beginPath();
            ctx.moveTo(offset, lineY);

            for (let x = 0; x < w; x += 4) {
                const dataIndex = Math.floor((x / w) * bufferLength);
                const amplitude = dataArray[dataIndex] / 255;
                const glitchOffset = amplitude > 0.7 ? (Math.random() - 0.5) * 6 : 0;
                ctx.lineTo(x + offset + glitchOffset, lineY + (amplitude - 0.5) * 4);
            }

            ctx.stroke();
        }

        // Random glitch rectangles when loud
        if (avgAmplitude > 0.6) {
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.15;
            const glitchX = Math.random() * w;
            const glitchW = Math.random() * 20 + 5;
            ctx.fillRect(glitchX, 0, glitchW, h);
        }

        ctx.globalAlpha = 1;
    }, [color, accentColor]);

    const drawIdle = useCallback((
        ctx: CanvasRenderingContext2D,
        w: number,
        h: number,
        time: number
    ) => {
        // Subtle breathing line when no audio
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.4;
        ctx.beginPath();

        for (let x = 0; x < w; x++) {
            const y = h / 2 + Math.sin((x * 0.05) + (time * 0.02)) * 3;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();

        // Pulsing center dot
        const pulse = 0.5 + Math.sin(time * 0.03) * 0.5;
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 2 + pulse * 2, 0, Math.PI * 2);
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = 0.3 + pulse * 0.4;
        ctx.fill();

        ctx.globalAlpha = 1;
    }, [color, accentColor]);

    // Animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const draw = () => {
            timeRef.current++;
            const w = canvas.width;
            const h = canvas.height;

            // Clear with slight fade for trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(0, 0, w, h);

            const analyser = analyserRef.current;

            if (analyser && isConnected) {
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                if (mode === 'oscilloscope') {
                    analyser.getByteTimeDomainData(dataArray);
                    drawOscilloscope(ctx, dataArray, w, h);
                } else {
                    analyser.getByteFrequencyData(dataArray);
                    switch (mode) {
                        case 'bars':
                            drawBars(ctx, dataArray, w, h);
                            break;
                        case 'dots':
                            drawDots(ctx, dataArray, w, h);
                            break;
                        case 'glitch':
                            drawGlitch(ctx, dataArray, w, h, timeRef.current);
                            break;
                    }
                }
            } else if (showIdle) {
                drawIdle(ctx, w, h, timeRef.current);
            }

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [mode, isConnected, showIdle, drawOscilloscope, drawBars, drawDots, drawGlitch, drawIdle]);

    // Position styles
    const positionStyles: Record<VisualizerPosition, string> = {
        corner: 'fixed bottom-4 right-4 z-40 rounded-md overflow-hidden shadow-lg',
        header: 'w-full',
        inline: 'rounded-md overflow-hidden',
    };

    const actualWidth = position === 'header' ? '100%' : width;
    const borderColor = isActive ? color : 'rgba(255,255,255,0.1)';

    return (
        <div
            className={`${positionStyles[position]} ${className}`}
            style={{
                width: actualWidth,
                border: `1px solid ${borderColor}`,
                background: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(4px)',
                transition: 'border-color 0.3s ease',
            }}
            title={isActive ? 'Audio reproduciéndose' : 'Esperando audio...'}
        >
            <canvas
                ref={canvasRef}
                width={position === 'header' ? 400 : width}
                height={height}
                style={{
                    width: '100%',
                    height: height,
                    display: 'block',
                }}
            />
        </div>
    );
};

export default AudioVisualizer;
