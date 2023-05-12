import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAllUsers } from 'src/api/userApi';
import { Box, Grid, IconButton, TablePagination, TextField } from '@mui/material';
import * as yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Formik, useFormik } from 'formik';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  firstname: yup.string(),
  lastname: yup.string(),
  tagline: yup.string(),
  job: yup.object().shape({
    position: yup.string(),
    workplace: yup.string(),
  }),
  language: yup.string().oneOf(['ES', 'IT', 'PT', 'CA', 'FR', 'EN', 'GR'], 'Language must be one of ES, IT, PT, CA, FR, EN or GR'),  karma: yup.number().required('Karma is required'),
  picture: yup.object().shape({
    file: yup.string(),
    fileName: yup.string(),
    uploadTime: yup.string()
      .matches(
        /^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])T(?:[01][0-9]|2[0-3]):(?:[0-5][0-9]):(?:[0-5][0-9])(?:\.\d{1,3})?(?:Z|[+-][01][0-9]:[0-5][0-9])$/,
        'Upload time must be in the format "YYYY-MM-DDTHH:mm:ss.sssZ"'
      ),
    type: yup.string().oneOf(['file', 'buffer'], 'Picture type must be either "file" or "buffer"'),
  }),
  refreshJWT: yup.object().shape({
    token: yup.string(),
    addedAt: yup.string().required('Added at is required'),
  }),
  password: yup.string().required('Password is required'),
  isVerified: yup.boolean().required('Verification status is required'),
  signInOrigin: yup.string().required('Sign-in origin is required').oneOf(['Google', 'form'], "Signin origin must be 'Google' or 'form'"),
  isCompleted: yup.number(),
  isLogged: yup.boolean(),
  lastLogin: yup.string()
    .matches(
      /^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])T(?:[01][0-9]|2[0-3]):(?:[0-5][0-9]):(?:[0-5][0-9])(?:\.\d{1,3})?(?:Z|[+-][01][0-9]:[0-5][0-9])$/,
      'Last Login must be in the format "YYYY-MM-DDTHH:mm:ss.sssZ"'
    ),
  publicData: yup.object().shape({
    name: yup.boolean().required('Name is required'),
    emails: yup.boolean().required('Emails are required'),
    phones: yup.boolean().required('Phones are required'),
  }),
});

const UserEditForm = (props) =>{

  const {user}= props;

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  React.useEffect (()=>{},[user])

    return(
      <Formik
        initialValues={user}
        validationSchema={{validationSchema}}
        onSubmit={onSubmit}
      >
        {(formik)=>{
        <Grid container ml={2} direction="column" rowSpacing={1} rowGap={3} >
          <Grid  container direction="row" columnSpacing={1}>
            <Grid item>
              <TextField 
                label="ID"
                variant='standard'
                defaultValue={user._id}
                disabled
              />
            </Grid>
            <Grid item>
              <TextField 
                label="User Name"
                variant='standard'
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" columnSpacing={1}>
            <Grid item>
            <TextField
              label="First Name"
              variant="standard"
              name="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
              error={formik.touched.firstname && Boolean(formik.errors.firstname)}
              helperText={formik.touched.firstname && formik.errors.firstname}
            />
            </Grid>
            <Grid item>
            <TextField
              label="Last Name"
              variant="standard"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
            />
            </Grid>
          </Grid>

          <Grid container direction="row" columnSpacing={1}>
            <Grid item xs={12}>
              <TextField 
                label="Tag Line"
                variant='standard'
                rows={3}
                multiline
                fullWidth
                value={formik.values.tagline}
                onChange={formik.handleChange}
                error={formik.touched.tagline && Boolean(formik.errors.tagline)}
                helperText={formik.touched.tagline && formik.errors.tagline}

              />
            </Grid>
          </Grid>

          <Grid container direction="row" columnSpacing={1}>
            <Grid item>
              <TextField 
                label="Job Position"
                variant='standard'
                name="jobposition"
                value={formik.values.job.position}
                onChange={formik.handleChange}
                error={formik.touched.job && Boolean(formik.touched.job.position) && Boolean(formik.errors.job.position)}
                helperText={formik.touched.job && formik.errors.job?.position}
                
              />
            </Grid>
            <Grid item>
              <TextField 
                label="Job Workplace"
                variant='standard'
                name="workplace"
                onChange={formik.handleChange}
                error={formik.touched.job && Boolean(formik.touched.job.workplace) && Boolean(formik.errors.job.workplace)}
              helperText={formik.touched.job && formik.errors.job?.workplace}
                
              />
            </Grid>

            <Grid item>
              <TextField 
                label="Prefered Language"
                variant='standard'
                defaultValue={user.language}
                helperText="Two cap letters format"
                
              />
            </Grid>
            <Grid item>
              <TextField 
                label="Karma"
                variant='standard'
                defaultValue={user.karma}
                helperText="Integer"
                
              />
            </Grid>
          </Grid>

          <Grid container direction="row" columnSpacing={1}>
            <Grid item>
              <TextField 
                label="Picture File"
                variant='standard'
                defaultValue={user.picture.file}
                helperText="Data in base64. Only if buffer"
                
              />
            </Grid>
            <Grid item>
              <TextField 
                label="Picture FileName "
                variant='standard'
                defaultValue={user.picture.fileName}
                helperText="If picture comes from URL"
              />
            </Grid>

            <Grid item>
              <TextField 
                label="Upload Time "
                variant='standard'
                defaultValue={user.picture.uploadTime}
                helperText="In UTC format"
              />
            </Grid>
            <Grid item>
              <TextField 
                label="Type "
                variant='standard'
                defaultValue={user.picture.type}
                helperText="File of BUFFER"
              />
            </Grid>
          </Grid>


          <Grid container direction="row" columnSpacing={1}>
            <Grid item>
              <TextField 
                label="Refresh JWT token"
                variant='standard'
                defaultValue={user.refreshJWT.token}
                helperText="JWT encoded"
              />
            </Grid>
            <Grid item>
              <TextField 
                label="JWT added At"
                variant='standard'
                defaultValue={user.refreshJWT.addedAt}
                helperText="UTC Format"
                
              />
            </Grid>
          </Grid>

          <Grid container direction="row" columnSpacing={1}>
            <Grid item>
              <TextField 
                label="Password"
                variant='standard'
                defaultValue={user.password}
                helperText="Encoded. Sorry"
              />
            </Grid>
            <Grid item>
              <TextField 
                label="Is verified?"
                variant='standard'
                defaultValue={user.isVerified}
                helperText="Boolean"
                
              />
            </Grid>
            <Grid item>
              <TextField 
                label="Sign In Origin"
                variant='standard'
                defaultValue={user.signInOrigin}
                helperText="Google or form"
                
              />
            </Grid>

            <Grid item>
              <TextField 
                label="Is completed?"
                variant='standard'
                defaultValue={user.isCompleted}
                helperText="Numeric. (unused)"
                
              />
            </Grid>
          </Grid>

          <Grid container direction="row" columnSpacing={1}>
            <Grid item>
              <TextField 
                label="Is Logged In?"
                variant='standard'
                defaultValue={user.isLogged}
                helperText="Boolean"
              />
            </Grid>
            <Grid item>
              <TextField 
                label="Last Login"
                variant='standard'
                defaultValue={user.lastLogin}
                helperText="UTC Format"
                
              />
            </Grid>
          </Grid>


          <Grid container direction="row" columnSpacing={1}>
            <Grid item>
              <TextField 
                label="Public Data Name"
                variant='standard'
                defaultValue={user.publicData.name}
                helperText="Bool"
                
              />
            </Grid>
            <Grid item>
              <TextField 
                label="Public Data Emails"
                variant='standard'
                defaultValue={user.publicData.emails}
                helperText="Bool"
              />
            </Grid>

            <Grid item>
              <TextField 
                label="Public Data Phones"
                variant='standard'
                defaultValue={user.publicData.phones}
                helperText="Bool"
              />
            </Grid>
            <Grid item>
              <TextField 
                label="Public Data Social"
                variant='standard'
                defaultValue={user.publicDataSocial}
                helperText="Bool"
              />
            </Grid>
          </Grid>


        </Grid>
        }}
      </Formik>
    )
}

export const StatsUserTable =()=> {
    const [users, setUsers] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [selectedUser, setSelectedUser] = React.useState()
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const handleSeeOnClick = (event, userId)=>{

    }

    const handleEditOnClick = (event, user)=>{
      console.log("EDITANDO ", user.username)
      setSelectedUser(null);
      setSelectedUser(user);


    }

    const handleDeleteOnClick = (event, userId)=>{

    }

    React.useEffect(()=>{
        const fetchUsers = async ()=>{
            await getAllUsers().then((result)=>{
                console.log(result.result)
                setUsers(result.result.reverse())
            }).catch((err)=>{
                console.log(err)
            })
        }

        if (!users || users.length ===0){
             fetchUsers()
        }
    },[users])


  const columns = [
    { id: '-id', label: '_id', minWidth: 170 },
    { id: 'username', label: 'UserName', minWidth: 30 },
    {
      id: 'firstName',
      label: 'First Name',
      maxWidth: 140,
      align: 'right'
    },
    {
      id: 'lastname',
      label: 'Last Name',
      maxWidth: 140,
      align: 'left'
    },
    {
      id: 'karma',
      label: 'Karma',
      minWidth: 5,
      align: 'right',
      format: (value) => value.toFixed(2),
    },

    {
      id: 'actions',
      label: 'Actions',
      minWidth: 50,
      align: 'left',
    },
  ];


    return (
      <Grid container direction="row">
        <Grid item>
          <Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader size='small' sx={{ minWidth: 200 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((user) => (
                      <StyledTableRow
                        key={user._id}
                        hover role="checkbox" 
                        tabIndex={-1}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <StyledTableCell component="th" scope="row">
                          {user._id}
                        </StyledTableCell>
                        <StyledTableCell align="left">{user.username}</StyledTableCell>
                        <StyledTableCell align="right">{user.firstname}</StyledTableCell>
                        <StyledTableCell align="left">{user.lastname}</StyledTableCell>
                        <StyledTableCell align="right">{user.karma}</StyledTableCell>
                        <StyledTableCell align="left"> 
                          <IconButton onClick={(e)=>{e.preventDefault();handleSeeOnClick(e, user._id)}}  size='small'><VisibilityIcon /> </IconButton>
                          <IconButton onClick={(e)=>{e.preventDefault();handleEditOnClick(e, user)}} size='small' ><EditIcon /> </IconButton> 
                          <IconButton onClick={(e)=>{e.preventDefault();handleDeleteOnClick(e, user._id)}}size='small'><PersonRemoveIcon /> </IconButton>  
                        </StyledTableCell>

                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          </Paper>
          </Box>
        </Grid>
        <Grid item>
          {selectedUser && selectedUser!==null && selectedUser!==[] && selectedUser!==undefined?<>
            <UserEditForm key={selectedUser?._id} user={selectedUser} />

          </>:<></>}
        </Grid>
      </Grid>
    );
  }