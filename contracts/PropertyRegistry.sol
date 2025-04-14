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
    }

    // Main property storage
    mapping(string => Property) public properties;

    // To check if property exists
    mapping(string => bool) public propertyExists;

    // Share ownership: propertyId => holder => shares
    mapping(string => mapping(address => uint256)) private propertyShares;

    event PropertyRegistered(string propertyId, address owner, string location, uint256 price);
    event PropertyTransferred(string propertyId, address from, address to);
    event SharesTransferred(string propertyId, address from, address to, uint256 amount);

    // Constructor to initialize Ownable with an initial owner
    constructor(address initialOwner) Ownable(initialOwner) {}

    function registerProperty(
        string memory _propertyId,
        string memory _location,
        uint256 _price
    ) external {
        require(!propertyExists[_propertyId], "Property already exists");
        require(_price > 0, "Price must be greater than 0");

        properties[_propertyId] = Property({
            propertyId: _propertyId,
            owner: msg.sender,
            location: _location,
            price: _price,
            isListed: true,
            totalShares: 100
        });

        propertyShares[_propertyId][msg.sender] = 100;
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

        mapping(address => uint256) storage shares = propertyShares[_propertyId];

        require(shares[msg.sender] >= _amount, "Insufficient shares");

        shares[msg.sender] -= _amount;
        shares[_to] += _amount;

        emit SharesTransferred(_propertyId, msg.sender, _to, _amount);
    }

    function getPropertyDetails(string memory _propertyId)
        external
        view
        returns (
            address owner,
            string memory location,
            uint256 price,
            bool isListed,
            uint256 totalShares
        )
    {
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

    function getShareBalance(string memory _propertyId, address _holder)
        external
        view
        returns (uint256)
    {
        require(propertyExists[_propertyId], "Property does not exist");
        return propertyShares[_propertyId][_holder];
    }
}