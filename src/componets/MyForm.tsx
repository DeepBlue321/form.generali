import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Container, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { phoneRegExp } from "../lib/Regex";
import styled from "@emotion/styled";

interface FormData {
  name: string;
  telephone: string;
  email: string;
  language?: string;
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
  language: Yup.string(),
});

const MyStyledButton = styled(Button)(() => ({
  background: "#CB5F5D",
  width: "100px",
  marginLeft: "auto",
}));

const MyStyledForm = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 14,
  paddingTop: "30%",
}));

function MyForm() {
  const [selectedValue, setSelectedValue] = useState("Čeština");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    alert(`email: ${data.email}
    jazyk: ${selectedValue}
    Jméno: ${data.name}
    číslo: ${data.telephone}`);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <MyStyledForm>
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
          render={({ field }) => (
            <Select
              fullWidth
              {...field}
              value={selectedValue}
              label="Hlavní jazyk"
              margin="dense"
              type="selectedValue"
              onChange={handleChange}
            >
              {languages.map((value, id) => {
                return (
                  <MenuItem key={id} value={value}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
          )}
        />
        <MyStyledButton
          disabled={Object.keys(errors).length > 0}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </MyStyledButton>
      </MyStyledForm>
    </Container>
  );
}

export default MyForm;
