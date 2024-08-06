const { readdirSync, statSync } = require('fs');
const path = require('path');

module.exports = client => {
    let count = 0;

    // Fonction pour charger les commandes de manière récursive et construire l'arbre
    function loadCommands(dir, depth = 0) {
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
            loadCommands(subDirPath, depth + 1); // Appel récursif pour les sous-dossiers
        });

        // Afficher les fichiers
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const command = require(filePath);
            client.commands.set(command.data.name, command);
            count++;
            console.log(`${'│   '.repeat(depth)}└── ${file}`);
        });
    }

    // Dossier de départ
    const rootCommandsDir = path.join(__dirname, '../commands');
    console.log('[-------------------------------]')
    console.log('[Commands]');
    loadCommands(rootCommandsDir);

    console.log(`[Commands] => ${count} logged commands`);
};