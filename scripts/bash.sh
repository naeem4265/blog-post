#!/usr/bin/bash
# loop on array member
NAMES=(Joe Jenny Sara Tony)
for N in ${NAMES[@]} ; do
  echo "My name is $N"
done

# loop on command output results
for f in $( ls bash.sh /etc/localtime ) ; do
  echo "File is: $f"
done
