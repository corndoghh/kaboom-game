cd src/scripts/game

esbuild game.js --bundle --format=esm > build.js

mv build.js ../builds/


cd ..
cd editor
esbuild editor.js --bundle --format=esm > build.js




cd ..
cd ..
cd ..

node app.js