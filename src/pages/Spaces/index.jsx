import { HeroBanner } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllSpaces } from '../../store/space/selectors';
import { getAllSpaces } from '../../store/space/thunks';

const Spaces = () => {
  const dispatch = useDispatch();
  const allSpaces = useSelector(selectAllSpaces);

  useEffect(() => {
    // console.log('Hello from the Spaces page');
    dispatch(getAllSpaces());
  }, []);

  return (
    <div>
      <HeroBanner>
        <h1>Spaces</h1>
      </HeroBanner>
    </div>
  );
};

export { Spaces };
