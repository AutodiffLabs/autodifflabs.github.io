const fs = require("fs-extra");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

// Root folder
const root = process.cwd();

// Folders to process
const folders = ["docs", "projects"];

// Recursive function to get all markdown files
function walkDir(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else if (file.endsWith(".md")) {
      results.push(fullPath);
    }
  });
  return results;
}

// Process all markdown files
folders.forEach(folder => {
  const folderPath = path.join(root, folder);
  if (!fs.existsSync(folderPath)) return;

  const mdFiles = walkDir(folderPath);

  mdFiles.forEach(filePath => {
    const mdContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(mdContent);

    const title = data.title || 'Document';
  const image = data.image ? `<img src="${data.image}" alt="${title}" style="max-width:100%;margin-bottom:1rem;">` : '';
  const htmlBody = marked.parse(content);

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <style>
      body { font-family: Arial, sans-serif; max-width: 800px; margin: auto; padding: 2rem; }
      pre { background: #f4f4f4; padding: 1rem; overflow-x: auto; }
      code { background: #eee; padding: 0.2rem 0.4rem; border-radius: 3px; }
      h1,h2,h3 { color: #333; }
      img { max-width: 100%; display: block; margin-bottom: 1rem; }
    </style>
  </head>
  <body>
    <h1>${title}</h1>
    ${image}
    ${htmlBody}
  </body>
  </html>
  `;

    const htmlFilePath = filePath.replace(/\.md$/, ".html");
    fs.writeFileSync(htmlFilePath, htmlContent);
    console.log("Generated HTML:", htmlFilePath);
  });
});