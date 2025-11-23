const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "app", "dist");
const target = root;

// sanity check
if (!fs.existsSync(dist)) {
  console.log({target},{dist})
  console.error("❌ dist folder not found.");
  process.exit(1);
}

const exclude = new Set([".git", ".github", "home", "move-build.js"]);

for (const file of fs.readdirSync(dist)) {
  const src = path.join(dist, file);
  const dest = path.join(target, file);

  if (exclude.has(file)) continue;

  // remove old version if exists
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }

  fs.renameSync(src, dest);
}

console.log("✅ Build files moved to repo root.");