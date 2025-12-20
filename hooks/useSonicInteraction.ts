/**
 * useSonicInteraction - Hook for synthesized micro-sound interactions
 * 
 * Uses Web Audio API to generate real-time synthesized glitch/blip sounds
 * inspired by SuperCollider aesthetics. No samples needed.
 */

type SoundType = 'blip' | 'glitch' | 'click' | 'sweep';

interface SonicOptions {
    type?: SoundType;
    volume?: number; // 0-1
    pitch?: number;  // frequency multiplier (0.5-2)
}

// Singleton AudioContext to avoid creating multiple instances
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
    if (!audioContext) {
        audioContext = new AudioContext();
    }
    // Resume if suspended (browsers require user interaction first)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    return audioContext;
};

/**
 * Generates a quick blip sound - a short sine tone with fast envelope
 */
const playBlip = (ctx: AudioContext, volume: number, pitch: number) => {
    const now = ctx.currentTime;
    const duration = 0.08;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880 * pitch, now);
    osc.frequency.exponentialRampToValueAtTime(440 * pitch, now + duration);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume * 0.15, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
};

/**
 * Generates a glitch sound - layered noise burst with frequency modulation
 */
const playGlitch = (ctx: AudioContext, volume: number, pitch: number) => {
    const now = ctx.currentTime;
    const duration = 0.12;

    // Noise burst with bandpass filter
    const bufferSize = ctx.sampleRate * duration;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        noiseData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2000 * pitch, now);
    filter.Q.value = 5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume * 0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + duration);

    // Add a quick pitch oscillator for texture
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(1200 * pitch, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);

    oscGain.gain.setValueAtTime(volume * 0.05, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
};

/**
 * Generates a soft click sound - percussive impulse
 */
const playClick = (ctx: AudioContext, volume: number, pitch: number) => {
    const now = ctx.currentTime;
    const duration = 0.04;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600 * pitch, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + duration);

    gain.gain.setValueAtTime(volume * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
};

/**
 * Generates a sweep sound - rising/falling frequency sweep
 */
const playSweep = (ctx: AudioContext, volume: number, pitch: number) => {
    const now = ctx.currentTime;
    const duration = 0.15;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200 * pitch, now);
    osc.frequency.exponentialRampToValueAtTime(1200 * pitch, now + duration * 0.7);
    osc.frequency.exponentialRampToValueAtTime(400 * pitch, now + duration);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume * 0.08, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
};

/**
 * Main function to trigger a synthesized sound
 */
export const triggerSound = (options: SonicOptions = {}) => {
    const { type = 'blip', volume = 0.5, pitch = 1 } = options;

    try {
        const ctx = getAudioContext();

        switch (type) {
            case 'blip':
                playBlip(ctx, volume, pitch);
                break;
            case 'glitch':
                playGlitch(ctx, volume, pitch);
                break;
            case 'click':
                playClick(ctx, volume, pitch);
                break;
            case 'sweep':
                playSweep(ctx, volume, pitch);
                break;
        }
    } catch (error) {
        // Silently fail if Web Audio API is not supported
        console.warn('Web Audio API not available:', error);
    }
};

/**
 * React hook for sonic hover interactions
 * Returns event handlers to attach to elements
 */
export const useSonicHover = (options: SonicOptions = {}) => {
    const handleMouseEnter = () => {
        triggerSound(options);
    };

    return {
        onMouseEnter: handleMouseEnter,
    };
};

/**
 * Creates props for sonic interaction on any element
 * Usage: <button {...sonicProps('glitch')} />
 */
export const sonicProps = (
    type: SoundType = 'blip',
    volume: number = 0.4,
    pitch?: number
) => ({
    onMouseEnter: () => triggerSound({
        type,
        volume,
        pitch: pitch ?? (0.8 + Math.random() * 0.4) // Slight random variation
    }),
});

/**
 * Preset configurations for different UI elements
 */
export const SonicPresets = {
    menuItem: () => sonicProps('blip', 0.3, 1.2),
    button: () => sonicProps('click', 0.4),
    card: () => sonicProps('glitch', 0.25),
    link: () => sonicProps('blip', 0.2, 1.5),
    projectTile: () => sonicProps('sweep', 0.3),
} as const;

export default useSonicHover;
