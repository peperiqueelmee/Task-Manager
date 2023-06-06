import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { addTask, editTask } from '../features/tasks/tasksSlice';

const TaskForm = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector(state => state.tasks);

  const handleChange = e => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (params.id) {
      dispatch(editTask(task));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }
    navigate('/');
  };

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find(task => task.id === params.id));
    }
  }, [params.id, tasks]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='bg-zinc-800 max-w-sm p-4 mb-2'>
        <label
          htmlFor='title'
          className='block text-sm font-bold mb-2'>
          Task:
        </label>
        <input
          name='title'
          type='text'
          placeholder='Title'
          onChange={handleChange}
          value={task.title}
          className='w-full p-2 rounded-md bg-zinc-600 mb-2 text-sm focus:outline-none focus:border focus:border-indigo-600'
        />

        <label
          htmlFor='description'
          className='block text-sm font-bold mb-2 mt-1'>
          Description
        </label>
        <textarea
          name='description'
          placeholder='Description'
          onChange={handleChange}
          value={task.description}
          className='w-full p-2 rounded-md bg-zinc-600 mb-2 text-sm focus:outline-none focus:border focus:border-indigo-600'
        />
        <div className='flex gap-x-2 w-60 mt-2'>
          <Link
            to='/'
            className='w-16 text-center bg-gradient-to-r from-red-500 via-red-600 to-red-700 border border-red-400 hover:bg-gradient-to-r hover:from-red-600 hover:via-red-700 hover:to-red-800 font-semibold px-2 py-1 rounded-md text-sm'>
            Return
          </Link>
          <button
            type='submit'
            className='w-16 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 border border-indigo-400 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 font-semibold px-2 py-1 rounded-md text-sm'>
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default TaskForm;
