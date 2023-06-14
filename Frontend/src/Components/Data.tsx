import '../css/Data.css';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useState,useRef } from 'react';
import { Modal, Button,OverlayTrigger, Tooltip  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from 'react-toastify'

export interface DataProps {
  data: {
    _id:string,
    title: string;
    description: string;
    image: string;
  };
  fetchData: (page: number) => void;
}

export default function Data({ data,fetchData }: DataProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    title: data.title,
    description: data.description,
    image: data.image
  });
  const deleteTooltipRef = useRef<Tooltip>(null);
  const updateTooltipRef = useRef<Tooltip>(null);
  
  const showDeleteTooltip = () => {
    if (deleteTooltipRef.current != null) {
      deleteTooltipRef.current.show();
      setTimeout(() => {
        if (deleteTooltipRef.current != null) {
          deleteTooltipRef.current.hide();
        }
      }, 3000);
    }
  };
  
  const showUpdateTooltip = () => {
    if (updateTooltipRef.current != null) {
      updateTooltipRef.current.show();
      setTimeout(() => {
        if (updateTooltipRef.current != null) {
          updateTooltipRef.current.hide();
        }
      }, 3000);
    }
  };
  
  

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async() => {
    // Perform delete action
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/deleteTodo/${data._id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        toast.error("Data not Deleted sucessfully")
        throw new Error('Error: Unable to delete data');
      }
      console.log('Data deleted successfully');
      setDeleteModalOpen(false);
      toast.success("Data Deleted Successfully")
      fetchData(1)
    } catch (e) {
      console.log('Error Message', e);
      toast.error("Data not Deleted Successfully")
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  const handleConfirmUpdate = async() => {
    // Perform update action
    try{
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/updateTodo/${data._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(updatedData)
    })
    if (!response.ok) {
      toast.error("Data not Updated Successfully")
      throw new Error('Error: Unable to post data');
    }

    const fetching = await response.json();
    console.log('Data posted successfully:', fetching);
    toast.success("Data Updated Successfully")
    setUpdateModalOpen(false);
    handleCancelUpdate();
    fetchData(1)
    }
    catch(e){
      console.log("Error Message",e)
      toast.error("Data not Updated Successfully")
    }
  };

  const handleCancelUpdate = () => {
    setUpdateModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className='data'>
      <div className='data_img'>
        <img src={data.image} alt='Data' />
      </div>
      <h3 className='data_title'>{data.title}</h3>
      <p className='data_description'>{data.description}</p>
      <div className='data_buttons'>
      <OverlayTrigger
          placement='top'
          overlay={<Tooltip ref={deleteTooltipRef}>Delete</Tooltip>}
          trigger={['hover', 'focus']}
        >
          <button className='data_button' onClick={handleDelete} onMouseEnter={showDeleteTooltip}>
            <AiOutlineDelete />
          </button>
        </OverlayTrigger>
        <OverlayTrigger
          placement='top'
          overlay={<Tooltip ref={updateTooltipRef}>Update</Tooltip>}
          trigger={['hover', 'focus']}
        >
          <button className='data_button' onClick={handleUpdate} onMouseEnter={showUpdateTooltip}>
            <AiOutlineEdit />
          </button>
        </OverlayTrigger>

      </div>

      <Modal show={deleteModalOpen} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={handleConfirmDelete}>
            Delete
          </Button>
          <Button variant='secondary' onClick={handleCancelDelete}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={updateModalOpen} onHide={handleCancelUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form>
            <div className='form-group'>
              <label>Title</label>
              <input
                type='text'
                name='title'
                value={updatedData.title}
                onChange={handleChange}
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label>Description</label>
              <input
                type='text'
                name='description'
                value={updatedData.description}
                onChange={handleChange}
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label>Image</label>
              <input
                type='text'
                name='image'
                value={updatedData.image}
                onChange={handleChange}
                className='form-control'
              />
            </div>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleConfirmUpdate} style={{backgroundColor:"#F44336"}}>
            Update
          </Button>
          <Button variant='secondary' onClick={handleCancelUpdate}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

