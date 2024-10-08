import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user details by ID
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/users/${id}`);
                setUser(response.data);
            } catch (error) {
                setError('שגיאה בהבאת פרטי המשתמש. אנא נסה שוב.'); // Generic error message
                console.error('שגיאה בהבאת פרטי המשתמש 🛑:', error);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error message before submission

        try {
            await axios.put(`/users/${id}`, user);
            navigate('/users');
        } catch (error) {
            setError('שגיאה בעדכון פרטי המשתמש. אנא נסה שוב.'); // Generic error message
            console.error('שגיאה בעדכון פרטי המשתמש 🛑:', error);
        }
    };

    if (!user) return <div>🔄 טוען...</div>;

    return (
        <PageContainer>
            <ContentBox>
            <Link to="/users">
        <HomeButton> חזור  </HomeButton>
      </Link>
                <Header>עריכת פרטי משתמש ✏️</Header>
                {error && <ErrorMessage>{error}</ErrorMessage>} {/* Display error message */}
                <Form onSubmit={handleSubmit}>
                    <Label>
                        שם משתמש 🧑‍💻:
                        <Input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            required
                        />
                    </Label>
                    <Label>
                        סיסמה 🔒:
                        <Input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </Label>
                    <Label>
                        אימייל 📧:
                        <Input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </Label>
                    <Label>
                        תפקיד 🎭:
                        <Select
                            name="role"
                            value={user.role}
                            onChange={handleChange}
                        >
                            <option value="user">משתמש 👤</option>
                            <option value="student_college">תלמיד במוסד לימודים 🎓</option>
                            <option value="student_school">תלמיד בבית ספר 🏫</option>
                        </Select>
                    </Label>
                    <SubmitButton type="submit">עדכן משתמש 🔄</SubmitButton>
                </Form>
            </ContentBox>
        </PageContainer>
    );
};

export default EditUser;

// Styled Components
const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9f9f9;
`;

const ContentBox = styled.div`
    width: 100%;
    max-width: 600px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
`;

const Header = styled.h1`
    font-size: 2em;
    color: #333;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Label = styled.label`
    display: flex;
    flex-direction: column;
    font-size: 1em;
    color: #555;
`;

const Input = styled.input`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 1em;
`;

const Select = styled.select`
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 1em;
`;

const SubmitButton = styled.button`
    padding: 10px 15px;
    background-color: #00aaff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;

    &:hover {
        background-color: #0088cc;
    }
`;
const HomeButton = styled.button`
  padding: 10px 15px;
  background-color: #142e99;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    background-color: #0f1e66; /* Darker shade on hover */
  }
`;
const ErrorMessage = styled.p`
    color: red;
    text-align: center;
`;
