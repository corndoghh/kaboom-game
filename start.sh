cd src/scripts/game

esbuild game.js --bundle > build.js

mv build.js ../builds/


cd ..
cd editor
esbuild editor.js --bundle > build.js




cd ..
cd ..
cd ..

node app.js