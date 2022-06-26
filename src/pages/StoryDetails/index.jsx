import { HeroBanner, StoryTitle } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpecificStory } from '../../store/space/thunks';
import { selectStoryDetails } from '../../store/space/selectors';
import { useState } from 'react';

const StoryDetails = () => {
  const params = useParams();
  const storyId = params.id;
  const dispatch = useDispatch();
  const storyDetails = useSelector(selectStoryDetails);
  const [bid, setBid] = useState(null);

  // console.log('storyDetails: ', storyDetails);

  const handleSubmit = event => {
    event.preventDefault();
    console.log('bid from page: ', bid);
  };

  useEffect(() => {
    dispatch(getSpecificStory(storyId));
  }, [dispatch, storyId]);

  if (!storyDetails)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );

  const { id, name, content, imageUrl } = storyDetails;
  return (
    <div>
      <HeroBanner>
        <h2>Story Details</h2>
      </HeroBanner>
      <StoryTitle id={id} name={name} content={content} imageUrl={imageUrl} />
      <div>
        <h2 style={{ textAlign: 'center' }}>
          Do you want to buy this picture?
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            margin: '40px auto',
            maxWidth: '800px'
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              maxWidth: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '200px'
            }}
          >
            <h3>Give a bid...</h3>
            <label>
              Your bid EUR:
              <input
                style={{ float: 'right' }}
                type="text"
                value={bid}
                onChange={event => setBid(Number(event.target.value))}
              />
            </label>
            <p>It should be higher than Eur 00,00</p>
            <button type="submit">Bid!</button>
          </form>
          <div>
            <h3>Previous Bids...</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export { StoryDetails };
