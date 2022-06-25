import {
  EditMySpace,
  HeroBanner,
  PostStory,
  SpaceTitle,
  StoryTitle
} from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMySpace } from '../../store/space/selectors';
import { deleteStory } from '../../store/space/thunks';
import { selectToken } from '../../store/user/selectors';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useState } from 'react';

const MySpace = () => {
  // const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const mySpace = useSelector(selectMySpace);
  const token = useSelector(selectToken);
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

  // const storiesSorted = () => {
  //   if (allStories !== null) {
  //     return [...mySpace.AllStories].sort(
  //       (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //     );
  //   }
  //   return [];
  // };

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
        <PostStory
          token={token}
          spaceId={mySpace.id}
          handleClickPost={handleClickPost}
        />
      ) : (
        ''
      )}

      {buttonEdit ? (
        <EditMySpace
          token={token}
          mySpace={mySpace}
          spaceId={mySpace.id}
          handleClickEdit={handleClickEdit}
        />
      ) : (
        ''
      )}

      {mySpace.allStories
        ? mySpace.allStories.map(story => {
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
                  // value={story.id}
                  onClick={event =>
                    dispatch(deleteStory(Number(id), mySpace.id, token))
                  }
                  style={{ position: 'absolute', bottom: 0, right: 0 }}
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
