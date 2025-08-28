// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ReceiptNotary {
    mapping(bytes32 => bool) public receiptHashes;

    event ReceiptNotarized(bytes32 indexed hash, address indexed by);

    function notarizeReceipt(bytes32 hash) public {
        require(!receiptHashes[hash], "Hash already exists");
        receiptHashes[hash] = true;
        emit ReceiptNotarized(hash, msg.sender);
    }

    function verifyReceipt(bytes32 hash) public view returns (bool) {
        return receiptHashes[hash];
    }
}
