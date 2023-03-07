import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Forma from "../componets/Forma";

function EditContactPage({items, onSave}) {
    const params = useParams();
    const [contact, setContact] = useState([]);

    useEffect(() => {
        setContact(items);
      }, [items]);
      
    let contactAbout = contact.filter(item => item.id === Number(params.contactId));
       
    return ( 
        <Forma item={contactAbout} onSave={onSave} title="Editing a contact"/>
     );
}

export default EditContactPage;