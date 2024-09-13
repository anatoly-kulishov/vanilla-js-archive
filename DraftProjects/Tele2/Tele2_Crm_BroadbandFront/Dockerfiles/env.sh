cat "/vault/secrets/secrets.json" | sed -e 's/\//\\\//g' | sort --sort=version | while read -r i;
do
if [[ $i == *"\""* ]]; then
echo $i | sed -i  $( echo "$(sed -e 's/": "/\//g'| sed -e 's/^"/s\//g' | sed -e 's/",$/\/g/g' | sed -e 's/"$/\/g/g')") $(find -type f -name "*.js");
fi;
done;