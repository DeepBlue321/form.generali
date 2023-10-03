import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Container, Paper, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { phoneRegExp } from "../lib/Regex";

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

function MyForm() {
  const [selectedValue, setSelectedValue] = useState("Čeština");

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
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
      <Paper elevation={3} style={{ padding: "20px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Jméno"
                margin="normal"
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
                margin="normal"
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
                margin="normal"
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
                onChange={handleChange}
              >
                {languages.map((value) => {
                  return <MenuItem value={value}>{value}</MenuItem>;
                })}
              </Select>
            )}
          />

          <Button
            disabled={isDirty}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default MyForm;
