#!/usr/bin/bash

# Step 1: Show disk usage for the root (/) filesystem
line="$(df -P / | tail -n 1)"     # sample: "/dev/sda1  30412340  21000000  8000000  73%  /"

echo "$line"

# Step 2: Grab the "Use%" column (like "73%")
percent_with_symbol="$(echo "$line" | awk '{print $5}')"

echo "$percent_with_symbol"

# Step 3: Remove the % sign so we have just the number (like "73")
usage="$(echo "$percent_with_symbol" | tr -d '%')"

echo "$usage"

# Step 4: Compare and print a message
if [ "$usage" -gt 80 ]; then
  echo "Warning: Disk usage above 80%"
else
  echo "Disk usage normal"
fi

