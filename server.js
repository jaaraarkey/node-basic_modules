const fs = require("fs").promises;
const path = require("path");
const os = require("os");

// Function to generate random background color
let getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const createFolder = async (folderPath) => {
  await fs.mkdir(folderPath);
};
const createFile = async (filePath, content) => {
  await fs.writeFile(filePath, content);
};

const createWebsite = async () => {
  try {
    const clientFolderPath = path.join(__dirname, "client");
    await createFolder(clientFolderPath);

    const rootBackgroundColor = getRandomColor();
    const rootHTMLContent = `
<html>
<head>
    <title>Home</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <h1>Home</h1>
</body>
</html>`;
    const rootCSSContent = `body {
    background-color: ${rootBackgroundColor};
}`;
    await createFile(
      path.join(clientFolderPath, "index.html"),
      rootHTMLContent
    );
    await createFile(path.join(clientFolderPath, "style.css"), rootCSSContent);

    const subFolders = ["contact", "about", "blog"];
    await Promise.all(
      subFolders.map(async (folder) => {
        const folderPath = path.join(clientFolderPath, folder);
        await createFolder(folderPath);
        const backgroundColor = getRandomColor();
        const htmlContent = `
<html>
<head>
    <title>${folder}</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <h1>${folder}</h1>
</body>
</html>`;
        const cssContent = `body {
    background-color: ${backgroundColor};
}`;
        await createFile(path.join(folderPath, "index.html"), htmlContent);
        await createFile(path.join(folderPath, "style.css"), cssContent);
      })
    );

    const osInfo = `This is being run on a ${os.type()} computer!`;
    await createFile(path.join(clientFolderPath, "info.txt"), osInfo);

    console.log("Folder structure and files created successfully.");
  } catch (err) {
    console.error("Error:", err);
  }
};

createWebsite();
