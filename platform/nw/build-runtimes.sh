#! /bin/sh
if [ "$1" = "-h" ]; then
    echo "Usage: $0 [-h|-z]"
    echo "\t-h\tManpage"
    echo "\t-z\tZip built runtime directories"
    exit 0
fi


buildLinux() {
    cd dist
	zip -rqq ../builds/$1/kevoree-browser-runtime.nw *
	cd ..
	cp node-webkit/$1/nw node-webkit/$1/nw.pak node-webkit/$1/libffmpegsumo.so builds/$1
	cd builds/$1
	cat nw kevoree-browser-runtime.nw > kevoree-browser-runtime
	chmod +x kevoree-browser-runtime
	rm kevoree-browser-runtime.nw nw
	cd ..
	mv $1 kevoree-browser-runtime.$1
	if [ "$2" = true ]; then
	    zip -r kevoree-browser-runtime.$1.zip kevoree-browser-runtime.$1
	fi
	cd ..
	echo "Linux ($1) standalone built successfully"
}

buildWin() {
    cd dist
	zip -rqq ../builds/win/kevoree-browser-runtime.nw *
	cd ..
	cp node-webkit/win/nw.exe \
	    node-webkit/win/nw.pak \
	    node-webkit/win/ffmpegsumo.dll \
	    node-webkit/win/icudt.dll \
	    node-webkit/win/libEGL.dll \
	    node-webkit/win/libGLESv2.dll \
	    builds/win
	cd builds/win
	cat nw.exe kevoree-browser-runtime.nw > kevoree-browser-runtime.exe
	chmod +x kevoree-browser-runtime.exe
	rm kevoree-browser-runtime.nw nw.exe
	cd ..
	mv win kevoree-browser-runtime.win
    if [ "$1" = true ]; then
	    zip -r kevoree-browser-runtime.win.zip kevoree-browser-runtime.win
	fi
	cd ..
	echo "Windows standalone built successfully"
}

buildMac() {
    cp -r node-webkit/mac builds
    mv builds/mac/node-webkit.app builds/mac/kevoree-browser-runtime.app
    cp -r dist builds/mac/kevoree-browser-runtime.app/Contents/Resources
    mv builds/mac/kevoree-browser-runtime.app/Contents/Resources/dist builds/mac/kevoree-browser-runtime.app/Contents/Resources/app.nw
    cd builds/mac
    if [ "$1" = true ]; then
	    zip -qr ../kevoree-browser-runtime.mac.zip kevoree-browser-runtime.app
	fi
    cd ../..
    echo "Mac standalone built successfully"
}

# (re-)create builds folder
echo Preparing ./builds folder...
rm -rf builds \
	&& mkdir builds \
	&& cd builds \
	&& mkdir -p linux32-libudev0 linux32 linux64-libudev0 linux64 mac win
cd ..
echo ok

doZip=false
if [ "$1" = "-z" ]; then
    doZip=true
fi

buildLinux linux32 $doZip
buildLinux linux32-libudev0 $doZip
buildLinux linux64 $doZip
buildLinux linux64-libudev0 $doZip
buildWin $doZip
buildMac $doZip

exit 0