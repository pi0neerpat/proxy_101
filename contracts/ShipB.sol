pragma solidity ^0.5.1;

import "./NewShipBuild.sol";
import "./ShipA.sol";

contract ShipB is NewShipBuild, ShipA {
    
    function refuel(uint256 fuel) public {
        require(fuelSupply + fuel > fuelSupply, "Already full");
        fuelSupply += fuel;
    }
    
    function promoteToCaptain(address newCaptain) public isCaptain {
        previousCaptains.push(captain);
        captain = newCaptain;
    }
    
    function getCaptains () public view returns (address[] memory captains ) {
        captains = new address[](previousCaptains.length);
        for(uint256 i = 0; i < previousCaptains.length; i++) {
            captains[i] = previousCaptains[i];
        }
    }
}
