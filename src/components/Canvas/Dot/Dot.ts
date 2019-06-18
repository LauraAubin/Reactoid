import { PURPLE, YELLOW } from '../../../globalStyles/colors';

export default function Dot({
  canvasContext,
  x,
  y,
  size = 5,
  glowSize = 30,
  color = YELLOW,
  backgroundColor = PURPLE
}: {
  canvasContext: any;
  x: number;
  y: number;
  size?: number;
  glowSize?: number;
  color?: string;
  backgroundColor?: string;
}) {
  const gradient = canvasContext.createRadialGradient(
    x,
    y,
    size,
    x,
    y,
    glowSize
  );

  gradient.addColorStop(0, color);
  gradient.addColorStop(1, backgroundColor);

  canvasContext.fillStyle = gradient;
  canvasContext.fillRect(
    x - glowSize,
    y - glowSize,
    glowSize * 2,
    glowSize * 2
  );
}
