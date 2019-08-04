pragma solidity ^0.5.1;

import "./Proxiable.sol";
import "./ShipBuild.sol";

contract ShipA is Proxiable, ShipBuild {

    function launch(string memory  _name, address _captain) public onlyNewShip {
        name = _name;
        registry = "NX01";
        captain = _captain;
        fuelSupply = 3;
    }

    function travel() public {
        require(fuelSupply > 0, "No Fuel Left");
        fuelSupply--;
    }

    function abandonShipTo(address newShip) public isCaptain {
        updateCodeAddress(newShip);
    }

    modifier isCaptain() {
        require(msg.sender == captain, "Only under captain's orders");
        _;
    }
    modifier onlyNewShip() {
        require(captain == address(0), "Tread lightly corporal!");
        _;
    }
}
