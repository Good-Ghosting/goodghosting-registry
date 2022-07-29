// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.7;

interface IPool {
    function isWinner(address playerAddress) external view returns (bool);

    /// @dev Checks if the game is completed or not.
    /// @return "true" if completeted; otherwise, "false".
    function isGameCompleted() external view returns (bool);
}
