from Bio import Entrez
import click


def fetch_strain_data(strain_name):
    """Fetch complete genome data for a specific strain"""
    print(f"Fetching data for {strain_name}")

    # Search for the strain
    search_term = f"{strain_name}"
    handle = Entrez.esearch(db="genome", term=search_term, retmax=5)
    record = Entrez.read(handle)

    if not record["IdList"]:
        print(f"No complete genome found for {strain_name}")
        return None

    # Get the first matching record
    seq_id = record["IdList"][0]

    # Fetch the full record
    handle = Entrez.efetch(db="nucleotide", id=seq_id, rettype="gb", retmode="text")
    return handle.read()


@click.command()
@click.option("--email", prompt="Your email", help="Your email address for Entrez")
def main(email):
    # Initialize entrez
    Entrez.email = email
    strains_of_interest = {
        "2024": {
            "H1N1": "A/Wisconsin/67/2022",  # Current cell-culture vaccine strain
            "H3N2": "A/Massachusetts/18/2022",
        },
        "2019": {
            "H1N1": "A/Brisbane/02/2018",  # Pre-COVID reference
            "H3N2": "A/Kansas/14/2017",
        },
        "2014": {
            "H1N1": "A/California/7/2009",  # Historical reference
            "H3N2": "A/Texas/50/2012",
        },
    }

    for _, subtypes in strains_of_interest.items():
        for _, strain in subtypes.items():
            data = fetch_strain_data(strain)
            if data:
                print(f"Data fetched for {strain}")
                print(data)


if __name__ == "__main__":
    main()
