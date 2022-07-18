import React, {useState} from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, GridSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import { CharForm } from '../../components'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1, minWidth: 50 },
  {
    field: 'primary_name',
    headerName: 'Name',
    width: 50,
    editable: true,
  },
  {
    field: 'secret_identity',
    headerName: 'Public Identity',
    width: 100,
    editable: true,
  },
  {
    field: 'aliuses',
    headerName: 'Aliuses',
    width: 100,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 150
  },
  {
    field: 'first_appearance',
    headerName: 'First Appearance',
    width: 50
  },
  {
    field: 'comics_appeared_in',
    headerName: '# of Appearances',
    width: 50
  },
  {
    field: 'abilities',
    headerName: 'Abilities',
    width: 150
  },
  {
    field: 'original_creator',
    headerName: 'Creator',
    width: 100
  }
];

interface gridData{
  data:{
    id?:string;
    name?:string;
  }
}

export const DataTable = () => {
    let {charData, getData} = useGetData();
    let[open, setOpen] = useState(false);
    let[gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () => setOpen(true);
    let handleClose = () => setOpen(false);

    let deleteData = async () =>{
        await serverCalls.delete(`${gridData[0]}`)
        getData();
    }
    console.log(gridData)

    return (
        <Box sx={{height: 400, width: '100%'}}>
            <DataGrid 
                rows={charData}
                columns = {columns}
                pageSize = {10}
                rowsPerPageOptions = {[10]}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={newSelectionModel =>setData(newSelectionModel)}
                {...charData}
            />
            <Button onClick={handleOpen}>Update</Button>
            <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update A Character</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Character id: {gridData[0]}</DialogContentText>
                        <CharForm id={`${gridData[0]}`}/>
                    </DialogContent>
                <DialogActions>
                    <Button onClick = {handleClose} color="warning" variant='contained'>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}