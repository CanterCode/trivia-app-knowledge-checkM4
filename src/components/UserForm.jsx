import { useState } from 'react';
import './cssUserForm.css';

function UserForm ({ onFormSubmit }) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        difficulty: ""
    });
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        const { name, category, difficulty } = formData;
        if (!name || !category || !difficulty) {
            setError("All fields are required");
            return false;
        }
        setError("");
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) return;
        onFormSubmit(formData);
    }

    return (
        <div>
            <p>1. Type in your name and select a category/difficulty level.<br />
            2. Click "Get Question", and select an answer.<br />
            3. Submit your answer and see if you are correct!<br />
            4. Click "New Question" to continue playing!
            </p>
            
            <form>
                <fieldset>
                    <label htmlFor="name">Name:</label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    />
                </fieldset>
                
                <fieldset>
                    <label htmlFor="category">Select Category:</label>
                    <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    >
                        <option value="" disabled>-----</option>
                        <option value="9">General Knowledge</option>
                        <option value="21">Sports</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="17">Science and Nature</option>
                        <option value="22">Geography</option>
                    </select>
                </fieldset>
                
                <fieldset>
                    <label htmlFor="difficulty">Select Difficulty:</label>
                    <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    required
                    >
                        <option value="" disabled>-----</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </fieldset>
                
                <fieldset>
                    <button type="submit" onClick={handleSubmit}>Get Question</button>
                </fieldset>
            </form>
        
        </div>
    )
}

export default UserForm;