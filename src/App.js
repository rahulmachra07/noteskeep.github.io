import './App.css';
import { useEffect, useState } from 'react';
import NotesList from './components/NotesList';
import {nanoid} from 'nanoid';
import Search from './components/Search';
import Header from './components/Header';

function App() {
  const [notes,setNotes]=useState([
    {
    id: nanoid(),
    text:"this is random 1",
    date: "13/04/2023"
    },
    {
      id: nanoid(),
      text:"this is random 2",
      date: "13/04/2023"
    },
    {
      id: nanoid(),
      text:"this is random 3",
      date: "13/04/2023"
    },
    {
      id: nanoid(),
      text:"this is random 4",
      date: "13/04/2023"
    }
]);

  const [searchText,setSearchText]=useState('');

  const [darkMode,setDarkMode]=useState(false);

  useEffect(()=>{
    const savedNote=JSON.parse(localStorage.getItem('react-notes-app-data'));
    if(savedNote){
      setNotes(savedNote);
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem('react-notes-app-data',JSON.stringify(notes))
  },[notes]);

  const addNote=(text)=>{
    const date=new Date();
    const newNote={
      id:nanoid(),
      text:text,
      date:date.toLocaleDateString()
    }
    const newNotes=[...notes,newNote];
    setNotes(newNotes);
  }

  const deleteNote =(id)=>{
    const newNotes=notes.filter((note)=> note.id!==id);
    setNotes(newNotes);
  }

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className='container'>
        <Header handleToggleDarkMode={setDarkMode}/>
        <Search handleSearchNote={setSearchText} />
        <NotesList 
        notes={notes.filter((note)=>note.text.toLowerCase().includes(searchText))} 
        handleAddNote={addNote} 
        handleDeleteNote={deleteNote}  
        />
      </div>
    </div>
  );
}

export default App;
