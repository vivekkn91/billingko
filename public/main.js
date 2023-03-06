// main.js

const { app, BrowserWindow } = require("electron");
const path = require("path");
const { startExpressServer } = require("./expressServer");

let mainWindow;

function createMainWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/../build/index.html`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", async () => {
  // Start the Express server
  const expressApp = await startExpressServer();
  const port = 3001;
  expressApp.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  createMainWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createMainWindow();
  }
});

app.on("before-quit", () => {
  // Kill the Express server before quitting the app
  expressApp.close();
});
