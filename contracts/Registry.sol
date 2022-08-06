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
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    /// @notice mapping with pool address as the key
    mapping(address => bool) public poolStatus;
    /// @notice maps the pool address to its index in the pools array.
    /// @dev if pool is removed, index will be reset to 0, so before using
    // the index, one should always check if the pool status is true (address is registered)
    mapping(address => uint256) public poolIndex;
    /// @notice list of pools
    address[] public pools;

    /// @notice emitted when a pool is added to the registry
    event LOG_NEW_POOL(address indexed caller, address indexed pool);
    /// @notice emitted when a pool is removed from the registry
    event LOG_POOL_REMOVED(address indexed caller, address indexed pool);

    /**
    @dev checks if a pool address is valid
    @param _pool pool contract address
    */
    function isValid(address _pool) internal view {
        uint256 size;
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
                poolIndex[_pools[i]] = pools.length;
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
            uint256 index = poolIndex[_pool];
            pools[index] = address(0);
            poolIndex[_pool] = 0;
            poolStatus[_pool] = false;
            emit LOG_POOL_REMOVED(msg.sender, _pool);
        } else {
            revert NOT_AUTHORIZED();
        }
    }
}
