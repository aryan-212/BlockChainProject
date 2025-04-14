// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PropertyRegistry is Ownable, ReentrancyGuard {
    struct Property {
        string propertyId;
        address owner;
        string location;
        uint256 price;
        bool isListed;
        uint256 totalShares;
        mapping(address => uint256) shares;
    }

    mapping(string => Property) public properties;
    mapping(string => bool) public propertyExists;

    event PropertyRegistered(string propertyId, address owner, string location, uint256 price);
    event PropertyTransferred(string propertyId, address from, address to);
    event SharesIssued(string propertyId, address to, uint256 amount);
    event SharesTransferred(string propertyId, address from, address to, uint256 amount);

    function registerProperty(
        string memory _propertyId,
        string memory _location,
        uint256 _price
    ) external {
        require(!propertyExists[_propertyId], "Property already exists");
        require(_price > 0, "Price must be greater than 0");

        Property storage newProperty = properties[_propertyId];
        newProperty.propertyId = _propertyId;
        newProperty.owner = msg.sender;
        newProperty.location = _location;
        newProperty.price = _price;
        newProperty.isListed = true;
        newProperty.totalShares = 100; // 100 shares per property
        newProperty.shares[msg.sender] = 100;

        propertyExists[_propertyId] = true;

        emit PropertyRegistered(_propertyId, msg.sender, _location, _price);
    }

    function transferProperty(string memory _propertyId, address _newOwner) external {
        require(propertyExists[_propertyId], "Property does not exist");
        require(properties[_propertyId].owner == msg.sender, "Not the property owner");

        properties[_propertyId].owner = _newOwner;
        emit PropertyTransferred(_propertyId, msg.sender, _newOwner);
    }

    function issueShares(string memory _propertyId, address _to, uint256 _amount) external {
        require(propertyExists[_propertyId], "Property does not exist");
        require(properties[_propertyId].owner == msg.sender, "Not the property owner");
        require(_amount > 0, "Amount must be greater than 0");

        Property storage property = properties[_propertyId];
        require(property.shares[msg.sender] >= _amount, "Insufficient shares");

        property.shares[msg.sender] -= _amount;
        property.shares[_to] += _amount;

        emit SharesTransferred(_propertyId, msg.sender, _to, _amount);
    }

    function getPropertyDetails(string memory _propertyId) external view returns (
        address owner,
        string memory location,
        uint256 price,
        bool isListed,
        uint256 totalShares
    ) {
        require(propertyExists[_propertyId], "Property does not exist");
        Property storage property = properties[_propertyId];
        return (
            property.owner,
            property.location,
            property.price,
            property.isListed,
            property.totalShares
        );
    }

    function getShareBalance(string memory _propertyId, address _holder) external view returns (uint256) {
        require(propertyExists[_propertyId], "Property does not exist");
        return properties[_propertyId].shares[_holder];
    }
} 