#!/bin/bash

input_file="names.csv"
output_file="names_clean.csv"

# Use awk to remove duplicates based on the first column
awk -F, '!seen[$1]++' "$input_file" > "$output_file"

# Use this Regex in vscode to find invalid columns: ^([^,\n]*,){3,}[^,\n]*$

echo "Duplicates removed. Output saved to $output_file"
