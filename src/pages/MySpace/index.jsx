import { HeroBanner } from '../../components';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMySpace } from '../../store/space/selectors';
import { deleteStory } from '../../store/space/thunks';
// import { NavLink } from 'react-router-dom';
// import { selectUser } from '../../store/user/selectors';

const MySpace = () => {
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  const mySpace = useSelector(selectMySpace);

  // console.log('user inside the mySpace: ', user);
  console.log('mySpace inside the mySpace: ', mySpace);

  if (!mySpace)
    return (
      <div>
        <h3>You need to log in to see My Space</h3>
      </div>
    );

  return (
    <div>
      <HeroBanner>
        <h1>My Space</h1>
      </HeroBanner>
      <div
        style={{
          backgroundColor: mySpace.backgroundColor,
          color: mySpace.color,
          textAlign: 'center'
        }}
      >
        <h2>{mySpace.title}</h2>
        <p>{mySpace.description}</p>
      </div>
      <div>
        <button>Edit my space</button>
        <button>Post a cool story bro</button>
      </div>
      {mySpace.stories.map(story => (
        <div
          key={story.id}
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            maxWidth: '1000px',
            margin: '30px auto',
            padding: '20px'
          }}
        >
          <img
            src={story.imageUrl}
            alt=""
            style={{
              maxWidth: '500px',
              maxHeight: '400px',
              marginRight: '30px'
            }}
          />
          <div>
            <h3>{story.name}</h3>
            <p>{story.content}</p>
            <button
              value={story.id}
              onClick={event =>
                dispatch(deleteStory(Number(event.target.value)))
              }
            >
              Delete story
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export { MySpace };

// If I want to set the image as a background:
// style={{
//   backgroundImage: `url(${story.imageUrl})`,
//   backgroundRepeat: 'no-repeat'
// }}
