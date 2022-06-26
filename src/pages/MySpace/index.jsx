import {
  EditMySpace,
  HeroBanner,
  MyFavorites,
  PostStory,
  SpaceTitle,
  StoryTitle
} from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMySpace, selectMyFavorites } from '../../store/space/selectors';
import { deleteStory, deleteFavoriteStory } from '../../store/space/thunks';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useState } from 'react';

const MySpace = () => {
  const dispatch = useDispatch();
  const mySpace = useSelector(selectMySpace);
  const myFavorites = useSelector(selectMyFavorites);
  const [buttonPost, setButtonPost] = useState(false);
  const [buttonEdit, setButtonEdit] = useState(false);
  const [buttonFavorites, setButtonFavorites] = useState(false);

  const handleClickPost = () => {
    setButtonPost(!buttonPost);
  };

  const handleClickEdit = () => {
    setButtonEdit(!buttonEdit);
  };

  const handleClickFavorites = () => {
    setButtonFavorites(!buttonFavorites);
  };

  useEffect(() => {}, [mySpace]);

  if (!mySpace)
    return (
      <div>
        <h3>You need to log in to see My Space</h3>
      </div>
    );

  // Sort the stories before show them on the page:
  const storiesSorted = !mySpace.stories
    ? null
    : [...mySpace.stories].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

  //  Sort the favorites before show them on the page
  const favoritesSorted = !myFavorites
    ? null
    : [...myFavorites].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

  // Destructuring the object "mySpace"
  const { id, title, description, backgroundColor, color } = mySpace;

  return (
    <div>
      <HeroBanner>
        <h1>My Space</h1>
      </HeroBanner>
      <SpaceTitle
        id={id}
        bgColor={backgroundColor}
        color={color}
        title={title}
        description={description}
      />
      <div style={{ width: '500px', margin: '30px auto' }}>
        <button value={buttonEdit} onClick={() => handleClickEdit()}>
          Edit my space
        </button>
        <button value={buttonPost} onClick={() => handleClickPost()}>
          Post a cool story bro
        </button>
        <button value={buttonFavorites} onClick={() => handleClickFavorites()}>
          {buttonFavorites ? 'Hide my favorites' : 'See my favorites'}
        </button>
      </div>
      {buttonPost ? (
        <PostStory spaceId={mySpace.id} handleClickPost={handleClickPost} />
      ) : (
        ''
      )}
      {buttonEdit ? (
        <EditMySpace
          mySpace={mySpace}
          spaceId={mySpace.id}
          handleClickEdit={handleClickEdit}
        />
      ) : (
        ''
      )}

      {!buttonFavorites ? (
        ''
      ) : (
        <div>
          <h2 style={{ textAlign: 'center' }}>My Favorite's Stories</h2>
          {favoritesSorted ? (
            favoritesSorted.map(favorite => {
              const { storyId, story } = favorite;
              return (
                <div style={{ position: 'relative' }} key={storyId}>
                  <MyFavorites
                    id={storyId}
                    name={story.name}
                    content={story.content}
                    imageUrl={story.imageUrl}
                  />
                  <button
                    onClick={event => dispatch(deleteFavoriteStory(storyId))}
                    style={{ position: 'absolute', bottom: 20, right: 20 }}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              );
            })
          ) : (
            <p>You don't have any Stories yet</p>
          )}
        </div>
      )}

      <div>
        <h2 style={{ textAlign: 'center' }}>My Stories</h2>
        {storiesSorted
          ? storiesSorted.map(story => {
              const { id, name, content, imageUrl } = story;
              return (
                <div style={{ position: 'relative' }} key={id}>
                  <StoryTitle
                    id={id}
                    name={name}
                    content={content}
                    imageUrl={imageUrl}
                  />
                  <button
                    onClick={event =>
                      dispatch(deleteStory(Number(id), mySpace.id))
                    }
                    style={{ position: 'absolute', bottom: 20, right: 20 }}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              );
            })
          : "You don't have any stories yet!"}
      </div>
    </div>
  );
};

export { MySpace };
