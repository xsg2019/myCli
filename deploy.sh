#!/usr/bin/env sh

yarn build
ssh -t dev rm -fr /data/docker/nginx/web/flash/html/*
scp -r ./dist/. dev:/data/docker/nginx/web/flash/html

