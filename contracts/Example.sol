pragma solidity ^0.5.1;

import "./Proxy.sol"; 
import "./ShipB.sol"; 
import "./ShipA.sol"; 

contract Example {
    
    event NewContract(address _contract);
    
    address public logicShipA;
    address public logicShipB;
    
    
    address public lastDeployedShipProxy;
    
    // Deploy your logic reference contract for Ship of model A
    // Set up your new ship (proxy) being initialized as Ship A
    function step1_launchShip(string memory ShipName) public {
        logicShipA = address(new ShipA());
        emit NewContract(logicShipA);
        lastDeployedShipProxy = address(new Proxy(abi.encodeWithSignature("launch(string,address)", ShipName, address(this)), logicShipA));
        emit NewContract(lastDeployedShipProxy);
    }
    
    // Once you've travelled a lot you are going to noticed you cant refuel with the ShipA model
    // stupid design! 
    
    // Now you deploy a new reference: ShipB; with perks!
    // You then transfer all personel and goods to the new model
    // and promote someone else to captain (you!)
    function step2_upgradeShip() public {
        logicShipB = address(new ShipB()); 
        ShipA(lastDeployedShipProxy).abandonShipTo(logicShipB);
        ShipB(lastDeployedShipProxy).promoteToCaptain(msg.sender);
    }
}