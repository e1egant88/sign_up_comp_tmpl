import { Box, Grid2, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import Typography from "../typography";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

interface SignupFormInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupFormProps {
  submitButton: React.ReactNode;
}

export default function SignupForm(props: SignupFormProps) {
  const { submitButton } = props;
  const [formInfo, setFormInfo] = useState<SignupFormInfo>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<SignupFormInfo>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    let newErrors: Partial<SignupFormInfo> = {};
    if (!formInfo.firstName.trim())
      newErrors.firstName = "First Name is required";
    if (!formInfo.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formInfo.email.includes("@")) newErrors.email = "Invalid email format";
    if (formInfo.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formInfo.password !== formInfo.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted Successfully", formInfo);
    }
  };

  const eamilIcon = EmailOutlinedIcon;
  return (
    <Box maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h5">Sign Up with email</Typography>
        <Grid2 container spacing="10px">
          <Grid2>
            <TextField
              label="First Name"
              name="firstName"
              value={formInfo.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              fullWidth
            />
          </Grid2>
          <Grid2>
            <TextField
              label="Last Name"
              name="lastName"
              value={formInfo.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              fullWidth
            />
          </Grid2>
        </Grid2>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formInfo.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          placeholder="Email"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formInfo.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formInfo.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          fullWidth
        />

        {/* Render the passed button */}
        <Box sx={{ mt: 2 }}>{submitButton}</Box>
      </Box>
    </Box>
  );
}
