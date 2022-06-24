import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postNewStory } from '../../store/space/thunks';

const SpaceTitle = ({ id, title, description, bgColor, color }) => {
  return (
    <div
      id={id}
      style={{
        backgroundColor: bgColor,
        color: color,
        textAlign: 'center'
      }}
    >
      <h2>{title} </h2>
      <p>{description}</p>
    </div>
  );
};

const StoryTitle = ({ id, name, content, imageUrl }) => {
  return (
    <div
      key={id}
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
        src={imageUrl}
        alt=""
        style={{
          maxWidth: '500px',
          maxHeight: '400px',
          marginRight: '30px'
        }}
      />
      <div>
        <h3>{name}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
};

const PostStory = ({ token, spaceId, handleClickPost }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (name && content) {
      dispatch(postNewStory(name, content, imageUrl, spaceId, token));
      setName('');
      setContent('');
      setImageUrl('');
      handleClickPost();
    }
  };

  return (
    <div
      style={{
        width: '600px',
        borderRadius: '8px',
        boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        margin: 'auto'
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '300px',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '300px'
        }}
      >
        <h2>Post a cool story bro</h2>
        <label>
          Name
          <input
            style={{ float: 'right' }}
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </label>
        <label>
          Content
          <input
            style={{ float: 'right' }}
            type="text"
            value={content}
            onChange={event => setContent(event.target.value)}
          />
        </label>
        <label>
          Image Url
          <input
            style={{ float: 'right' }}
            type="text"
            value={imageUrl}
            onChange={event => setImageUrl(event.target.value)}
          />
        </label>

        {!imageUrl ? (
          <p
            style={{
              backgroundColor: 'gray',
              padding: '10px',
              borderRadius: '8px',
              textAlign: 'center'
            }}
          >
            preview image
          </p>
        ) : (
          <img src={imageUrl} alt="" style={{ margin: '5px' }} />
        )}

        <button type="submit">Post!</button>
      </form>
    </div>
  );
};

export { SpaceTitle, StoryTitle, PostStory };
