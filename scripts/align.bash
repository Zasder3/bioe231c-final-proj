for strain in h1n1 h3n2; do
    python scripts/align-seqs.py --ref_year 2014 --bulk_year 2013 --strain $strain
    python scripts/align-seqs.py --ref_year 2014 --bulk_year 2015 --strain $strain
    python scripts/align-seqs.py --ref_year 2019 --bulk_year 2018 --strain $strain
    python scripts/align-seqs.py --ref_year 2019 --bulk_year 2020 --strain $strain
    python scripts/align-seqs.py --ref_year 2024 --bulk_year 2023 --strain $strain
done

for strain in h1n1 h3n2; do
    for year in 2013 2015 2018 2020 2023; do
        python scripts/aln-to-newick.py --aln alignments/$year/$strain.aln
    done
done