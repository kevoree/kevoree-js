#! /bin/sh

buildLinux() {
	cd kevoree-browser-runtime.$1
	cat nw kevoree-browser-runtime.zip > kevoree-browser-runtime
	chmod +x kevoree-browser-runtime
	rm kevoree-browser-runtime.zip nw
	cd ..
	echo "Linux ($1) standalone built successfully"
}

buildWin() {
    cd kevoree-browser-runtime.win
    cat nw.exe kevoree-browser-runtime.zip > kevoree-browser-runtime.exe
    chmod +x kevoree-browser-runtime.exe
    rm kevoree-browser-runtime.zip nw.exe
    cd ..
    echo "Windows standalone built successfully"
}

cd builds

# Linux platforms
buildLinux linux32
buildLinux linux32-libudev0
buildLinux linux64
buildLinux linux64-libudev0
buildWin

exit 0