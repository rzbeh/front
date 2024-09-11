import './style.css';

const TrackForm = () => {
  
  return (
    <div className="container" id="container">
      <div className="form-container sign-in">
        <form>
          <h1>Track</h1>
          <input type="text" name="phone" placeholder="Phone" />
          <input type="text" name="id" placeholder="ID" />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your product details to use all of the site features</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackForm;
