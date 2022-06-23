import { HeroBanner } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllSpaces } from '../../store/space/selectors';
import { useParams } from 'react-router-dom';
import { getSpecificSpace } from '../../store/space/thunks';
// import { NavLink } from 'react-router-dom';

const SpaceDetails = () => {
  const dispatch = useDispatch();
  const allSpaces = useSelector(selectAllSpaces);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    console.log('Hello from useEffect stories');
    dispatch(getSpecificSpace(id));
  }, [dispatch, id]);

  return (
    <div>
      <HeroBanner>
        <h1>Space Details</h1>
      </HeroBanner>
      {!allSpaces ? 'Loading...' : allSpaces}
    </div>
  );
};

export { SpaceDetails };
