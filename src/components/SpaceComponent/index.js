const SpaceTitle = ({ key, title, description, bgColor, color }) => {
  return (
    <div
      key={key}
      style={{
        backgroundColor: { bgColor },
        color: { color }
      }}
    >
      <h2>{title} </h2>
      <p>{description}</p>
    </div>
  );
};

const StoryTitle = ({ key, name, content, imageUrl }) => {
  return (
    <div key={key}>
      <h3>{name}</h3>
      <p>{content}</p>
      <img src={imageUrl} alt="" />
    </div>
  );
};

export { SpaceTitle, StoryTitle };
