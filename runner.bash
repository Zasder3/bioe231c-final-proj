# setup software
python -m pip install -r requirements.txt
bash scripts/install-datasets-cli.bash


# download reference genome
rm -rf reference_genomes 2>/dev/null
bash scripts/who.bash

# preprocess bulk data
mkdir -p tmp
bash scripts/fetch-influenza-bulk.bash

# run msas and phylogenetic trees
bash scripts/align.bash


# setup jbrowse
mkdir -p jbrowse
jbrowse create jbrowse
cd jbrowse
sudo npm install -g serve
serve

# Index the reference genome
# Add the genome assembly first
# Add GFF annotations as a track
for strain in h1n1 h3n2; do
    for year in 2014 2019 2024; do
        samtools faidx ../reference_genomes/$strain/$strain-$year.fna
        jbrowse add-assembly ../reference_genomes/$strain/$strain-$year.fna --load copy --name "$strain-$year"
        jbrowse add-track ../reference_genomes/$strain/$strain-$year.gff --load copy --assemblyNames "$strain-$year"
    done
done