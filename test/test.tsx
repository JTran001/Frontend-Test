'use client'

import React, {useState} from 'react';
import styles from './test.module.css';

export default function test (): JSX.Element {
    // Your Test Starts Here
    
    const [inputValue, setInputValue] = useState<string>(''); 
    const [todoList, setTodoList] = useState<string[]>([]);
    const [error, setError] = useState<string>(''); // State to track error message
    const [editIndex, setEditIndex] = useState<number | null>(null); // Track which item is being edited
    const [editValue, setEditValue] = useState<string>(''); // Track the value of the edit field

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      if (e.target.value.trim()) {
        setError(''); // Clear error if user starts typing
      }
    };
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (inputValue.trim() === '') {
        setError('Task cannot be empty'); // Set error message
      } else {
        setTodoList((prevList) => [...prevList, inputValue]);
        setInputValue('');
        setError(''); // Clear error after successful submission
      }
    };
  
    const handleDelete = (index: number) => {
      setTodoList((prevList) => prevList.filter((_, i) => i !== index));
    };

    const handleEdit = (index: number) => {
      setEditIndex(index); // Set the index of the item being edited
      setEditValue(todoList[index]); // Set the current value of the item in the edit input
    };

    const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
      setEditValue(e.target.value); // Update the value as the user types in the edit input
    };

    const handleEditSubmit = (index: number) => {
      const updatedList = [...todoList];
      updatedList[index] = editValue; // Update the specific item
      setTodoList(updatedList); // Save the updated list
      setEditIndex(null); // Exit edit mode
      setEditValue(''); // Clear the edit input
    };
  
    return (
      <div className={styles.container}>
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

      {error && <p className={styles.errorMessage}>{error}</p>}

      {todoList.length > 0 ? (
        <ul className={styles.todoList}>
          {todoList.map((item, index) => (
            <li key={index} className={styles.todoItem}>
              {editIndex === index ? (
                // Show input field when in edit mode
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
                  {item}
                  <div className={styles.buttonContainer}> {/* New wrapper div for buttons */}
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
        <p>No tasks added yet!</p>
      )}
    </div>
    );
}
