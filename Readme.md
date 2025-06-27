## To generate Verieifer contract

Go to circuit folder and do:

``` nargo compile```

``` bb write_vk --oracle_hash keccak -b ./target/zk_panagram.json -o ./target```

``` bb write_solidity_verifier -b ./target/zk_panagram.json -k ./target/vk -o ./target/Veriefier.sol```