for year in 2013 2015 2018 2020 2023; do
    for strain in h1n1 h3n2; do
        python scripts/fetch-influenza-bulk.py --dir bulk_genomes/$strain/$year
    done
done
