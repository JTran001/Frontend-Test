'use client'

import React, {useState} from 'react';
import styles from './test.module.css';

export default function test (): JSX.Element {
    // Your Test Starts Here
    
    // List of state hooks and variables
    const [inputValue, setInputValue] = useState<string>(''); // State to track user input in form
    const [todoList, setTodoList] = useState<string[]>([]);   // State to track the todo list
    const [error, setError] = useState<string>('');           // State to track error message
    const [editIndex, setEditIndex] = useState<number | null>(null); // Track which item is being edited
    const [editValue, setEditValue] = useState<string>(''); // Track the value of the edit field

    /**
     * Handles changes to the text input fields in the form for adding an new item to list.
     * Also clears the error message if input when user starts typing.
     * 
     * @param e represents the changing event.
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      if (e.target.value.trim()) {
        setError('');
      }
    };
  
    /**
     * Handles the form submission when adding a new item to the list.
     * Prevents refreshing after submission.
     * Also checks for errors (if input is empty), if not empty add item to list.
     * 
     * 
     * @param e represents the event for form submission.
     */
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (inputValue.trim() === '') {
        setError('Task cannot be empty');
      } else {
        setTodoList((prevList) => [...prevList, inputValue]);
        setInputValue('');
        setError(''); 
      }
    };
  
    /**
     * Delete an item from the current todo list.
     * 
     * 
     * @param index represents the index of the item to delete. 
     */
    const handleDelete = (index: number) => {
      setTodoList((prevList) => prevList.filter((_, i) => i !== index));
    };

    /**
     * This is used to begin editing an existing item in the list.
     * It sets the selected item's values and index to the their respective state.
     * 
     * @param index  the index of the item to edit.
     */
    const handleEdit = (index: number) => {
      setEditIndex(index); 
      setEditValue(todoList[index]); 
    };

    /**
     * Handles the input changes in the text input for editing an item.
     * 
     * @param e the event representing the edit field
     */
    const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
      setEditValue(e.target.value); 
    };

    /**
     * Handles the submission for the edited item by updating it from the list. 
     * After submission it resets the edit index and value states.
     * 
     * @param index 
     */
    const handleEditSubmit = (index: number) => {
      const updatedList = [...todoList];
      updatedList[index] = editValue; 
      setTodoList(updatedList); 
      setEditIndex(null); 
      setEditValue(''); 
    };
  
    return (
      <div className={styles.container}>
      {/* Form for adding a new task */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter a task"
          className={error ? styles.inputError : styles.input}
        />
        <button type="submit" className={styles.button}>
          Add
        </button>
      </form>

      {/* If text input is empty, display error message */}
      {error && <p className={styles.errorMessage}>{error}</p>}

      {/* Display todo list if there is an item, otherwise display "No items in the list" */}
      {todoList.length > 0 ? (
        <ul className={styles.todoList}>
          {todoList.map((item, index) => (
            <li key={index} className={styles.todoItem}>
              {/* If an item is selected for edit go into edit mode */}
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={handleEditChange}
                    className={styles.input}
                  />
                  <button
                    onClick={() => handleEditSubmit(index)}
                    className={styles.button}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {/* display items in the list and add a edit and delete button to each item */}
                  {item}
                  <div className={styles.buttonContainer}> 
                    <button
                      onClick={() => handleEdit(index)}
                      className={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in the list!</p>
      )}
    </div>
    );
}
