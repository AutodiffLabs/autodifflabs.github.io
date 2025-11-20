const fs = require("fs");
const path = require("path");

const dist = path.join(__dirname, "home", "dist");
const target = __dirname;

// sanity check
if (!fs.existsSync(dist)) {
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