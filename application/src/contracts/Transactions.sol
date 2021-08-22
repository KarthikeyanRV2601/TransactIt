pragma solidity >=0.4.21 <0.7.0;

contract Transactions{


    function sendEther(address payable _receiver) public payable{
        require(_receiver!=address(0) && msg.sender!=address(0));
        address(_receiver).transfer(msg.value);
    }

}