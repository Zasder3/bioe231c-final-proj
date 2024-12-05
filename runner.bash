# download reference genome
rm -rf reference_genomes 2>/dev/null
bash scripts/who.bash

# preprocess bulk data
mkdir -p tmp
bash scripts/fetch-influenza-bulk.py


# setup jbrowse
mkdir -p jbrowse
jbrowse create jbrowse
cd jbrowse
sudo npm install -g serve
serve

# Add the genome assembly first
jbrowse add-assembly ../reference_genomes/h1n1/h1n1-2014.fna --load copy --name "H1N1_2014"

# Now add the GFF annotations as a track
jbrowse add-track ../reference_genomes/h1n1/h1n1-2014.gff --load copy
