import {useState} from 'react'
import Button from "./Button"
import { server_calls } from '../api/server';
import Modal from "./Modal"
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetData } from '../custom-hooks/FetchData';

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90,
    },
    {
        field: 'first',
        headerName: 'First Name',
        flex: 1
    },
    {
        field: 'last',
        headerName: 'Last Name',
        flex: 1
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 1
    },
    {
        field: 'phone_number',
        headerName: 'Phone',
        flex: 1
    },
    {
        field: 'address',
        headerName: 'Address',
        flex: 2
    },
    

]

function DataTable() {
    let [open, setOpen] = useState(false);
    
    const {contactData, getData} = useGetData();
    const [selectionModel,setSelectionModel] = useState<string[]>([])
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const deleteData = () => {
        server_calls.delete(selectionModel);
        getData();
        console.log(`Selection model: ${selectionModel}`)
        setTimeout(() => {window.location.reload()}, 500)
    }
    return (
    <>
        <Modal id={selectionModel} open={open} onClose={handleClose}/>
        <div className="flex flex-row">
            <div>
                <button onClick={() => handleOpen()} className="p-3 bg-slate-300 rounded hover:bg-slate-800 hover:text-white m-3">
                    Create New Contact
                </button>
            </div>
            <Button onClick={handleOpen} className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white">Update</Button>
            <Button onClick={deleteData} className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white">Delete</Button>
        </div>
        {/* Data Table Section */}
        <div className={open ? "hidden" : "container mx-10 my-5 flex flex-col"} style={{height: 400, width: '100%'}}>
      <h2 className='p-3 bg-slate-300 my-2 rounded'>My Contacts</h2>
      <DataGrid rows={contactData} columns={columns}
        pageSizeOptions={[6]}
        checkboxSelection
        onSortModelChange={(item : any) => {setSelectionModel(item)}}
        columnVisibilityModel={{id : false}}
      />
    </div>
    </>
  )
}

export default DataTable