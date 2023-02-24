import React from 'react';

const NoteFrom = (props) => {
    const { formTitle, title, content, titleChanged, contentChanged, submitClicked,submitText } = props;
    
    return (
        <div>
            <h2>{formTitle}</h2>
            <input 
                type="text"
                name='title'
                className='form-input mb-30'
                placeholder='title'
                value={title}
                onChange={titleChanged}
            />
            <textarea 
                rows='10'
                name='content'
                className='form-input'
                placeholder=' text'
                value = {content}
                onChange = {contentChanged}
            />
            <a href='#' className='button green' onClick={submitClicked}>{submitText} </a>
        </div>
    )
}


export default NoteFrom;