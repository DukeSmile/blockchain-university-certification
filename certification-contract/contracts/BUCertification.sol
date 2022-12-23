// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract BUCertification is AccessControl, Ownable {
    struct Catalog {
        string name;
        string photo;
        string id;
        string detail;
    }
    struct Documents {
        address wallet_address;
        string date;
        string [] processes;
        Catalog catalog;
    }
    bytes32 public constant INSTITUTE_ROLE = keccak256("INSTITUTE_ROLE_UNIVERSITY");
    bytes32 public constant STUDENT_ROLE = keccak256("STUDENT_ROLE_UNIVERSITY");

    mapping(address=>Documents) private certifications;
    mapping(address=> mapping(address=> uint)) private accessInformation;

    event GenerateCertification(
        address indexed wallet_address,
        uint256 timestamp
    );

    constructor(address _admin) {
        _setupRole(INSTITUTE_ROLE, _admin);
    }
    
    function generateCertification(address student_address, string calldata _date, string[] calldata _processes, Catalog calldata _catalog) external {
        require (hasRole(INSTITUTE_ROLE, msg.sender), 'You can not create certification');
        require (!hasRole(STUDENT_ROLE, student_address), 'Wallet address is already registered!');
        certifications[student_address] = Documents({
            wallet_address: student_address,
            date: _date,
            processes: _processes,
            catalog: _catalog
        });

        // accessInformation[student_address][msg.sender] = true;
        // accessInformation[student_address][student_address] = true;

        _setupRole(STUDENT_ROLE, student_address);
        emit GenerateCertification(student_address, block.timestamp);
    }

    function getCertification(address student_address, address _from, uint today) external view returns (Documents memory) {
        require (hasRole(STUDENT_ROLE, student_address), "There is no certification matched with this wallet");
        require (today - accessInformation[student_address][_from] < 3600, "You cannot access this student certification");
        return certifications[student_address];
    }

    function giveAccess(address _address, uint date) external {
        require (hasRole(STUDENT_ROLE, msg.sender), 'You dont have certification!');
        accessInformation[msg.sender][_address] = date;
    }

    function renounceRole(bytes32 role, address account) public override{
        revert("disabled");
    }

    function renounceOwnership() public override{
        revert("disabled");
    }
}
