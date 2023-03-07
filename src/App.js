import axios from 'axios';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Button from './componets/Button';
import AddForm from './pages/AddFormPage';
import ContactList from './pages/ContactListPage';
import ErrorPage from './pages/ErrorPage';
import EditContactPage from './pages/EditContactPage';
import Modal from './componets/Modal';

function App() {
    const [items, setItems] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [index, setIndex] = useState('');

    useEffect(() => {
        if (items.length === 0) {
          axios('https://jsonplaceholder.typicode.com/users')
          .then (({data})=> {setItems(data)});
        }
    },);

    const handleCreateContact = item => {
        const existingItem = items.find(i => i.id === item.id);
        if (existingItem) {
          return;
        }
        setItems([
          ...items,
          item
        ]);
    }

    const isModalClose = () => {
        setModalOpen(false);
    }

    const handleEditContact = item => {
        for(let i=0; i < items.length; i++ ) {
          if (items[i].id === Number(item.id)) {
            items[i].name = item.name;
            items[i].email = item.email;
            items[i].phone = item.phone;
          }
        }
        setItems(items);
    }

    const isOpenModal = (number) => {
        setModalOpen(true);
        setIndex(number);
    }

    const handleDeleteContact = () => {
        setItems(items.filter(item => item.id !== Number(index)));
        setModalOpen(false);
    }

  return (
    <div className="App">
      <BrowserRouter>
          <div className='btn_main'>
            <NavLink to="/"><Button value="Phone Book" id="btn_list" className="btn _list"/></NavLink>
            <NavLink to="/form"><Button value="Add new contact" id="btn_form" className="btn _form"/></NavLink>
          </div>
          <Routes>
            <Route path="/" element={<ContactList items={items} isOpenModal={isOpenModal}/>} />
            <Route path="/form" element={<AddForm onSave={handleCreateContact}/>} />
            <Route path="/contact/:contactId" element={<EditContactPage items={items} onSave={handleEditContact}/>}/>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          {modalOpen &&
          <Modal onClose={isModalClose} onDelete={handleDeleteContact}/>}
        </BrowserRouter>
    </div>
  );
}

export default App;
