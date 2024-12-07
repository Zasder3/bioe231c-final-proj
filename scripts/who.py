import os
from Bio import SeqIO


def main():
    # filter fasta files to only contain hemagglutinin
    for strain in ["h1n1", "h3n2"]:
        for fname in filter(
            lambda x: x.endswith(".faa"), os.listdir(f"reference_genomes/{strain}")
        ):
            record = list(
                filter(
                    lambda x: "hemagglutinin" in x.description.lower(),
                    SeqIO.parse(f"reference_genomes/{strain}/{fname}", "fasta"),
                )
            )[0]

            SeqIO.write(record, f"reference_genomes/{strain}/{fname}", "fasta")


if __name__ == "__main__":
    main()
