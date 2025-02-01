BEGIN {
    FIRSTLINE=1;
    print "[";}
{
    if (!FIRSTLINE) {
        printf ",\n"
    }
    FIRSTLINE=0;
    printf "\"" $1 "\""
}
END {print "]"}