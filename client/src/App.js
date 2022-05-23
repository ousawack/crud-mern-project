import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [listOfFriends, setListOFriends] = useState([]);

  const addFriend = () => {
    Axios.post("http://localhost:3001/addfriend", {
      name: name,
      age: age,
    }).then((response) => {
      setListOFriends([
        ...listOfFriends,
        { _id: response.data._id, name: name, age: age },
      ]);
    });
  };

  const updateFriend = (id) => {
    const newAge = prompt("Enter new age: ");

    Axios.put("http://localhost:3001/update", { newAge: newAge, id: id }).then(
      () => {
        setListOFriends(
          listOfFriends.map((val) => {
            return val._id == id
              ? { _id: id, name: val.name, age: newAge }
              : val;
          })
        );
      }
    );
  };

  const deleteFriend = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setListOFriends(
        listOfFriends.filter((val) => {
          return val._id != id;
        })
      );
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/read")
      .then((response) => {
        setListOFriends(response.data);
        // const update = prompt("Enter val: ");
        // console.log(update);
      })
      .catch(() => {
        console.log("Error");
      });
  }, []);

  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          placeholder="Friend name..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Friend age..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <button onClick={addFriend}>
          <b>ADD FRIEND</b>
        </button>
      </div>
      <div className="listOfFriends">
        {listOfFriends.map((val) => {
          return (
            <div className="friendContainer">
              <div className="friend">
                <h3>Name: {val.name}</h3>
                <h3>//</h3>
                <h3>Age: {val.age}</h3>
              </div>
              <button
                id="updateButton"
                onClick={() => {
                  updateFriend(val._id);
                }}
              >
                <b>UPDATE</b>
              </button>
              <button
                id="removeButton"
                onClick={() => {
                  deleteFriend(val._id);
                }}
              >
                <b>DELETE</b>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
