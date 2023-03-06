import { useRef, useState } from "react";
import './AddFormPage.scss';
import Button from "../componets/Button";
import { validateContactName, validateContactPnone } from "../helpers/validator";

function AddForm({ onSave }) {
    const [saveContact, setSaveContact] = useState(false);

    const[errorContactName, setErrorContactName] = useState(false);
    const[errorContactPhone, setErrorContactPhone] = useState(false);

    const contactName = useRef('');
    const contactPhone = useRef('');

    const handleSave = () => {
        const newContactSave = {};
        const contactNameValue = contactName.current.value;
        const isNameValid = validateContactName(contactNameValue);
        if(!isNameValid) {
            setErrorContactName(true);
        } else {
            setErrorContactName(false);
            newContactSave.id = Date.now();
            newContactSave.name = contactNameValue;
        }
    
        const contactPhoneValue = contactPhone.current.value;
        const isPhoneValid = validateContactPnone(contactPhoneValue);
        if(!isPhoneValid) {
            setErrorContactPhone(true);
        } else {
            setErrorContactPhone(false);
            newContactSave.phone = contactPhoneValue;
        }
    
        onSave(newContactSave);
        setSaveContact(true);
        contactName.current.value = '';
        contactPhone.current.value = '';
    }
    
    return ( 
        <div className="container">
            {!saveContact && (
            <form className="contacts-block_form">
                <h2>Add new contact</h2>
                <p>
                    <input type="text" name="contactName" ref={contactName} placeholder="Name and Surname"/>
                    {errorContactName && <span className="error">Fill your name and surname correctly!</span>}
                </p>
                <p>
                    <input type="text" name="contactPhone" ref={contactPhone} placeholder="Pnone number"/>
                    {errorContactPhone && <span className="error">Fill your pnone number correctly!</span>}
                </p>
                <p>
                    <Button value="Save contact" id="btn_save" callback={handleSave} className="btn _save"/>
                </p>
            </form>)}
            {saveContact && (
                <div className="info_block">New contact added to phonebook!</div>
            )}
        </div>
     );
}

export default AddForm;