# shuf

shuf shuffles its input by outputting a random permutation of its input lines.

based off https://www.gnu.org/software/coreutils/manual/html_node/shuf-invocation.html

## CLI Usage

### randomly output lines to stdout

    npm i shuf -g
    cat file | shuf

### split into two files, with second limited to 15 lines telling shuf total initial lines (35410)

    ®[~]$ wc -l -c ~/Downloads/log2.txt
      35410  941848 /Users/ryan/Downloads/log2.txt
    ®[~]$ cat ~/Downloads/log2.txt  | shuf  a.out b.out --n=15 --lc=35410


### split into two files, with second limited to 15 lines.

Less random, as more preference is given to earlier lines

    ®[~]$ cat ~/Downloads/log2.txt  | shuf  a.out b.out --n=15

### split into n files, with equal probablity of going to each file

    ®[~]$ cat ~/Downloads/log2.txt  | shuf  a.out b.out c.out

## License

MIT
