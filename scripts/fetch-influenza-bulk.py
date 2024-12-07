import os
import shutil
import subprocess
import concurrent.futures
import random

import click
from Bio import SeqIO


def download_genome(accession, year, strain):
    """Download a single genome using NCBI datasets"""
    try:
        cmd = f"datasets download virus genome accession {accession} --include protein --filename {accession}.zip"
        subprocess.run(cmd, shell=True, check=True)

        os.makedirs(f"tmp/{accession}", exist_ok=True)
        subprocess.run(
            f"unzip -o {accession}.zip -d tmp/{accession}", shell=True, check=True
        )

        # move to correct directory
        os.rename(
            f"tmp/{accession}/ncbi_dataset/data/protein.faa",
            f"bulk_genomes/{year}/{strain}/{accession}.faa",
        )

        # clean up files
        os.remove(f"{accession}.zip")
        shutil.rmtree(f"tmp/{accession}")

        print(f"Successfully downloaded {accession}")
        return True
    except Exception as e:
        print(f"Error downloading {accession}: {str(e)}")
        return False


@click.command()
@click.option("--dir", help="Directory containing accession")
def main(dir: str):
    strain = dir.split("/")[-1]
    year = dir.split("/")[-2]
    acc_path = f"{dir}/{strain}-{year}.acc"
    with open(acc_path) as f:
        accessions = [i.strip() for i in f.readlines()]

    # select 200 at random with the seed 42
    random.seed(42)
    random.shuffle(accessions)
    accessions = accessions[:200]

    # accessions = accessions[:1]

    # Use ProcessPoolExecutor for CPU-bound tasks like downloading and processing
    with concurrent.futures.ProcessPoolExecutor(max_workers=16) as executor:
        # Submit all download tasks and collect futures
        futures = [
            executor.submit(download_genome, acc, year, strain) for acc in accessions
        ]

        # Wait for all tasks to complete
        concurrent.futures.wait(futures)

    for fasta_file in filter(
        lambda x: x.endswith(".faa"), os.listdir(f"bulk_genomes/{year}/{strain}")
    ):
        # ensure that every fasta has only a single sequence, if there are multiple take only
        # the largest sequence
        largest_record = max(
            SeqIO.parse(f"bulk_genomes/{year}/{strain}/{fasta_file}", "fasta"),
            key=lambda x: len(x.seq),
        )
        SeqIO.write(
            largest_record, f"bulk_genomes/{year}/{strain}/{fasta_file}", "fasta"
        )


if __name__ == "__main__":
    main()
