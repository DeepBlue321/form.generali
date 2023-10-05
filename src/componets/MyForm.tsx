import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Container, Paper, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { phoneRegExp } from "../lib/Regex";
import styled from "@emotion/styled";

interface FormData {
  name: string;
  telephone: string;
  email: string;
  language: string;
}

const languages = ["Čeština", "Angličtina", "Slovenčtina"];

const schema = Yup.object().shape({
  name: Yup.string().required("Pole jméno je poviné"),
  telephone: Yup.string()
    .matches(phoneRegExp, "Nesprávný formát telefoního čísla")
    .required(),
  email: Yup.string()
    .email("Nesprávný formát emailu")
    .required("Pole Email je poviné"),
  language: Yup.string()
    .email("Invalid email")
    .required("Pole Email je poviné"),
});

const MyStyledButton = styled("button")({
  padding: 10, // means "1px", NOT "theme.spacing(1)"
  background: "#CB5F5D",
  color: "white",
  border: "none",
  borderRadius: 6,
  marginLeft: "auto",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  cursor: "pointer",
});

const MyStyledForm = styled("form")((props) => ({
  display: "flex",
  flexDirection: "column",
  gap: 14,
  paddingTop: "30%", // means "1px", NOT "theme.spacing(1)"
}));

function MyForm() {
  const [selectedValue, setSelectedValue] = useState("Čeština");

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // Handle form submission logic here
    console.log(data);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <MyStyledForm onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Jméno"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="telephone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Telefon"
              error={!!errors.telephone}
              helperText={errors.telephone?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="language"
          control={control}
          defaultValue=""
          render={({}) => (
            <Select
              fullWidth
              value={selectedValue}
              label="Hlavní jazyk"
              margin="dense"
              onChange={handleChange}
            >
              {languages.map((value) => {
                return <MenuItem value={value}>{value}</MenuItem>;
              })}
            </Select>
          )}
        />

        <MyStyledButton type="submit">Submit</MyStyledButton>
      </MyStyledForm>
    </Container>
  );
}

export default MyForm;
