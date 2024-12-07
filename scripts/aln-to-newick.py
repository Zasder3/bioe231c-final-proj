import click
from Bio import AlignIO
from Bio.Phylo.TreeConstruction import DistanceCalculator, DistanceTreeConstructor
from Bio import Phylo


def msa_to_newick(aln_file):
    # Read the alignment file
    alignment = AlignIO.read(aln_file, "fasta")

    # Calculate distance matrix
    calculator = DistanceCalculator("identity")
    dm = calculator.get_distance(alignment)

    # Construct the tree
    constructor = DistanceTreeConstructor(calculator)
    tree = constructor.upgma(dm)

    # Write the tree in Newick format
    output_file = aln_file.replace(".aln", ".nwk")
    Phylo.write(tree, output_file, "newick")


@click.command()
@click.option("--aln", help="Alignment file")
def main(aln: str):
    msa_to_newick(aln)


if __name__ == "__main__":
    main()
