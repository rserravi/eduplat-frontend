import * as React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';
import {Button} from '@mui/material';
import {TextField} from '@mui/material';

const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });
  
export const TypeUserForm = (props)=> {
    const user = useSelector(state => state.user)
    const formik = useFormik({
        initialValues: {
          email: user.email,
          password: 'foobar',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          alert(JSON.stringify(values, null, 2));
        },
      });
    return (
        <React.Fragment>
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                ROLE USER FROM
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                Submit
                </Button>
            </form>
        </React.Fragment>
    );
  }
  