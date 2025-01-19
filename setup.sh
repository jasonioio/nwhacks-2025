#!/bin/bash

# Download and install Go
echo "Downloading and installing Go..."
curl -o /tmp/golang.pkg https://dl.google.com/go/go1.21.3.darwin-amd64.pkg
sudo installer -pkg /tmp/golang.pkg -target /
rm /tmp/golang.pkg

# Setup Go environment variables
echo "Setting up Go environment variables..."
{
    echo "export GOROOT=/usr/local/go"
    echo "export GOPATH=$HOME/Documents/go"
    echo "export PATH=\$GOPATH/bin:\$GOROOT/bin:\$PATH"
} >> ~/.bash_profile

# Source shell configuration
echo "Sourcing updated shell configuration..."
if [ -f ~/.bash_profile ]; then
    source ~/.bash_profile
fi

if [ -f ~/.zshrc ]; then
    source ~/.zshrc
fi

# Verify and install grml
echo "Installing grml..."
go install github.com/desertbit/grml@latest

# Check if grml is accessible
if command -v grml &> /dev/null; then
    echo "grml successfully installed and available in PATH."
else
    echo "grml is not accessible. Check your PATH configuration."
fi
