// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;
import "@openzeppelin/contracts/access/AccessControl.sol";
contract BUCertification is AccessControl {
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
    address public immutable OWNER_ADDRESS;
    bytes32 private constant OWNER_ROLE = keccak256("OWNER_ROLE");
    bytes32 private constant INSTITUTE_ROLE = keccak256("INSTITUTE_ROLE");
    bytes32 private constant STUDENT_ROLE = keccak256("STUDENT_ROLE");

    mapping(address=>Documents) private certifications;
    
    event GenerateCertification(
        address indexed wallet_address,
        uint256 timestamp
    );
    constructor(address _admin) {
        OWNER_ADDRESS = _admin;
        _setupRole(OWNER_ROLE, _admin);
        _setupRole(INSTITUTE_ROLE, _admin);
    }
    function generateCertification(address student_address, string calldata _date, string[] calldata _processes, Catalog calldata _catalog) external {
        require (hasRole(OWNER_ROLE, msg.sender), 'You can not create certification');
        require (!hasRole(OWNER_ROLE, student_address), 'We can not use deployer address');
        require (!hasRole(STUDENT_ROLE, student_address), 'Wallet address is already registered!');
        certifications[student_address] = Documents({
            wallet_address: student_address,
            date: _date,
            processes: _processes,
            catalog: _catalog
        });
        _setupRole(STUDENT_ROLE, student_address);
        emit GenerateCertification(student_address, block.timestamp);
    }

    function getCertification() external view returns (Documents memory) {
        require (hasRole(STUDENT_ROLE, msg.sender), 'There is no certification matched with your wallet');
        return certifications[msg.sender];
    }
    function getCertification(address student_address) external view returns (Documents memory) {
        require (hasRole(INSTITUTE_ROLE, msg.sender), "You don't have INSTITUTE role");
        return certifications[student_address];
    }
}
