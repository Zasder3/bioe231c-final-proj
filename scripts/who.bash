# this script downloads the fna and gff files for the h1n1 and h3n2 strains recommended by the WHO

mkdir -p reference_genomes
# h1n1 going from 2024, 2019, to 2014
mkdir -p reference_genomes/h1n1
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/039/326/295/GCA_039326295.1_ASM3932629v1/GCA_039326295.1_ASM3932629v1_genomic.gff.gz -O reference_genomes/h1n1/h1n1-2024.gff.gz
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/039/007/485/GCA_039007485.1_ASM3900748v1/GCA_039007485.1_ASM3900748v1_genomic.gff.gz -O reference_genomes/h1n1/h1n1-2019.gff.gz
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/038/503/805/GCA_038503805.1_ASM3850380v1/GCA_038503805.1_ASM3850380v1_genomic.gff.gz -O reference_genomes/h1n1/h1n1-2014.gff.gz
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/039/326/295/GCA_039326295.1_ASM3932629v1/GCA_039326295.1_ASM3932629v1_genomic.fna.gz -O reference_genomes/h1n1/h1n1-2024.fna.gz
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/039/007/485/GCA_039007485.1_ASM3900748v1/GCA_039007485.1_ASM3900748v1_genomic.fna.gz -O reference_genomes/h1n1/h1n1-2019.fna.gz
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/038/503/805/GCA_038503805.1_ASM3850380v1/GCA_038503805.1_ASM3850380v1_genomic.fna.gz -O reference_genomes/h1n1/h1n1-2014.fna.gz
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/039/326/295/GCA_039326295.1_ASM3932629v1/GCA_039326295.1_ASM3932629v1_protein.faa.gz -O reference_genomes/h1n1/h1n1-2024.faa.gz
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/039/007/485/GCA_039007485.1_ASM3900748v1/GCA_039007485.1_ASM3900748v1_protein.faa.gz -O reference_genomes/h1n1/h1n1-2019.faa.gz
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/038/503/805/GCA_038503805.1_ASM3850380v1/GCA_038503805.1_ASM3850380v1_protein.faa.gz -O reference_genomes/h1n1/h1n1-2014.faa.gz
gunzip reference_genomes/h1n1/h1n1-2024.gff.gz
gunzip reference_genomes/h1n1/h1n1-2019.gff.gz
gunzip reference_genomes/h1n1/h1n1-2014.gff.gz
gunzip reference_genomes/h1n1/h1n1-2024.fna.gz
gunzip reference_genomes/h1n1/h1n1-2019.fna.gz
gunzip reference_genomes/h1n1/h1n1-2014.fna.gz
gunzip reference_genomes/h1n1/h1n1-2024.faa.gz
gunzip reference_genomes/h1n1/h1n1-2019.faa.gz
gunzip reference_genomes/h1n1/h1n1-2014.faa.gz

# h3n2 going from 2024, 2019, to 2014
mkdir -p reference_genomes/h3n2
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/039/311/935/GCA_039311935.1_ASM3931193v1/GCA_039311935.1_ASM3931193v1_genomic.gff.gz -O reference_genomes/h3n2/h3n2-2024.gff.gz
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/038/956/655/GCA_038956655.1_ASM3895665v1/GCA_038956655.1_ASM3895665v1_genomic.gff.gz -O reference_genomes/h3n2/h3n2-2019.gff.gz
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/038/637/665/GCA_038637665.1_ASM3863766v1/GCA_038637665.1_ASM3863766v1_genomic.gff.gz -O reference_genomes/h3n2/h3n2-2014.gff.gz
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/039/311/935/GCA_039311935.1_ASM3931193v1/GCA_039311935.1_ASM3931193v1_genomic.fna.gz -O reference_genomes/h3n2/h3n2-2024.fna.gz
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/038/956/655/GCA_038956655.1_ASM3895665v1/GCA_038956655.1_ASM3895665v1_genomic.fna.gz -O reference_genomes/h3n2/h3n2-2019.fna.gz
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/038/637/665/GCA_038637665.1_ASM3863766v1/GCA_038637665.1_ASM3863766v1_genomic.fna.gz -O reference_genomes/h3n2/h3n2-2014.fna.gz
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/039/311/935/GCA_039311935.1_ASM3931193v1/GCA_039311935.1_ASM3931193v1_protein.faa.gz -O reference_genomes/h3n2/h3n2-2024.faa.gz
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/038/956/655/GCA_038956655.1_ASM3895665v1/GCA_038956655.1_ASM3895665v1_protein.faa.gz -O reference_genomes/h3n2/h3n2-2019.faa.gz
wget https://ftp.ncbi.nlm.nih.gov/genomes/all/GCA/038/637/665/GCA_038637665.1_ASM3863766v1/GCA_038637665.1_ASM3863766v1_protein.faa.gz -O reference_genomes/h3n2/h3n2-2014.faa.gz
gunzip reference_genomes/h3n2/h3n2-2024.gff.gz
gunzip reference_genomes/h3n2/h3n2-2019.gff.gz
gunzip reference_genomes/h3n2/h3n2-2014.gff.gz
gunzip reference_genomes/h3n2/h3n2-2024.fna.gz
gunzip reference_genomes/h3n2/h3n2-2019.fna.gz
gunzip reference_genomes/h3n2/h3n2-2014.fna.gz
gunzip reference_genomes/h3n2/h3n2-2024.faa.gz
gunzip reference_genomes/h3n2/h3n2-2019.faa.gz
gunzip reference_genomes/h3n2/h3n2-2014.faa.gz

python scripts/who.py # clean up the fastas