#!/bin/bash
DIRS=(\
	$PWD/model\
	$PWD/tools/logger\
	$PWD/api\
	$PWD/tools/kevscript\
	$PWD/tools/gen-model\
	$PWD/core\
	$PWD/runtimes/nodejs\
)

for dirname in "${DIRS[@]}"
do
		echo $dirname
		# todo
done
