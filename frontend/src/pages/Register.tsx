import { useState } from "react";
import { Box, Input, Button, VStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const Register = () => {
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!userName) return alert("Please enter a userName.");
        try {
            const response = await fetch("http://localhost:3000/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName }),
            });
            const data = await response.json();
            if (data.uid) {
                localStorage.setItem("uid", data.uid);
                navigate("/home");
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <Box maxW="md" mx="auto" mt="10">
            <Heading mb="6">Register</Heading>
            <VStack spacing={4}>
                <Input
                    placeholder="Enter your userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <Button colorScheme="teal" onClick={handleRegister}>
                    Register
                </Button>
            </VStack>
        </Box>
    );
};

export default Register;
