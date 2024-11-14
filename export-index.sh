#!/bin/bash

folder_path=${1:-.}
folder_name=$(basename "$folder_path")
file_path="$folder_path/index.ts"

if [ -f "$file_path" ]; then
  rm "$file_path"
fi

for file in "$folder_path"/*.ts; do
  filename=$(basename "$file" .ts)
  if [ "$filename" != "index" ]; then
    echo "export * from './$filename';" >> "$file_path"
  fi
done