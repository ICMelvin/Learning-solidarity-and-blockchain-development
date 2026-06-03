  // SPDX-License-Identifier: MIT
    // first this is to declare the version of solidity to be used and (^) is to allow newer versions 
    
pragma solidity ^0.8.28;


    // to start a smart contract we use the contraction keyword

contract SimpStore {
    uint256 MyNum;

    //assigning values to the struct function
    humans public Mem = humans({age : 23, name : "Melvin"}); // we can use arrays to make stuff dynamic 
    // storage function
    function store(uint256 stores)  public virtual { // virtual makes this functon overridable.
       MyNum = stores;
       // uint256 myScope = 78 ; // the scope this variable is limited to this function.
       
    }
    // implementation of struct
    struct humans {
        string name;
        uint256 age;
        
    }
    // read to return value function with the view function
    function Retrieval() public view returns (uint256) {
        return MyNum;
        
    }
    
    // Declaration of a dynamic array

    humans[] public stud;

    // array DS pushing function

    function addStudent(string memory name, uint256 age) public{
        stud.push(humans(name, age));
        mapNametoNum[name] = age; // mapping a name to the age inside this function.
    }


// # calldata, memory and storage
// struct, mapping and array demands that memory or calldata be specified when declaring a string as a parameter.

// mapping a key to a value function initialization
mapping (string => uint) public mapNametoNum;
    
}
