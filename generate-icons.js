// Script pour générer les icônes PNG à partir du SVG
// Nécessite ImageMagick ou un outil similaire

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputSvg = path.join(__dirname, 'assets/icons/icon.svg');
const outputDir = path.join(__dirname, 'assets/icons');

// Vérifier si ImageMagick est installé
function checkImageMagick() {
    return new Promise((resolve) => {
        exec('magick --version', (error) => {
            resolve(!error);
        });
    });
}

// Générer une icône PNG
function generateIcon(size) {
    return new Promise((resolve, reject) => {
        const outputFile = path.join(outputDir, `icon-${size}x${size}.png`);
        const command = `magick convert "${inputSvg}" -resize ${size}x${size} "${outputFile}"`;
        
        exec(command, (error) => {
            if (error) {
                reject(error);
            } else {
                console.log(`✅ Généré: icon-${size}x${size}.png`);
                resolve();
            }
        });
    });
}

// Générer toutes les icônes
async function generateAllIcons() {
    console.log('🎨 Génération des icônes PWA...');
    
    const hasImageMagick = await checkImageMagick();
    if (!hasImageMagick) {
        console.log('⚠️  ImageMagick n\'est pas installé. Les icônes PNG ne peuvent pas être générées.');
        console.log('📝 Vous pouvez installer ImageMagick depuis: https://imagemagick.org/');
        console.log('📝 Ou créer manuellement les icônes PNG aux tailles suivantes:');
        sizes.forEach(size => {
            console.log(`   - icon-${size}x${size}.png`);
        });
        return;
    }
    
    try {
        for (const size of sizes) {
            await generateIcon(size);
        }
        
        // Créer aussi les favicons
        await generateIcon(16); // favicon-16x16.png
        await generateIcon(32); // favicon-32x32.png
        await generateIcon(180); // apple-touch-icon.png
        
        console.log('🎉 Toutes les icônes ont été générées avec succès !');
    } catch (error) {
        console.error('❌ Erreur lors de la génération des icônes:', error);
    }
}

// Exécuter si le script est appelé directement
if (require.main === module) {
    generateAllIcons();
}

module.exports = { generateAllIcons }; 