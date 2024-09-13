#!/bin/bash

rm -rf ./public/env-config.js
touch ./public/env-config.js

echo "window.env = {" >> ./public/env-config.js

while read -r line || [[ -n "$line" ]];
do
  if printf '%s\n' "$line" | grep -q -e '='; then
    varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi

  value=$(printf '%s\n' "${!varname}")
  [[ -z $value ]] && value=${varvalue}
  
  echo "  $varname: \"$value\"," >> ./public/env-config.js
done < .env

echo "}" >> ./public/env-config.js