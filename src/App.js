import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Button from './componets/Button';
import AddForm from './pages/AddFormPage';
import ContactList from './pages/ContactListPage';

function App() {
  const [page, setPage] = useState('contacts');

  const handleClickContacts = () => {
    // Check if page is already set to contacts
    if (page !== 'contacts') {
      setPage('contacts');
    }
  }

  const handleClickForm = () => {
    // Check if page is already set to form
    if (page !== 'form') {
      setPage('form');
    }
  }

  const [items, setItems] = useState([]);

  useEffect(() => {
    // Check if items array is empty
    if (items.length === 0) {
      axios('https://jsonplaceholder.typicode.com/users')
      .then (({data})=> {setItems(data)});
    }
  }, []);

  const handleCreateContact = item => {
    // Check if item already exists in the array
    const existingItem = items.find(i => i.id === item.id);
    if (existingItem) {
      // Item already exists, do not add it
      return;
    }
    setItems([
      ...items,
      item
    ]);
  }
 
  const handleDeleteContact = (number) => {
    // Check if item exists in the array
    const existingItem = items.find(i => i.id === Number(number));
    if (!existingItem) {
      // Item does not exist, do not delete it
      return;
    }
    setItems(items.filter(item => item.id !== Number(number)));
  }

  return (
    <div className="App">
      <div className='btn_main'>
        <Button value="Phone Book" id="btn_list" callback={handleClickContacts} className="btn _list"/>
        <Button value="Add new contact" id="btn_form" callback={handleClickForm} className="btn _form"/>
      </div>
      {page === 'contacts' && (<ContactList items={items} onDelete={handleDeleteContact}/>)}
      {page === 'form' && (<AddForm onSave={handleCreateContact}/>)}
    </div>
  );
}

export default App;
