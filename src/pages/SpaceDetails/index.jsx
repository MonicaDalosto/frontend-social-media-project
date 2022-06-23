import { HeroBanner } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSpecificSpace } from '../../store/space/selectors';
import { useParams } from 'react-router-dom';
import { getSpecificSpace } from '../../store/space/thunks';
// import { NavLink } from 'react-router-dom';

const SpaceDetails = () => {
  const dispatch = useDispatch();
  const specificSpace = useSelector(selectSpecificSpace);
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
      {!specificSpace ? (
        'Loading...'
      ) : (
        <div
          style={{
            backgroundColor: specificSpace.backgroundColor,
            color: specificSpace.color
          }}
        >
          <h2>{specificSpace.title} </h2>
          <p>{specificSpace.description}</p>
          <div>
            {specificSpace.stories.map(story => (
              <div>
                <h3>{story.name}</h3>
                <p>{story.content}</p>
                <img src={story.imageUrl} alt="" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { SpaceDetails };
