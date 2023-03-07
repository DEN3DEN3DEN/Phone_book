import Forma from "../componets/Forma";
import './AddFormPage.scss';

function AddForm({ onSave }) {
   
    return ( 
        <Forma title="New contact" onSave={onSave}/>
     );
}

export default AddForm;