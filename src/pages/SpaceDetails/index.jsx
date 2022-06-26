import { HeroBanner, SpaceTitle, StoryTitle } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSpecificSpace } from '../../store/space/selectors';
import { useParams } from 'react-router-dom';
import {
  getSpecificSpace,
  addNewFavoriteStory
} from '../../store/space/thunks';
import { selectToken, selectUser } from '../../store/user/selectors';
import { MdOutlineFavoriteBorder } from 'react-icons/md';

const SpaceDetails = () => {
  const dispatch = useDispatch();
  const specificSpace = useSelector(selectSpecificSpace);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const params = useParams();
  const SpaceId = params.id;
  const userId = !user ? 0 : user.id;

  useEffect(() => {
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
          <div style={{ position: 'relative' }}>
            <StoryTitle
              id={id}
              name={name}
              content={content}
              imageUrl={imageUrl}
            />
            {!token ? (
              ''
            ) : (
              <button
                onClick={
                  event => dispatch(addNewFavoriteStory(userId, id, token)) //The arguments order should be the same in the dispatch and in the thunk: userId, storyId, token
                }
                style={{ position: 'absolute', bottom: 20, right: 20 }}
              >
                <MdOutlineFavoriteBorder />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export { SpaceDetails };
