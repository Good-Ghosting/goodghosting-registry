// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.7;

import "@openzeppelin/contracts/access/AccessControl.sol";

// custom errors
error DUPLICATE_POOL();
error INVALID_POOL();
error NOT_AUTHORIZED();
error POOL_DOES_NOT_EXIST();

/**
@notice Registry Contract to keep a track of all goodghosting contracts.
*/
contract Registry is AccessControl {
    event LOG_NEW_POOL(address indexed caller, address indexed pool);

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    // mapping with pool address as the key
    mapping(address => bool) public poolStatus;

    address[] public pools;

    /**
    @dev checks if a pool address is valid
    @param _pool pool contract address
    */
    function isValid(address _pool) internal view {
        uint32 size;
        assembly {
            size := extcodesize(_pool)
        }
        if (size == 0) {
            revert INVALID_POOL();
        }

        if (poolStatus[_pool]) {
            revert DUPLICATE_POOL();
        }
    }

    /**
    @dev Constructor granting admin role
    */
    constructor(address _admin) {
        _setRoleAdmin(ADMIN_ROLE, ADMIN_ROLE);
        _setRoleAdmin(OPERATOR_ROLE, ADMIN_ROLE);
        _grantRole(ADMIN_ROLE, _admin);
    }

    /**
    @dev Add pools in the registry
    @param _pools addresses of the pools
    */
    function addContract(address[] memory _pools) external {
        if (hasRole(ADMIN_ROLE, msg.sender) || hasRole(OPERATOR_ROLE, msg.sender)) {
            for (uint256 i = 0; i < _pools.length; ) {
                isValid(_pools[i]);
                pools.push(_pools[i]);
                poolStatus[_pools[i]] = true;
                emit LOG_NEW_POOL(msg.sender, _pools[i]);
                unchecked {
                    ++i;
                }
            }
        } else {
            revert NOT_AUTHORIZED();
        }
    }

    /**
    @dev Remove a pool from the registry
    @param _pool address of the pool to be removed
    */
    function removeContract(address _pool) external {
        if (hasRole(ADMIN_ROLE, msg.sender)) {
            if (!poolStatus[_pool]) {
                revert POOL_DOES_NOT_EXIST();
            }
            for (uint256 i = 0; i < pools.length; ) {
                if (pools[i] == _pool) {
                    pools[i] = address(0);
                }
                unchecked {
                    ++i;
                }
            }
            poolStatus[_pool] = false;
        } else {
            revert NOT_AUTHORIZED();
        }
    }
}
