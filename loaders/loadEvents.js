const { readdirSync, statSync } = require('fs');
const path = require('path');

module.exports = client => {
    let count = 0;

    // Fonction pour charger les événements de manière récursive et construire l'arbre
    function loadEvents(dir, depth = 0) {
        const entries = readdirSync(dir).sort();
        const subDirs = [];
        const files = [];

        // Séparer les dossiers et les fichiers
        entries.forEach(entry => {
            const fullPath = path.join(dir, entry);
            const stats = statSync(fullPath);
            if (stats.isDirectory()) {
                subDirs.push(entry);
            } else if (stats.isFile() && entry.endsWith('.js')) {
                files.push(entry);
            }
        });

        // Afficher les dossiers
        subDirs.forEach(subDir => {
            const subDirPath = path.join(dir, subDir);
            const subDirCount = readdirSync(subDirPath).length;
            console.log(`${'│   '.repeat(depth)}├── ${subDir} (${subDirCount})`);
            loadEvents(subDirPath, depth + 1); // Appel récursif pour les sous-dossiers
        });

        // Afficher les fichiers
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const event = require(filePath);
            client.on(event.name, (...args) => event.run(client, ...args));
            count++;
            console.log(`${'│   '.repeat(depth)}└── ${file}`);
        });
    }

    // Dossier de départ
    const rootEventsDir = path.join(__dirname, '../events');
    console.log('[-------------------------------]')
    console.log('[Events]');
    loadEvents(rootEventsDir);

    console.log(`[Events] => ${count} logged events`);
    console.log('[-------------------------------]')
};