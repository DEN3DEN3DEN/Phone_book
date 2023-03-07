import Forma from "../componets/Forma";

function AddForm({ onSave }) {
   
    return ( 
        <Forma title="Add new contact" onSave={onSave}/>
     );
}

export default AddForm;