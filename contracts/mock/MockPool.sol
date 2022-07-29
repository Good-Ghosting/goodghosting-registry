// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.7;

import "../interfaces/IPool.sol";

contract MockPool is IPool {
    function isWinner(address) external pure override returns (bool) {
        return true;
    }

    /// @dev Checks if the game is completed or not.
    /// @return "true" if completeted; otherwise, "false".
    function isGameCompleted() external pure override returns (bool) {
        return true;
    }
}
