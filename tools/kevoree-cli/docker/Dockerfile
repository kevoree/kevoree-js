FROM        mhart/alpine-node:6.9.1
MAINTAINER  Maxime Tricoire <max.tricoire@gmail.com> (@maxleiko)

WORKDIR     /root

RUN         npm i -g kevoree-cli@latest && \
            npm cache clean

COPY        ./config.json /root/.kevoree/config.json

ENTRYPOINT  ["kevoree"]
CMD         ["start"]
