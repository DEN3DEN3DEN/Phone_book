import Button from "./Button";
import './Modal.scss';

function Modal({onClose, onDelete}) {
    const handleCancel = () => {
        onClose();
    }
   
    const handleDelete = () => {
        onDelete();
    }
    
    return ( 

        <div id="popup" className="popup" role="dialog" aria-labelledby="popup_title">
            <div className="popup_block">
                <div className="popup_content">
                    <p id="popup_title" className="popup_text">Are you sure you want to delete this contact?</p>
                    <Button value="Cancel" id={`popup_cancel_${Math.random()}`} callback={handleCancel} onClose={onClose} className="btn popup_cancel" aria-label="Cancel"/>
                    <Button value="Delete" id={`popup_delete_${Math.random()}`} callback={handleDelete} onDelete={onDelete} className="btn popup_delete" aria-label="Delete"/>
                </div>
            </div>
        </div>                
    );
}

export default Modal;