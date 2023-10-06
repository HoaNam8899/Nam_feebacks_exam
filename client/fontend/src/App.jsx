import logo from './logo.svg';
import './App.css';

import { useEffect } from 'react';
import { useState } from 'react';

function App() {

  /// get /////////////////////////////
  const [data, setData] = useState([]);
  const fetchData = () => {
    fetch("http://localhost:3000/api/v1/feedbacks")
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => { fetchData() }, [])
  /// post /////////////////////////////////////////
  const [postData, setPostData] = useState({
    content: "nhập gì đó đi, 0 điểm nha",
    point: 0
  });
  const createNew = (e) => {
    setPostData({
      ...postData, content: e.target.value
    })
  }
  const setPoint = (e) => {
    setPostData({
      ...postData, point: e.target.id
    })

  }
  const sendFeedback = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/v1/feedbacks", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(postData),
      })
      let data = await res.json();
    } catch (error) {
      console.log(error);
    }
    fetchData();
  }
  //// edit ////////////////////////////////////////////
  const [valueEdit, setValueEdit] = useState({});
  const editContent = async (e, id) => {
    e.preventDefault();
    let dataEdit = data.find((e, i) => e.id === +id);
    setValueEdit(dataEdit);
    console.log(dataEdit);
  }
  const changeFeedback = async (e) => {
    e.preventDefault();
    // console.log(valueEdit);
    try {
      let res = await fetch(`http://localhost:3000/api/v1/feedbacks/${valueEdit.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(valueEdit)
        }
      )
      let data = await res.json();
      alert(data.message);
    } catch {
      console.log("error")
    }
    fetchData();
    setValueEdit({})
  }

  const inputFeedback = (e) => {
    setValueEdit({
      ...valueEdit, content: e.target.value
    })

  }


  return (
    <div className="App">
      <div className="Navbar">Feedback TA</div>;
      <div className="section-feedback-form container">
        <div className="form-container">
          <h1 className="title">Thầy Phú dạy có hay không????</h1>
          <div className="point-container">
            <div className={`point`} id={1} onClick={(e) => setPoint(e)}>1</div>
            <div className={`point`} id={2} onClick={(e) => setPoint(e)}>2</div>
            <div className={`point`} id={3} onClick={(e) => setPoint(e)}>3</div>
            <div className={`point`} id={4} onClick={(e) => setPoint(e)}>4</div>
            <div className={`point`} id={5} onClick={(e) => setPoint(e)}>5</div>
            <div className={`point`} id={6} onClick={(e) => setPoint(e)}>6</div>
            <div className={`point`} id={7} onClick={(e) => setPoint(e)}>7</div>
            <div className={`point`} id={8} onClick={(e) => setPoint(e)}>8</div>
            <div className={`point`} id={9} onClick={(e) => setPoint(e)}>9</div>
            <div className={`point`} id={10} onClick={(e) => setPoint(e)}>10</div>
          </div>
          <form className="main-form ">
            <div className="input-wrapper">
              <input type="text" onChange={(e) => createNew(e)} />
              <button onClick={(e) => sendFeedback(e)}>Send</button>
            </div>

            <div className="input-wrapper">
              <input type="text" onChange={(e) => inputFeedback(e)} defaultValue={valueEdit.content} key={valueEdit.id} />
              <button onClick={(e) => changeFeedback(e)}>Change</button>
            </div>


          </form>
        </div>

      </div>
      <div className="section-total-review">
        <div className="total-review-container">
          <span>{data.length} Reviews</span>
          <span>Average Rating: 9</span>
        </div>
      </div>
      <div className="section-feedback-item container">
        <div className="feedback-container">

          {
            data.map((d, i) =>
              <div className="feedback-item-container" key={i}>
                <p className="feedback-content">{d.content}</p>
                <span className="point">{d.point}</span>
                <div className="action-container">
                  <button onClick={(e) => editContent(e, d.id)}>Edit</button>
                </div>
              </div>
            )}

          {/* 
          <div className="feedback-item-container">
            <p className="feedback-content">Thầy phú dạy hay lắm</p>
            <span className="point">10</span>
            <div className="action-container">
              <button>Edit</button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
