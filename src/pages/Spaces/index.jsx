import { HeroBanner } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllSpaces } from '../../store/space/selectors';
import { getAllSpaces } from '../../store/space/thunks';
import { NavLink } from 'react-router-dom';

const Spaces = () => {
  const dispatch = useDispatch();
  const allSpaces = useSelector(selectAllSpaces);

  useEffect(() => {
    dispatch(getAllSpaces());
  }, [dispatch]);

  if (!allSpaces)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );

  return (
    <div>
      <HeroBanner>
        <h1>Spaces</h1>
      </HeroBanner>
      {allSpaces.map(space => (
        <div
          key={space.id}
          style={{
            backgroundColor: space.backgroundColor,
            color: space.color,
            width: '500px',
            borderRadius: '8px',
            margin: '20px auto',
            padding: '20px',
            textAlign: 'center'
          }}
        >
          <h2>{space.title}</h2> <p>{space.description}</p>
          <NavLink to={`/spaces/${space.id}`}>
            <button>Visit space</button>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export { Spaces };
