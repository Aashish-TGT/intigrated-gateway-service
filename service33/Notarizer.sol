// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Notarizer {
    mapping(string => bool) public hashes;

    function notarizeHash(string memory hash) public {
        hashes[hash] = true;
    }

    function verifyHash(string memory hash) public view returns (bool) {
        return hashes[hash];
    }
}
