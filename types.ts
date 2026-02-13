
export enum AppPhase {
  INITIAL = 'INITIAL',
  TRANSFORMING = 'TRANSFORMING',
  REVEALED = 'REVEALED'
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  type: 'star' | 'heart' | 'sparkle';
  targetX?: number;
  targetY?: number;
}
