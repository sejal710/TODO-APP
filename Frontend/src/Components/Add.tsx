import { FaPlus } from 'react-icons/fa';
import '../css/Add.css'
import {useState,useRef} from 'react'
import { Modal, Button,OverlayTrigger, Tooltip } from 'react-bootstrap';
import {toast} from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';

interface AddProps {
  fetchData : () => void;
}

export default function Add({fetchData}:AddProps) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addData, setAdddData] = useState({
    title: "",
    description: "",
    image: ""
  });
  const tooltipRef = useRef<Tooltip>(null);

  const showTooltip = () => {
    if (tooltipRef.current != null) {
      tooltipRef.current.show();
      setTimeout(() => {
        if (tooltipRef.current != null) {
          tooltipRef.current.hide();
        }
      }, 3000);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdddData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleAdd = () => {
    setAddModalOpen(true);
  }
  const handleCanceladd = () => {
    setAddModalOpen(false);
  }
  const handleConfirmAdd = async() => {
    try{
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/addtodo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(addData)
    })
    if (!response.ok) {
      toast.error("Data ws not Added")
      throw new Error('Error: Unable to post data');
    }

    const data = await response.json();
    console.log('Data posted successfully:', data);
    setAddModalOpen(false);
    toast.success("Data Added Successfully")
    fetchData()
    }
    catch(e){
      toast.error("Data ws not Added")
      console.log("Error Message",e)
    }
  }

 

  return (
    <>
     <OverlayTrigger
          placement='top'
          overlay={<Tooltip ref={tooltipRef}>Add Data</Tooltip>}
          trigger={['hover', 'focus']}
        >
    <div className="add-icon" onClick={handleAdd} onMouseEnter={showTooltip}>
        <FaPlus />
    </div>
</OverlayTrigger>
    <Modal show={addModalOpen} onHide={handleCanceladd}>
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
                value={addData.title}
                onChange={handleChange}
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label>Description</label>
              <input
                type='text'
                name='description'
                value={addData.description}
                onChange={handleChange}
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label>Image</label>
              <input
                type='text'
                name='image'
                value={addData.image}
                onChange={handleChange}
                className='form-control'
              />
            </div>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleConfirmAdd} style={{backgroundColor:"#F44336"}}>
            Add
          </Button>
          <Button variant='secondary' onClick={handleCanceladd}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  )
}
