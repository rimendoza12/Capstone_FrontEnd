import React from 'react'
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Alert, CircularProgress, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, Grid} from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import toast from 'react-hot-toast';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

function Services() {

  const [data, setData]= useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useState();
  const [success, setSuccess] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [id, setId] = useState('');

  const apiBackendUrl = process.env.REACT_APP_BACK_END_URL;

  
  const [formData, setFormData] = useState({
    service_name: '',
    service_details: '',
    service_price: ''
  });

  const columns = [
    {
      name: 'User Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'Email Address',
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: 'Actions',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          return ( 
            <>
              <Button
                variant="text"
                startIcon={<EditIcon />}
                color="primary"
                onClick={() => handleEdit(rowIndex)}
              >
                Edit
              </Button>
              <Button
                variant="text"
                startIcon={<DeleteIcon />}
                color="error"
                onClick={() => handleDelete(rowIndex)}
              >
                Delete
              </Button>
            </>
          );
        },
      },
    },
  ];

const options = {
  filterType: 'checkbox',
};


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiBackendUrl}/login`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('login_token'),
          },
      });

      let user = response.data.user;
      setData(user);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
    fetchData();
}, [success]);

  const handleAdd = () => {
      setOpen(true);
      setFormData({
       name:'',
       email:'',
      });
      setTransactionType('add');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {

    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitLoading(true);

    if (!validateForm()) {
      setSubmitLoading(false);
      return;
    } else {
      try {
        if (transactionType === 'add') {
          const response = await axios.post(`${apiBackendUrl}/login`, formData, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('login_token'),
            },
          });
          console.log(response);
        } else if (transactionType === 'edit') {
          console.log(apiBackendUrl )
          const response = await axios.put(`${apiBackendUrl}/services/${id}`, formData, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('login_token'),
            },
          });
          console.log(response);
        } else if (transactionType === 'delete') {
          const response = await axios.delete(`${apiBackendUrl}/services/${id}`, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('login_token'),
            },
          });
          console.log(response);
          // handleClose();
          // setSuccess(true);
        // navigate('/');
      } 
    } catch (error) {
      let errorMessage = error.response.data.error;
      setError(errorMessage);
    }
    setSubmitLoading(false);
  }
  };

  
  const handleEdit = (rowIndex) => {
    const rowData = data[rowIndex];
    setOpen(true);
    setSuccess(false);
    setId(rowData.id);
    setFormData({ name: rowData.name, email: rowData.email });
    setTransactionType('edit');
  };

  const handleDelete = (rowIndex) => {
    const rowData = data[rowIndex];
    setOpen(true);
    setSuccess(false);
    setId(rowData.id);
    setFormData({ name: rowData.name, email: rowData.email });
    setTransactionType('delete');
  };

  const validateForm = () => {
    if (formData.name === undefined || formData.name === '') {
      setError('Name is required!');
      return false;
    } else if (formData.email === undefined || formData.email === '') {
      setError('Email is required!');
      return false;
    }

    return true;
  };

  return (
    <div style={{marginTop: '50px'}}>

  <div style={{ display: 'flex', justifyContent:'end', marginBottom: '10px'}}>
      <Button variant='outlined' color='secondary' startIcon={<AddCircleIcon/>}
      onClick={handleAdd}>
      {/* Add */}
      </Button>
      </div>
      {loading ? (
        <div style={{marginTop: '80px', display:'flex', justifyContent: 'center'}}>
          <CircularProgress />
          </div>
      ) : (
            
    <MUIDataTable
    loading={loading}
  title={"Service List"}
  data={data.map((d) => {
    return [d.name, d.address];
  })}
  columns={columns}
  options={options}
/>
      )}

        <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        
        {transactionType === 'add'
            ? 'Add Services'
            : transactionType === 'edit'
            ? 'Edit Services'
            : 'Delete Services'
            }
          
          {error && <Alert severity="error">{error}</Alert>}

        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Grid container spacing = {2}>
            
            <Grid item xs={12}>
            <TextField
          id="name"
          fullWidth
          label="Name"
          name="name"
          variant="standard"
          disabled={transactionType === 'delete' ? true : false}
          value={formData.service_name}
          onChange={handleChange}
        />
            </Grid>
            <Grid item xs={12}>
            <TextField
          id="address"
          fullWidth
          label="Address"
          name="address"
          variant="standard"
          disabled={transactionType === 'delete' ? true : false}
          value={formData.service_details}
          onChange={handleChange}
        />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
        <Button
          variant="contained"
          style={{ display: 'block', width: '40%', margin: '10px auto' }}
        onClick={handleSubmit}
        disabled={submitLoading}
        >
          {submitLoading ? <CircularProgress size={'10px'} /> : ''} 
          {transactionType === 'add'
              ? 'Add Services'
              : transactionType === 'edit'
              ? 'Edit Services'
              : 'Delete Services'}
        </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
    
  )
}


export default Services