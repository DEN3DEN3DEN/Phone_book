import Button from "../componets/Button";
import './ContactsListPage.scss';

function ContactList({items, onDelete}) {
   const handleDelete = (event) => {
        const id = event.target.getAttribute('data-delete');
        onDelete(id);
   }
    return ( 
        <div>
            {!items.length && <div>Phone book is empty</div>}
            {!!items.length && (
            <div className="contacts_block container">
                <div>
                    <h2>Name</h2>
                    <ul>
                        {items.map(item => (<li className="list_name" key={item.id}>{item.name}</li>))}
                        
                    </ul>
                </div>
                <div>
                    <h2>Pnone number</h2>
                    <ul>
                        {items.map(item => (
                        <li key={item.id}>{item.phone}</li>))}
                    </ul>
                </div>
                <div>
                    <h2>Delete contact</h2>
                    <ul className="list_delete">
                        {items.map(item => (
                        <li key={item.id}>
                        <Button value="Delete" className="btn _delete" data={item.id} callback={handleDelete}/>
                        </li>))}
                    </ul>
                </div>
            </div>
            )}
        </div>
     );
}

export default ContactList;