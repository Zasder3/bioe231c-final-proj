# Overview
In this project, we use JBrowse2 to perform analysis on the past decade of genomic evolution in the United States Influenza genome.

## Setup
To replicate the analysis/download necessary data requirements run:
```bash
bash runner.bash
```

This script works in 5 parts:
### 1. Downloading the data
First the script will download the necessary software requirements (minus MUSCLE which is handled later in the python script).
We use the following software:
* Python:
    * click
    * biopython
* NCBI datasets cli
* Vercel serve

### 2. Downloading the reference genomes
The script will execute `scripts/who.bash` which will download the reference genomes, labels, and proteins from NCBI ftp. From there it will filter for only the hemagglutinin protein from each fasta file.

### 3. Downloading bulk season data
We next run `scripts/fetch-influenza-bulk.bash` which will use the NCBI datasets cli to download the relevant data for each influenza season for every year and strain of interest.

### 4. Running the analysis
Finally, we run `scripts/align.py` which will align the sequences using MUSCLE and then convert the aligned sequences to a Newick tree format. This tree is then used to generate the JBrowse2 visualization.

### 5. Adding the data to JBrowse2
The last step is to create the jbrowse folder and instantiate the JBrowse2 server. From there we add each reference genome and annotation to the JBrowse2 instance.

## Usage

Either using `serve` locally from `./jbrowse` or going to [this link](https://cadegordon.io/bioe231c-final-proj/jbrowse/), the user should:
1. Select their vaccine year of interest and strain to be shown as a linear genome.
2. Go to `TOOLS` > `Plugin store` > `MsaView` > + `INSTALL`.
3. Add an MSA view then upload the respective `.aln` file from `alignments/{influenza_season}/{strain}.aln`.
4. Add a second MSA view with the newick file `alignments/{influenza_season}/{strain}.nwk`.