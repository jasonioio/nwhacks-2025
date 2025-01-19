# curl -o golang.pkg https://dl.google.com/go/go1.21.3.darwin-amd64.pkg
# sudo open golang.pkg
# rm golang.pkg

export PATH=$PATH:/usr/local/go/bin
export PATH=$PATH:$HOME/go/bin
export PATH=$PATH:$GOPATH/bin

echo "export GOROOT=/usr/local/go" >> .bash_profile
echo "export GOPATH=$HOME/Documents/go" >> .bash_profile
echo "export PATH=$GOPATH/bin:$GOROOT/bin:$PATH" >> .bash_profile

<<<<<<< Updated upstream
source ~/.bash_profile
<<<<<<< Updated upstream
source ~/.zshrc
=======
=======
export PATH=$PATH:/usr/local/go/bin
export PATH=$PATH:$GOPATH/bin
>>>>>>> Stashed changes
>>>>>>> Stashed changes

go install github.com/desertbit/grml@latest