# Run this in the cloned emscripten repo on OSX
ln -s `pwd`/emcc /usr/local/bin/.
sudo ln -s `which python` /usr/bin/python2
brew install llvm
sudo ln -s `which llvm-link` /usr/bin/.
sudo ln -s `which llvm-ar` /usr/bin/.
sudo ln -s `which opt` /usr/bin/.
sudo ln -s `which llvm-as` /usr/bin/.
sudo ln -s `which llvm-dis` /usr/bin/.
sudo ln -s `which llvm-nm` /usr/bin/.
