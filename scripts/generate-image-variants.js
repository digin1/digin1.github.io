const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const matter = require('gray-matter');
// Next.js supplies Sharp; use its installed dependency without another image stack.
const sharp = require(require.resolve('sharp', { paths: [require.resolve('next/package.json')] }));

const root = path.join(__dirname, '..');
const output = path.join(root, 'public/images/generated');
const manifestFile = path.join(root, 'lib/generated-images.json');
const pipeline = 'webp-v1-quality82';

async function main() {
  fs.mkdirSync(output, { recursive: true });
  const sources = new Set();
  for (const folder of ['projects', 'blog', 'hero', 'about']) {
    const directory = path.join(root, 'content', folder);
    for (const name of fs.readdirSync(directory).filter((name) => name.endsWith('.md'))) {
      const { data } = matter(fs.readFileSync(path.join(directory, name), 'utf8'));
      for (const source of [data.image, data.profileImage]) {
        if (typeof source === 'string' && /^\/images\/[^?#]+\.(png|jpe?g|webp)$/i.test(source))
          sources.add(source);
      }
    }
  }
  const manifest = {};
  // Run one source at a time so development startup does not saturate the host.
  for (const source of [...sources].sort()) {
    const filename = path.resolve(root, 'public', source.slice(1));
    if (!filename.startsWith(path.join(root, 'public/images') + path.sep))
      throw new Error(`Invalid image path: ${source}`);
    const input = fs.readFileSync(filename);
    const info = await sharp(input).metadata();
    const rotated = info.orientation >= 5;
    const width = rotated ? info.height : info.width;
    const height = rotated ? info.width : info.height;
    if (!width || !height) throw new Error(`Missing dimensions: ${source}`);
    const desired = source === '/images/digin.png' ? [96, 192, 400] : [640, 960, 1440];
    const widths = [...new Set(desired.map((size) => Math.min(size, width)))].sort((a, b) => a - b);
    const hash = crypto
      .createHash('sha256')
      .update(input)
      .update(pipeline)
      .digest('hex')
      .slice(0, 12);
    const basename = path
      .parse(source)
      .name.toLowerCase()
      .replace(/[^a-z0-9-]/g, '-');
    const variants = [];
    for (const size of widths) {
      const name = `${basename}-${hash}-${size}.webp`;
      const target = path.join(output, name);
      if (!fs.existsSync(target)) {
        await sharp(input)
          .rotate()
          .resize({ width: size, withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(target);
      }
      variants.push({ width: size, src: `/images/generated/${name}` });
    }
    manifest[source] = { width, height, variants };
  }
  fs.writeFileSync(manifestFile, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Prepared responsive WebP variants for ${sources.size} portfolio images`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
