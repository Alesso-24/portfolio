import sharp from 'sharp';

const WIDTH = 1200;
const HEIGHT = 630;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#F7F5F0" />
  <circle cx="1080" cy="80" r="260" fill="#D95D39" opacity="0.06" />
  <circle cx="60" cy="600" r="200" fill="#A8441C" opacity="0.05" />

  <text x="80" y="120" font-family="Georgia, 'Times New Roman', serif" font-size="22" letter-spacing="5" fill="#D95D39" font-weight="bold">ALESSANDRO REYES</text>

  <text x="80" y="230" font-family="Georgia, 'Times New Roman', serif" font-size="64" fill="#0F172A" font-weight="bold">Mechatronics Engineer</text>
  <text x="80" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="64" fill="#0F172A" font-weight="bold">Embedded AI &amp; Robotics</text>

  <text x="80" y="360" font-family="Arial, sans-serif" font-size="24" fill="#0F172A" opacity="0.7">Building AI that survives contact with real hardware.</text>

  <line x1="80" y1="410" x2="1120" y2="410" stroke="#0F172A" stroke-opacity="0.1" stroke-width="1" />

  <text x="80" y="480" font-family="Georgia, serif" font-size="44" fill="#0F172A" font-weight="bold">126&#215;</text>
  <text x="80" y="510" font-family="Arial, sans-serif" font-size="14" letter-spacing="1" fill="#0F172A" opacity="0.6">FASTER ON REAL ESP32 HARDWARE</text>

  <text x="420" y="480" font-family="Georgia, serif" font-size="44" fill="#0F172A" font-weight="bold">99.85%</text>
  <text x="420" y="510" font-family="Arial, sans-serif" font-size="14" letter-spacing="1" fill="#0F172A" opacity="0.6">ACCURACY, ZERO FALSE POSITIVES</text>

  <text x="800" y="480" font-family="Georgia, serif" font-size="44" fill="#0F172A" font-weight="bold">98.4%</text>
  <text x="800" y="510" font-family="Arial, sans-serif" font-size="14" letter-spacing="1" fill="#0F172A" opacity="0.6">LESS ENERGY THAN THE CLOUD</text>

  <text x="80" y="580" font-family="Arial, sans-serif" font-size="16" letter-spacing="1" fill="#D95D39" font-weight="bold">2&#215; IEEE AUTHOR  ·  LARC 2025  ·  OPEN TO SUMMER 2026 INTERNSHIPS</text>
</svg>
`;

await sharp(Buffer.from(svg)).png().toFile('public/og-image.png');
console.log('OG image generated at public/og-image.png');
