import {
  EditMySpace,
  HeroBanner,
  PostStory,
  SpaceTitle,
  StoryTitle
} from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMySpace, selectMyFavorites } from '../../store/space/selectors';
import { deleteStory } from '../../store/space/thunks';
// import { selectToken } from '../../store/user/selectors';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useState } from 'react';

const MySpace = () => {
  const dispatch = useDispatch();
  const mySpace = useSelector(selectMySpace);
  const myFavorites = useSelector(selectMyFavorites);
  // const token = useSelector(selectToken);
  const [buttonPost, setButtonPost] = useState(false);
  const [buttonEdit, setButtonEdit] = useState(false);
  // const allStories = mySpace.allStories;

  const handleClickPost = () => {
    setButtonPost(!buttonPost);
  };

  const handleClickEdit = () => {
    setButtonEdit(!buttonEdit);
  };

  useEffect(() => {}, [mySpace]);

  if (!mySpace)
    return (
      <div>
        <h3>You need to log in to see My Space</h3>
      </div>
    );

  const storiesSorted = !mySpace.stories
    ? null
    : [...mySpace.stories].sort(
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
      <div style={{ width: '400px', margin: '30px auto' }}>
        <button value={buttonEdit} onClick={() => handleClickEdit()}>
          Edit my space
        </button>
        <button value={buttonPost} onClick={() => handleClickPost()}>
          Post a cool story bro
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
  );
};

export { MySpace };
