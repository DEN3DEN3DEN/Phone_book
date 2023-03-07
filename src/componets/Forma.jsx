import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { validateContactName, validateContactPnone } from "../helpers/validator";
import Button from "./Button";
import './Forma.scss';

function Form (props) {
    const params = useParams();
    const [editName, setEditName] = useState("");
    const [editPhone, setEditPhone] = useState("");

    const [saveContact, setSaveContact] = useState(false);

    const[errorContactName, setErrorContactName] = useState(false);
    const[errorContactPhone, setErrorContactPhone] = useState(false);

    const contactName = useRef('');
    const contactPhone = useRef('');

    useEffect(() => {
        if(props.item) {
        props.item.forEach(element => {
            setEditName(element.name)
            setEditPhone(element.phone)
            });
        }
    }, [props.item]);

    const handleSave = () => {
        const editContactSave = {};
        const contactNameValue = contactName.current.value;
        const isNameValid = validateContactName(contactNameValue);
        let indexSave = 0;
        if(!isNameValid) {
            setErrorContactName(true);
        } else {
            setErrorContactName(false);
            if (params.contactId !== undefined) {
                editContactSave.id = params.contactId;
            } else {
                editContactSave.id = Date.now();
            }
            editContactSave.name = contactNameValue;
            indexSave++;
        }

        const contactPhoneValue = contactPhone.current.value;
        const isPhoneValid = validateContactPnone(contactPhoneValue);
        if(!isPhoneValid) {
            setErrorContactPhone(true);
        } else {
            setErrorContactPhone(false);
            editContactSave.phone = contactPhoneValue;
            indexSave++;
        }

        if (indexSave === 2) {
            props.onSave(editContactSave);
            setSaveContact(true);
        }
    }

    return ( 
        <div>
        <div className="container">
        {!saveContact && (
        <form className="contacts-block_form">
            <h2>{props.title}</h2>
            <div>
                <p>{editName !== "" ?
                    <input type="text" name="contactName" defaultValue={editName} ref={contactName} placeholder="Name and Surname"/> :
                    <input type="text" name="contactName" ref={contactName} placeholder="Name and Surname"/>}
                    {errorContactName && <span className="error">Fill your name and surname correctly!</span>}
                </p>
                <p>{editPhone !== "" ?
                    <input type="text" name="contactPhone" defaultValue={editPhone} ref={contactPhone} placeholder="Pnone number"/> :
                    <input type="text" name="contactPhone" ref={contactPhone} placeholder="Pnone number"/>}
                    {errorContactPhone && <span className="error">Fill your pnone number correctly!</span>}
                </p>
                <p>
                    <Button value="Save contact" id="btn_save" callback={handleSave} className="btn _save"/>
                </p>
            </div>
        </form>)}
        {saveContact && (
            <div className="info_block">New contact added to phonebook!</div>
        )}
    </div>
    </div>
    );
}

export default Form;

