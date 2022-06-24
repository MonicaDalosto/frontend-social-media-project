import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postNewStory } from '../../store/space/thunks';

const SpaceTitle = ({ key, title, description, bgColor, color }) => {
  return (
    <div
      key={key}
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

const PostStory = ({ token, spaceId }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(postNewStory(name, content, imageUrl, spaceId, token));
    setName('');
    setContent('');
    setImageUrl('');
  };

  return (
    <div>
      <h2>Post a cool story bro</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </label>
        <label>
          Content
          <input
            type="text"
            value={content}
            onChange={event => setContent(event.target.value)}
          />
        </label>
        <label>
          Image url
          <input
            type="text"
            value={imageUrl}
            onChange={event => setImageUrl(event.target.value)}
          />
        </label>
        {/* <button onClick={handleClick}>preview image</button> */}

        <button type="submit">Post!</button>
      </form>
    </div>
  );
};

export { SpaceTitle, StoryTitle, PostStory };
