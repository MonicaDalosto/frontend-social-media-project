import { HeroBanner, SpaceTitle, StoryTitle } from '../../components';
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
  const SpaceId = params.id;

  useEffect(() => {
    console.log('Hello from useEffect stories');
    dispatch(getSpecificSpace(SpaceId));
  }, [dispatch, SpaceId]);

  if (!specificSpace)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );

  const storiesSorted = [...specificSpace.stories].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Destructuring the object "specificSpace"
  const { id, title, description, backgroundColor, color } = specificSpace;

  return (
    <div>
      <HeroBanner>
        <h1>Space Details</h1>
      </HeroBanner>
      <SpaceTitle
        key={id}
        bgColor={backgroundColor}
        color={color}
        title={title}
        description={description}
      />

      {storiesSorted.map(story => {
        const { id, name, content, imageUrl } = story;
        return (
          <StoryTitle
            key={id}
            name={name}
            content={content}
            imageUrl={imageUrl}
          />
        );
      })}
    </div>
  );
};

export { SpaceDetails };
