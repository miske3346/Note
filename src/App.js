import React, { useState, useEffect} from 'react';
import './App.css';
import Preview from './components/Preview';
import Message from './components/Message';
import NotesContainer from './components/Notes/NotesContainer';
import NoteList from './components/Notes/NotesList';
import Note from './components/Notes/Note';
import NoteFrom from './components/Notes/NoteForm';
import Alert from './components/Alert';

function App() {
  
  const [notes, setNotes] = useState([]);
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [validationErrors, setValidationErrors ] = useState([]);
  
  
  useEffect(() => {
    if (localStorage.getItem('notes')) {
      setNotes(JSON.parse(localStorage.getItem('notes')));
    } else {
      localStorage.setItem('notes', JSON.stringify([]));
    }
  }, []);
  
  // validationError 
  
  const validate = () => {
    const validationErrors = [];
    let passed = true;
    
    if (!title) {
      validationErrors.push('الرجاء ادخال عنوان الملاحظة');
      passed = false;
    }
    if(!content) {
      validationErrors.push('الرجاء إدخال محتوي الملاحظة ');
      passed = false;
    }
    setValidationErrors(validationErrors);
    return passed;
  }
  
  
  const saveToLocalStorage = (key,value) =>{
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  
  
  
  //change title
  const changeTitleHandler = (event) => {
    setTitle(event.target.value);
    
  }
  
  //change Content
  const changeContentHandler = (event) => {
    setContent(event.target.value);
  }
  // save Note
  const saveNoteHandler = () => {
    
    if (!validate())  return;
    
    const note = {
      id: new Date(),
      title: title,
      content: content
    }
    const updatedNotes = [...notes,note];
    saveToLocalStorage('notes',updatedNotes);
    setNotes(updatedNotes);
    setCreating(false);
    setSelectedNote(note.id);
    setTitle('');
    setContent('');
  }
  
  // select Note
  
  const selectNoteHandler = noteId => {
    setSelectedNote(noteId);
    setCreating(false);
    setEditing(false);
  }
  
 
  
  // mode editing Note
  
  const editNoteHandler = () => {
    const note = notes.find(note => note.id === selectedNote);
    setEditing(true);
    setTitle(note.title);
    setContent(note.content);
    
  }
  
  
  // edit Note
  
  const updateNoteHandler = () =>{
    
    if (!validate())  return;
    
    const updatedNotes = [...notes,];
    const noteIndex = notes.findIndex(note => note.id === selectedNote);
    updatedNotes[noteIndex] = {
      id:selectedNote,
      title: title,
      content: content
      
    };
    saveToLocalStorage('notes',updatedNotes);
    setNotes(updatedNotes);
    setEditing(false);
    setTitle('');
    setContent('');
    
    
  }
  
   //mode add note handler
  
   const addNoteHandler = () => {
    setCreating(true);
    setEditing(false);
    setTitle('');
    setContent('');
}

// Delete Note 

const deleteNoteHandler = () => {
  const updatedNotes = [...notes];
  const noteIndex = updatedNotes.findIndex(note => note.id === selectedNote);
  notes.splice(noteIndex,1);
  saveToLocalStorage('notes',notes);
  setNotes(notes);
  setSelectedNote(null);
}

  const getAddNote = () => {
    return (
      <NoteFrom 
        formTitle= 'New Note'
        title= {title}
        content= {content}
        titleChanged= {changeTitleHandler}
        contentChanged= {changeContentHandler}
        submitText='Save'
        submitClicked= {saveNoteHandler}
        
        />
    );
  };

  const getPreview = () => {
    if(notes.length === 0) {
      return <Message title='   لا يوجد ملاحظة' />
      
    }
    if(!selectedNote) {
      return <Message title='الرجاء اختيار ملاحظة ' />
    }
    const note = notes.find(note => {
      return note.id === selectedNote;
    });
    
    let noteDisplay = (
      <div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>
    )
    if (editing) {
      noteDisplay = (
        <NoteFrom 
          formTitle= 'Edit Note'
          title={title}
          content={content}
          titleChanged= {changeTitleHandler}
          contentChanged= {changeContentHandler}
          submitText='Update'
          submitClicked= {updateNoteHandler}
          
        />
      )
    }
    return (
      <div>
        {!editing && 
        <div className="note-operations">
          <a href="#" onClick={editNoteHandler}>
            <i className="fa fa-pencil-alt" />
          </a>
          <a href="#" onClick={deleteNoteHandler}>
            <i className="fa fa-trash" />
          </a>
      </div>}
        
        {noteDisplay }
      </div>
    );
  };

   
  return (
    <div className="App">
      {console.log(validationErrors)}
      <NotesContainer>
        <NoteList>
          {notes.map(note => 
            <Note 
              key={note.id} 
              title={note.title} 
              noteClicked={() => selectNoteHandler(note.id)} 
              active={selectedNote === note.id}
              />
            )}
        </NoteList>
        <button className="add-btn" onClick={addNoteHandler}>+</button>
      </NotesContainer>
      <Preview>
        {creating ? getAddNote() : getPreview()}
      </Preview>
          {/* {validationErrors.length !== 0 && <Alert validationMessages={validationErrors} /> } */}
      {/* {validationErrors.length !== 0 && 
      <Alert validationMessages ={ validationErrors } />} */}
      
      {validationErrors.length !== 0 &&
        <div className="alert-container">
        <ul>
            {validationErrors.map((message, index) => <li key={index}>{message}</li>)}
        </ul>
    </div>}
      
      
    </div>
  );
}

export default App;
