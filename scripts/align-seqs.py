#!/usr/bin/env python3

import subprocess
import os
import sys
import platform
from tempfile import NamedTemporaryFile
import urllib.request
import stat
from pathlib import Path

import click
from Bio import SeqIO
from Bio.Align.Applications import MuscleCommandline
from Bio import AlignIO


def download_file(url, filename):
    """Download a file from URL."""
    print(f"Downloading from {url}...")
    urllib.request.urlretrieve(url, filename)


def install_muscle():
    """Install MUSCLE if not present."""
    system = platform.system().lower()
    machine = platform.machine().lower()
    install_dir = "/usr/local/bin"
    os.makedirs(install_dir, exist_ok=True)

    # determine the appropriate URL based on system and architecture
    # if i screwed up this code snippet, i'm sorry. pls check the github 🙏
    base_url = "https://github.com/rcedgar/muscle/releases/download/v5.3/"

    if system == "linux":
        if "x86_64" in machine or "amd64" in machine:
            url = base_url + "muscle-linux-x86.v5.3"
        elif "aarch64" in machine or "arm64" in machine:
            url = base_url + "muscle-aarch64.v5.3"
        else:
            raise Exception(f"Unsupported Linux architecture: {machine}")

    elif system == "darwin":
        if "x86_64" in machine or "amd64" in machine:
            url = base_url + "muscle-osx-x86.v5.3"
        elif "arm64" in machine:
            url = base_url + "muscle-osx-arm64.v5.3"
        else:
            raise Exception(f"Unsupported macOS architecture: {machine}")

    else:
        raise Exception(f"Unsupported operating system: {system}")

    # Download and install MUSCLE
    target_path = os.path.join(install_dir, "muscle")
    print(f"Installing MUSCLE to {target_path}")

    try:
        download_file(url, target_path)
        # Make executable
        os.chmod(
            target_path,
            os.stat(target_path).st_mode | stat.S_IXUSR | stat.S_IXGRP | stat.S_IXOTH,
        )

        # Add to PATH if not already there
        if install_dir not in os.environ["PATH"]:
            os.environ["PATH"] = install_dir + os.pathsep + os.environ["PATH"]

        print("MUSCLE installation completed successfully!")
        return True

    except Exception as e:
        print(f"Error installing MUSCLE: {str(e)}")
        return False


def check_muscle_installation():
    """Check if MUSCLE is installed and accessible."""
    try:
        subprocess.run(["muscle", "-version"], capture_output=True)
        return True
    except FileNotFoundError:
        return False


def run_muscle_alignment(ref_year: str, bulk_year: str, strain: str):
    # Gather ref seq
    ref_seq_path = f"reference_genomes/{strain}/{strain}-{ref_year}.faa"

    # Gather alternative seqs
    seq_paths = list(
        filter(
            lambda x: x.endswith(".faa"),
            os.listdir(f"bulk_genomes/{bulk_year}/{strain}"),
        )
    )

    with NamedTemporaryFile(mode="w", delete=False) as temp:
        # Write ref seq to temp file
        with open(ref_seq_path, "r") as ref_seq_file:
            ref_seq = ref_seq_file.read()
            # Add title for WHO vaccine strain
            ref_seq = (
                f">who-vaccine-{ref_year}-{strain}" + ref_seq[ref_seq.find("\n") :]
            )
            temp.write(ref_seq)

        # Write alternative seqs to temp file
        for seq_path in seq_paths:
            with open(f"bulk_genomes/{bulk_year}/{strain}/{seq_path}", "r") as seq_file:
                temp.write(seq_file.read())

    # Run MUSCLE
    os.makedirs(f"alignments/{bulk_year}", exist_ok=True)
    subprocess.run(
        [
            "muscle",
            "-align",
            temp.name,
            "-output",
            f"alignments/{bulk_year}/{strain}.aln",
        ],
        check=True,
    )
    os.remove(temp.name)

    print(f"Alignment for {strain} {bulk_year} complete!")


@click.command()
@click.option("--ref_year", required=True, help="Reference year")
@click.option("--bulk_year", required=True, help="Influenza bulk year")
@click.option("--strain", required=True, help="Influenza strain")
def main(ref_year: str, bulk_year: str, strain: str):
    # check if MUSCLE is installed, if not, install it
    if not check_muscle_installation():
        print("MUSCLE not found. Attempting to install...")
        if not install_muscle():
            print("Failed to install MUSCLE. Please install it manually.")
            sys.exit(1)

    run_muscle_alignment(ref_year, bulk_year, strain)


if __name__ == "__main__":
    main()
