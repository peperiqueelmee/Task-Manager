import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTask } from '../features/tasks/tasksSlice';

const TasksList = () => {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteTask(id));
  };

  return (
    <>
      <div className='w-4/6'>
        <header className='flex justify-between items-center p-4'>
          <h1 className='font-bold'>Total Tasks: {tasks.length}</h1>
          <Link
            to='/create-task'
            className='bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 border border-indigo-400 hover:bg-gradient-to-r hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 font-semibold px-2 py-1 rounded-md text-sm'>
            Create Task
          </Link>
        </header>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {tasks.map(task => (
            <div
              key={task.id}
              className='bg-neutral-800 p-4 rounded-md'>
              <header className='flex justify-between'>
                <h3>{task.title}</h3>
                <div className='flex gap-x-2'>
                  <Link
                    to={`/edit-task/${task.id}`}
                    className='w-14 text-center bg-gradient-to-r from-zinc-500 via-zinc-600 to-zinc-700 border border-zinc-400 hover:bg-gradient-to-r hover:from-zinc-600 hover:via-zinc-700 hover:to-zinc-800 px-2 py-1 rounded-md text-sm'>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className='w-14 bg-gradient-to-r from-red-500 via-red-600 to-red-700 border border-red-400 hover:bg-gradient-to-r hover:from-red-600 hover:via-red-700 hover:to-red-800 px-2 py-1 rounded-md text-sm'>
                    Delete
                  </button>
                </div>
              </header>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TasksList;
