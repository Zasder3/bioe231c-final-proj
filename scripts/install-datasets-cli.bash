detect_os() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "mac"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "linux"
    else
        echo "unsupported"
    fi
}

check_datasets() {
    if command -v datasets &> /dev/null; then
        echo "datasets command is already installed"
        echo "Current version:"
        datasets --version
        exit 0
    fi
}

check_datasets
OS=$(detect_os)

if [ "$OS" == "unsupported" ]; then
    echo "Your operating system is not supported by this script."
    echo "Please visit https://www.ncbi.nlm.nih.gov/datasets/docs/v2/download-and-install/ for installation instructions."
    exit 1
fi

if [ "$OS" == "mac" ]; then
    URL="https://ftp.ncbi.nlm.nih.gov/pub/datasets/command-line/LATEST/mac/datasets"
else
    URL="https://ftp.ncbi.nlm.nih.gov/pub/datasets/command-line/LATEST/linux-amd64/datasets"
fi

wget "$URL" -O datasets || {
    echo "Failed to download datasets tool"
    exit 1
}

chmod +x datasets || {
    echo "Failed to make datasets executable"
    exit 1
}

echo "Moving datasets to /usr/local/bin/ (requires sudo permission)"
sudo mv datasets /usr/local/bin/ || {
    echo "Failed to move datasets to /usr/local/bin/"
    echo "You might need sudo privileges. You can try running:"
    echo "sudo mv datasets /usr/local/bin/"
    exit 1
}

if command -v datasets &> /dev/null; then
    echo "Installation successful!"
    echo "datasets version:"
    datasets --version
else
    echo "Installation may have failed. Please check if datasets is in your PATH"
fi