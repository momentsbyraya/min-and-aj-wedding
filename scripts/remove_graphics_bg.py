from pathlib import Path
from rembg import remove
from PIL import Image

graphics = Path(__file__).resolve().parents[1] / 'assets' / 'images' / 'graphics'

# Full-bleed BGs — keep as-is
skip = {
    'hero-bg.png', 'palace.png', 'palace-1.png', 'palace-3.png', 'palace-4.png', 'palace-6.png',
    'abstract-bg.png', 'bg-2.png', 'bg-3.png', 'bg-textured.png', 'butterflies-bg.png',
    'rose-gold-pupr-bg.png',
    'entourage-1.png', 'entourage-2.png', 'entourage-3.png', 'entourage-4.png',
}

targets = sorted(
    p for p in graphics.glob('*.png')
    if p.name not in skip
)

print(f'Processing {len(targets)} images...')
for i, path in enumerate(targets, 1):
    try:
        img = Image.open(path).convert('RGBA')
        out = remove(img)
        out.save(path, 'PNG')
        print(f'[{i}/{len(targets)}] OK {path.name}')
    except Exception as e:
        print(f'[{i}/{len(targets)}] FAIL {path.name}: {e}')

print('Done')
