import React from "react";
import "./Add.css";

const options = [
  { value: "one", label: "One" },
  { value: "two", label: "Two", className: "myOptionClassName" },
  {
    type: "group",
    name: "group1",
    items: [
      { value: "three", label: "Three", className: "myOptionClassName" },
      { value: "four", label: "Four" },
    ],
  },
  {
    type: "group",
    name: "group2",
    items: [
      { value: "five", label: "Five" },
      { value: "six", label: "Six" },
    ],
  },
];
const defaultOption = options[0];

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 50, //null,
      //other properties
      file_url: null,
      images: "",
      imageName: null,
      imageSource: null,
      isUploading: false,
      isUploaded: false,
      mainImage: "image",
      jsonResponse: {},
      type: "",
      name: "",
      location: "",
      area: "", //null,
      year: "",
      file: "",
      adminId: "",
      adminPassword: "",
      ID: null,
      year: new Date(),
      //other properties
    };
    //this.onChange = this.onChange.bind(this);
  }

  async fetchImage(data) {
    var url = "https://arabex-server.herokuapp.com/file_upload";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },

      body: data,
      credentials: "include",
    });
    const body = await response.text();
  }
  componentDidMount() {
    /* var urlll = "https://arabex-server.herokuapp.com/redirectPage/";
 
         fetch(urlll, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
             },
 
             body: "data"
         }).then(res => JSON.stringify(res))
         .then(res =>alert(res));
         ;
     }*/
  }
  handleImg = (e) => {
    let file = e.target.files[0];
    this.setState({ file: file });
    // this.fetchImage(file);
  };

  mySubmitHandler() {
    // if (!this.state.imageSource) return;
    //if (!this.isUploading) return;
    console.log("dddd===================dddddddd");

    let url = "https://arabex-server.herokuapp.com/file_upload";
    var imageName = this.state.imageName;
    const data = new FormData();
    data.append("file", this.state.imageSource);
    data.append("imageName", this.state.imageName);
    data.append("id", this.state.ID);
    data.append("type", this.state.type);
    data.append("mainImage", this.state.mainImage);
    data.append("cat_id", this.state.type);

    if (this.state.mainImage.localeCompare("images") == 0) {
      this.state.images += this.state.imageName + ",";
    }
    data.append("images", this.state.images);

    console.log("dddd===================dddddddd");
    console.log(this.state.jsonResponse.id);
    this.setState({ isUploaded: false, isUploading: true });
    fetch(url, {
      method: "post",
      body: data,
    })
      .then((response) => {
        alert(response);
        return response.json();
      })
      .then((json) => {
        this.setState({
          isUploading: false,
          jsonResponse: json,
          isUploaded: true,
        });
      })
      .catch((error) => {
        //success = false;
        console.log(error);
        alert("error:" + error);
        //func_fail.apply(obj,[error]);
        this.setState({ isUploading: false });
      });
  }

  async doFetch() {
    //console.log(this.state);

    var url = "https://arabex-server.herokuapp.com/add_items/:id";
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",

      body: JSON.stringify(this.state),
    });

    this.state.jsonResponse = await response.json();
    this.state.ID = await this.state.jsonResponse.id;
    this.state.images = "";
    console.log("stsID" + this.state.ID);
    alert(this.state.jsonResponse.success);

    this.mySubmitHandler();

    //onsole.log("InsertID"+this.state.ID);
    //console.log(this.state.jsonResponse.insertid);
  }
  handleID = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);

    console.log(e.target.name);
  };
  handleSelectedFile = (event) => {
    try {
      let file = event.target.files[0];
      console.log(event.target.files[0]);
      let file_url = URL.createObjectURL(file);
      this.setState({
        imageName: file.name,
        imageSource: file,
        mainImage: event.target.id,
        file_url: file_url, //for local
        isUploaded: false,
        isUploading: false,
      });
    } catch (err) {
      alert("Error nothing chosen");
    }
    console.log(this.state.mainImage);
  };

  submitInput() {
    // event.preventDefault();
    this.doFetch();
    // this.mySubmitHandler();
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let value = event.target.value;
    console.log(nam);
    this.setState({ [event.target.name]: value });
  };
  ProjectTypeHandler = (event) => {
    let nam = event.target.name;
    console.log(nam);
    this.setState({ type: nam });
    document.getElementById("change").innerText = nam;
  };
  handleDelete = () => {
    let { ID } = { ID: 24 };
    let url = "https://arabex-server.herokuapp.com/item_del/:id";
    fetch(url, {
      method: "DELETE",

      body: JSON.stringify({ ID }),
    }).then((res) => console.log(res));
  };

  addNewAdmin() {
    var adminId = this.state.adminId;
    var adminPassword = this.state.adminPassword;
    let url = "https://arabex-server.herokuapp.com/add_admin/:id/";
    fetch(url, {
      method: "post",

      body: JSON.stringify({ id: adminId, password: adminPassword }),
    })
      .then((res) => res.json)
      .then((r) => alert(r.success));
  }

  onChange2 = (date) => this.setState({ ExpirationDate: date, date: date });
  onChange = (date) => this.setState({ year: date });
  render() {
    let imgServerUr2 =
      "https://arabex-server.herokuapp.com/uplds/" + this.state.imageName;
    let imgServerUrl =
      "https://arabex-server.herokuapp.com/load_image?img=" +
      this.state.imageName +
      "&&type=" +
      this.state.type;
    return (
      <div className="row">
        <div class="form-style-5">
          <p>Enter name:</p>
          {this.state.type}
          <div>
            <div className="inputs">
              <input type="text" name="name" onChange={this.myChangeHandler} />
              <p>Enter Area:</p>

              <input type="text" name="area" onChange={this.myChangeHandler} />
              <p>Enter Location:</p>
              <input
                type="text"
                name="location"
                onChange={this.myChangeHandler}
              />

              <div>
                <p>Enter Year:</p>

                <input
                  name="year"
                  type="text"
                  onChange={this.myChangeHandler}
                />
              </div>
              <div class="row">
                <div class="col-sm">
                  <div class="dropdown">
                    <button className="dropbtn" type="button" id="change">
                      select project type
                    </button>
                    <div class="dropdown-content">
                      <button
                        class="sub_menu"
                        name="Villa"
                        onClick={this.ProjectTypeHandler}
                      >
                        Villa
                      </button>
                      <button
                        class="sub_menu"
                        name="Conservation"
                        onClick={this.ProjectTypeHandler}
                      >
                        Conservation
                      </button>
                      <button
                        class="sub_menu"
                        name="Landscaping"
                        onClick={this.ProjectTypeHandler}
                      >
                        Landscape
                      </button>
                      <button
                        class="sub_menu"
                        name="OFFICE_BUILDINGS"
                        onClick={this.ProjectTypeHandler}
                      >
                        OFFICE BUILDINGS
                      </button>
                      <button
                        class="sub_menu"
                        name="INTERIOR_DESIGN"
                        onClick={this.ProjectTypeHandler}
                      >
                        INTERIOR DESIGN
                      </button>
                      <button
                        class="sub_menu"
                        name="PUBLIC"
                        onClick={this.ProjectTypeHandler}
                      >
                        PUBLIC
                      </button>
                      <button
                        class="sub_menu"
                        name="EDUCATIONAL"
                        onClick={this.ProjectTypeHandler}
                      >
                        EDUCATIONAL
                      </button>
                      <button
                        class="sub_menu"
                        name="INDUSTRIAL"
                        onClick={this.ProjectTypeHandler}
                      >
                        {" "}
                        INDUSTRIAL
                      </button>
                    </div>
                  </div>
                  <div class="col-sm">
                    <p>insert main image</p>
                    <input
                      type="file"
                      name="file"
                      id="image"
                      onChange={this.handleSelectedFile}
                    />

                    {this.state.imageName && this.state.isUploaded && (
                      <img
                        src={encodeURI(imgServerUrl)}
                        style={{ width: 200, height: 120 }}
                      />
                    )}
                    <img
                      src={this.state.file_url}
                      style={{ width: 200, height: 120 }}
                    />

                    <button
                      type="button"
                      onClick={() => {
                        this.submitInput();
                      }}
                    >
                      add main image and info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p>insert other images</p>
            <input
              type="file"
              name="file"
              id="images"
              onChange={this.handleSelectedFile}
            />
            {this.state.mainImage}
            {this.state.imageName && this.state.isUploaded && (
              <img
                src={encodeURI(imgServerUrl)}
                style={{ width: 200, height: 120 }}
              />
            )}
            <img
              src={this.state.file_url}
              style={{ width: 200, height: 120 }}
            />
            <button type="button" onClick={() => this.mySubmitHandler()}>
              add extra images
            </button>
          </div>
        </div>

        <div class="form-style-5">
          <p>Enter Admin ID</p>
          <input type="text" name="adminId" onChange={this.myChangeHandler} />

          <p>Enter admin password:</p>
          <input
            type="text"
            name="adminPassword"
            onChange={this.myChangeHandler}
          />
          <button type="button" onClick={() => this.addNewAdmin()}>
            add new admin
          </button>
          <button onClick={this.handleDelete}>DELETE</button>
        </div>
      </div>
    );
  }
}
export default Add;
