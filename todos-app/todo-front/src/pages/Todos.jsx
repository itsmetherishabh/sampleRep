import {useState, useEffect} from 'react';
import api from '../api';

const Todos = () => {
    const [newTodo, setNewTodo] = useState({
        title: '',
        description: ''
    });

    const [todos, setTodos] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const getTodos = async () => {
        try {
            setLoading(true);
            let {data} = await api.get('/todos');
            console.log("RESP", data);
            setTodos(data);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

    const onChange = ({ target: { name, value } }) => setNewTodo({ ...newTodo, [name]: value })

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 col-sm-12 mx-auto'>
          <div className='card'>
            <div className='card-body'>
              <form>
                <div className='form-group'>
                  <label htmlFor='title'>Title</label>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='title'
                    name='title'
                    id='title'
                    onChange={onChange}
                    value={newTodo.title}
                  />
                </div>
                <div className='form-group mt-2'>
                  <label htmlFor='description'>Description</label>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Description'
                    name='description'
                    id='description'
                    onChange={onChange}
                    value={newTodo.description}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='row mt-3'>
          <div className='col-12'>
          {
              isLoading && (
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
              )
          }
          <ul className='list-group'>
          {
              todos.map(todo => (
                <li className='list-group-item' key={todo._id}>{todo.title}</li>
              ))
          }
          </ul>
          </div>
      </div>
    </div>
  );
};

export default Todos;
