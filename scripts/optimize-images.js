import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const assetsDir = path.join(root, "client", "src", "assets");
const exts = new Set([".jpg", ".jpeg", ".png"]);

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(fullPath);
      return fullPath;
    })
  );
  return files.flat();
};

const optimizeImage = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if (!exts.has(ext)) return;

  const base = filePath.slice(0, -ext.length);
  const avifPath = `${base}.avif`;
  const webpPath = `${base}.webp`;

  const srcStat = await fs.stat(filePath);
  const shouldSkip = async (outPath) => {
    try {
      const outStat = await fs.stat(outPath);
      return outStat.mtimeMs >= srcStat.mtimeMs;
    } catch {
      return false;
    }
  };

  const image = sharp(filePath, { failOn: "none" }).resize({
    width: 1600,
    withoutEnlargement: true,
  });

  if (!(await shouldSkip(avifPath))) {
    await image.clone().avif({ quality: 50 }).toFile(avifPath);
  }

  if (!(await shouldSkip(webpPath))) {
    await image.clone().webp({ quality: 75 }).toFile(webpPath);
  }
};

const run = async () => {
  const files = await walk(assetsDir);
  const targets = files.filter((file) => exts.has(path.extname(file).toLowerCase()));

  if (targets.length === 0) {
    console.log("No images found to optimize.");
    return;
  }

  for (const file of targets) {
    await optimizeImage(file);
    console.log(`Optimized: ${path.relative(root, file)}`);
  }
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
