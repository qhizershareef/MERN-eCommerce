import { useState } from 'react';
import {Form, Button  } from 'react-bootstrap';

function SearchBar ({history}) {
    const [keyword, setKeyword] = useState('');

    const submitHandler =(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            history.push('/search/'+keyword);
        }else{
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Group controlId='keyword'>
                <Form.Control 
                    type="text" 
                    placeholder='Search Products....'
                    onChange={(e)=> setKeyword(e.target.value)}
                    className='mr-sm-2 ml-sm-5'
                />
            </Form.Group>
            <Button type='submit' variant='outline-success' className='p-2'>
                Search
            </Button>
        </Form>
    )
}

export default SearchBar
