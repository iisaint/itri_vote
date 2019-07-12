pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Vote is Ownable {
  struct Competitor {
    string name;
    uint counter;
  }
  Competitor[] competitors;
  mapping(string => uint) ids;
  uint public fee;
  
  modifier isCompetitor (string memory _name) {
      require(keccak256(abi.encodePacked(competitors[ids[_name]].name)) == keccak256(abi.encodePacked(_name)), "invalid competitor.");
      _;
  }
  
  event LogAdd(string _name);
  event LogVote(string _name, uint _count);

  constructor (uint _fee) public {
    fee = _fee;
  }

  function addCompetitor(string memory _name) public onlyOwner {
    require(bytes(_name).length > 0, "invalid name");
    ids[_name] = competitors.length;
    competitors.push(Competitor(_name, 0));
    emit LogAdd(_name);
  }

  function vote(string memory _name) public isCompetitor(_name) payable {
    require(msg.value >= fee, "must pay enough fee");
    competitors[ids[_name]].counter += 1;
    emit LogVote(_name, competitors[ids[_name]].counter);
  }

  function getList() public view returns(Competitor[] memory list) {
    list = new Competitor[](competitors.length);
    for (uint i=0; i < competitors.length; i++) {
      list[i] = competitors[i];
    }
  }

}

