#!/usr/bin/bash
name="${name:-}"

if [[ -z "$name" ]]; then
  read -rp "Enter your name: " name
fi
echo "Hello, $name! Welcome to DevOps."

