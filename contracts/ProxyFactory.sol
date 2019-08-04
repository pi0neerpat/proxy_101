pragma solidity ^0.5.1;

import "./Proxy.sol";

contract ProxyFactory {
    
    event NewProxy(address deployedAddress);
    
    function createProxy(bytes memory constructData, address codeAt) public {
        emit NewProxy(address(new Proxy(constructData, codeAt)));
    }
}