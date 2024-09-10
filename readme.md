# Tic-Tac-Toe Game Project

## Overview

This project is a simple **Tic-Tac-Toe** game built using **HTML**, **CSS**, and **JavaScript**. The main goal was to organize the code using modular programming principles, which significantly helped me enhance my **structural thinking** and deepen my understanding of **Immediately Invoked Function Expressions (IIFE)**.

## How the Code Helped Me with Structural Thinking

This project reinforced the importance of structuring code in a logical and modular way. By breaking the game into smaller, manageable pieces (like the `Gameboard`, `Player`, `GameController`, and `DisplayController` modules), I learned how to:

1. **Encapsulate functionality**: Each piece of logic has a clear responsibility, whether it's managing the game state (`Gameboard`), handling players (`Player`), controlling the game flow (`GameController`), or updating the user interface (`DisplayController`). This separation of concerns made it easier to develop and debug.
   
2. **Reduce global variables**: By placing most of the logic within IIFEs, I ensured that variables and functions were **scoped locally**, reducing the chances of conflicts and unexpected behavior. This approach helped me think more critically about where each piece of code belongs.

3. **Think modularly**: Structuring the code into different modules taught me to think in terms of **reusable and independent components**, which can be plugged into the larger system without relying on global variables or tightly coupling them together.

## Learning IIFE

This project introduced me to **Immediately Invoked Function Expressions (IIFE)**, a pattern I hadn’t used before. IIFEs helped me:

- **Limit scope**: By immediately executing functions, I was able to create modules that exposed only the necessary methods while keeping internal logic private. This led to cleaner, more secure code.
  
- **Organize code**: IIFEs acted like containers for each module, ensuring that different pieces of functionality are isolated and can’t interfere with each other.

