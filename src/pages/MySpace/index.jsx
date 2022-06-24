import {
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

  const handleClickPost = () => {
    setButtonPost(!buttonPost);
  };

  console.log('buttonPost outside the onclick: ', buttonPost);

  useEffect(() => {}, [mySpace]);

  if (!mySpace)
    return (
      <div>
        <h3>You need to log in to see My Space</h3>
      </div>
    );

  const storiesSorted = [...mySpace.stories].sort(
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
        <button>Edit my space</button>
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
        storiesSorted.map(story => {
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
      )}
    </div>
  );
};

export { MySpace };
