import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";

function Write() {
  const state = useLocation().state;
  const [value, setvalue] = useState(state?.desc || "");
  const [title, settitle] = useState(state?.title || "");
  // const [desc, setdesc] = useState(state?.desc || "");
  const [img, setimg] = useState(null);
  const [cat, setcat] = useState(state?.cat || "");
  const navigate = useNavigate();
  const upload = async () => {
    try {
      const formdata = new FormData();
      formdata.append("file", img);
      const res = await axios.post("upload", formdata);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleclick = async (e) => {
    e.preventDefault();
    const imgurl = await upload();
    console.log(imgurl)
    try {
      state? await axios.put(`/posts/${state.id}`,{
        title,desc:value,cat,img:img? imgurl:state.img
      }):await axios.post(`/posts`,{
        title,desc:value,cat,img:img? imgurl:"", date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      })
      // console.log('sucs')
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  console.log(value);
  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          name="title"
          value = {title}
          onChange={(e) => settitle(e.target.value)}
        ></input>
        <div className="editorcontainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setvalue}
          ></ReactQuill>
        </div>
      </div>
      <div className="menu">
        {/* <div className="item">
          <h1>Publish</h1>
          <span>
            Status: <b>Draft</b>
          </span>
          <span>
            Visibility: <b>Public</b>
          </span>
          <input type="file" id="file" style={{ display: "none" }} />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as Drafts</button>
            <button>Update</button>
          </div>
        </div> */}
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setimg(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons"> 
            <button>Save as a draft</button>
            <button onClick={handleclick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="art"
              id="art" checked = {cat === "art"}
              onChange={(e) => setcat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="Science"
              id="Science" checked = {cat === "Science"}
              onChange={(e) => setcat(e.target.value)}
            />
            <label htmlFor="Science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="technology"
              value="technology"
              id="technology" checked = {cat === "technology"}
              onChange={(e) => setcat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cinema"
              value="cinema"
              id="cinema" checked = {cat === "cinema"}
              onChange={(e) => setcat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="food"
              value="food"
              id="food" checked = {cat === "food"}
              onChange={(e) => setcat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="general"
              value="general"
              id="general" checked = {cat === "general"}
              onChange={(e) => setcat(e.target.value)}
            />
            <label htmlFor="general">general</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
