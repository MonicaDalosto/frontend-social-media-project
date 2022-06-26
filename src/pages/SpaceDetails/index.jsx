import { HeroBanner, SpaceTitle, StoryTitle } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSpecificSpaceDetails,
  selectMyFavorites
} from '../../store/space/selectors';
import { NavLink, useParams } from 'react-router-dom';
import {
  getSpecificSpace,
  addNewFavoriteStory,
  deleteFavoriteStory
} from '../../store/space/thunks';
import { selectToken } from '../../store/user/selectors';
import { MdOutlineFavoriteBorder } from 'react-icons/md';

const SpaceDetails = () => {
  const dispatch = useDispatch();
  const specificSpace = useSelector(selectSpecificSpaceDetails);
  const myFavorites = useSelector(selectMyFavorites);
  const token = useSelector(selectToken);
  const params = useParams();
  const SpaceId = params.id;

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
          <div style={{ position: 'relative' }} key={id}>
            <StoryTitle
              id={id}
              name={name}
              content={content}
              imageUrl={imageUrl}
            />
            {!token ? (
              ''
            ) : myFavorites &&
              myFavorites.find(favorite => favorite.storyId === id) ? (
              <div style={{ position: 'absolute', bottom: 20, right: 20 }}>
                <NavLink to={`/stories/${id}`}>
                  <button>Details</button>
                </NavLink>
                <button onClick={event => dispatch(deleteFavoriteStory(id))}>
                  Remove Favorite
                </button>
              </div>
            ) : (
              <div style={{ position: 'absolute', bottom: 20, right: 20 }}>
                <NavLink to={`/stories/${id}`}>
                  <button>Details</button>
                </NavLink>
                <button onClick={event => dispatch(addNewFavoriteStory(id))}>
                  <MdOutlineFavoriteBorder />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export { SpaceDetails };
