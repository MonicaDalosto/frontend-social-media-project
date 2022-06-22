import { HeroBanner } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { selectAllStories } from '../../store/space/selectors';
// import { getAllStories } from '../../store/space/thunks';
// import { NavLink } from 'react-router-dom';

const SpaceDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Hello from useEffect stories');
    // dispatch(thunkName()); // new get request on the thunks...
  }, []);

  return (
    <div>
      <HeroBanner>
        <h1>Space Details</h1>
      </HeroBanner>
    </div>
  );
};

export { SpaceDetails };
