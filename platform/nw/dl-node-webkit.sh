#! /bin/sh

# download & extract function
downloadAndExtract() {
    echo Downloading \& extracting node-webkit for $2...
    wget -q $1 -O $2.tgz \
        && tar -xvf $2.tgz -C $2-tmp > /dev/null \
        && mv $2-tmp/*/* $2 \
        && rm -rf $2.tgz $2-tmp
}

# download & unzip function
downloadAndUnzip() {
    echo Downloading \& unzipping node-webkit for $2...
    wget -q $1 -O $2.zip \
        && unzip -qq $2.zip -d $2 \
        && rm $2.zip
}

# copy given directory and hack nw content (https://github.com/rogerwang/node-webkit/wiki/The-solution-of-lacking-libudev.so.0)
libudev0Hack() {
    echo Creating libudev0 hacked version for $1...
    cp -r $1 $1-libudev0
    cd $1-libudev0
    sed -i 's/\x75\x64\x65\x76\x2E\x73\x6F\x2E\x30/\x75\x64\x65\x76\x2E\x73\x6F\x2E\x31/g' nw
    cd ..
}

# (re-)create download folder
echo Preparing ./node-webkit folder...
rm -rf node-webkit \
	&& mkdir node-webkit \
	&& cd node-webkit \
	&& mkdir linux32-tmp linux32 linux64-tmp linux64 mac win

# download & extract for all platforms
downloadAndExtract http://dl.node-webkit.org/v0.9.2/node-webkit-v0.9.2-linux-ia32.tar.gz linux32
downloadAndExtract http://dl.node-webkit.org/v0.9.2/node-webkit-v0.9.2-linux-x64.tar.gz linux64
downloadAndUnzip http://dl.node-webkit.org/v0.9.2/node-webkit-v0.9.2-win-ia32.zip win
downloadAndUnzip http://dl.node-webkit.org/v0.9.2/node-webkit-v0.9.2-osx-ia32.zip mac

# create libudev0 hacked versions
libudev0Hack linux32
libudev0Hack linux64

exit 0