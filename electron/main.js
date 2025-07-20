const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            contextIsolation: true,
        }
    });

    // Enable auto-updates
    win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
    autoUpdater.checkForUpdatesAndNotify();

    win.on('closed', () => {
        app.quit(); // Ajouté ici
    });
}

// Handle auto-updates events
autoUpdater.on('checking-for-update', () => {
    console.log('🕵️ Vérification de mise à jour...');
});

autoUpdater.on('update-available', (info) => {
    console.log('📦 Mise à jour disponible ! Version :', info.version);
});

autoUpdater.on('update-not-available', () => {
    console.log('✅ Aucune mise à jour disponible.');
});

autoUpdater.on('error', (err) => {
    console.error('❌ Erreur dans le système de mise à jour :', err);
});

autoUpdater.on('download-progress', (progressObj) => {
    console.log(`⬇️ Téléchargement : ${Math.floor(progressObj.percent)}%`);
});

autoUpdater.on('update-downloaded', () => {
    console.log('📁 Mise à jour téléchargée.');

    // 💬 Demande à l’utilisateur s’il veut relancer maintenant
    const result = dialog.showMessageBoxSync({
        type: 'question',
        buttons: ['Redémarrer maintenant', 'Plus tard'],
        defaultId: 0,
        message: 'Une mise à jour est prête',
        detail: 'Voulez-vous redémarrer l’application pour appliquer la mise à jour ?'
    });

    if (result === 0) {
        autoUpdater.quitAndInstall();
    }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
