import React, { useEffect, useState } from 'react';
import './Add.css';

const Projectcat_idDropdown = ({ onSelect }) => {
    const projectcat_ids = [
        "Villa", "Conservation", "Landscaping", "OFFICE_BUILDINGS",
        "INTERIOR_DESIGN", "PUBLIC", "EDUCATIONAL", "INDUSTRIAL"
    ];

    return (
        <div className="dropdown">
            <button className="dropbtn" id="change">Select project cat_id</button>
            <div className="dropdown-content">
                {projectcat_ids.map(cat_id => (
                    <button
                        key={cat_id}
                        className="sub_menu"
                        name={cat_id}
                        onClick={() => onSelect(cat_id)}
                    >
                        {cat_id}
                    </button>
                ))}
            </div>
        </div>
    );
};

const ImageUploader = ({ onFileSelect, imageName, fileUrl, isUploaded, imgServerUrl }) => (
    <div className="col-sm">
        <p>Insert main image</p>
        <input cat_id="file" name='file' id='image' onChange={onFileSelect} />

        {imageName && isUploaded && (
            <img src={encodeURI(imgServerUrl)} style={{ width: 200, height: 120 }} alt="Uploaded" />
        )}

        <img src={fileUrl} style={{ width: 200, height: 120 }} alt="Selected" />
    </div>
);

const AdminForm = ({ onChange, onSubmit, onDelete }) => (
    <div className="form-style-5">
        <p>Enter Admin ID</p>
        <input cat_id='text' name='adminId' onChange={onChange} />

        <p>Enter Admin Password</p>
        <input cat_id='text' name='adminPassword' onChange={onChange} />

        <button cat_id="button" onClick={onSubmit}>Add New Admin</button>
        <button onClick={onDelete}>DELETE</button>
    </div>
);

const Add = () => {
    const [state, setState] = useState({
        age: 50,
        file_url: null,
        images: "",
        imageName: null,
        imageSource: null,
        isUploading: false,
        isUploaded: false,
        mainImage: "image",
        jsonResponse: {},
        cat_id: "",
        name: "",
        location: "",
        area: "",
        year: new Date(),
        file: "",
        adminId: "",
        adminPassword: "",
        id: null,
    });

    useEffect(() => {
        // Initial setup or data fetching can go here
    }, []);

    const handleFileSelect = (e) => {
        try {
            let file = e.target.files[0];
            let file_url = URL.createObjectURL(file);
            setState(prevState => ({
                ...prevState,
                imageName: file.name,
                imageSource: file,
                mainImage: e.target.id,
                file_url,
                isUploaded: false,
                isUploading: false
            }));
        } catch (err) {
            alert("Error: nothing chosen");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleProjectcat_idSelect = (cat_id) => {
        setState(prevState => ({
            ...prevState,
            cat_id
        }));
        document.getElementById("change").innerText = cat_id;
    };

    const handleImageUpload = async () => {
        const url = "https://arabex-server.herokuapp.com/file_upload";
        const data = new FormData();
        data.append("file", state.imageSource);
        data.append("imageName", state.imageName);
        data.append('id', state.ID);
        data.append('cat_id', state.cat_id);
        data.append('mainImage', state.mainImage);

        if (state.mainImage.localeCompare("images") === 0) {
            state.images += `${state.imageName},`;
        }
        data.append("images", state.images);

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: data
            });

            const json = await response.json();
            setState(prevState => ({
                ...prevState,
                isUploading: false,
                jsonResponse: json,
                isUploaded: true
            }));

        } catch (error) {
            console.error(error);
            alert("Error: " + error);
            setState(prevState => ({ ...prevState, isUploading: false }));
        }
    };

    const addProjectToApi = async() => {
        alert('eeeeeeeee')
        const url = "http://localhost:9999/add_project/";
        try {
            const response = await fetch(url, {
                method: 'PUT',
                credentials: 'same-origin',
                body: JSON.stringify(state),
            });
alert('[[[[[[[[-------   '+response)
            // const jsonResponse = await response.json();
            // setState(prevState => ({
            //     ...prevState,
            //     jsonResponse,
            //     ID: jsonResponse.id,
            //     images: ""
            // }));

            // alert(JSON.stringify(jsonResponse) );
            // handleImageUpload();

        } catch (error) {
            alert('ERRROR::   '+ error)
            console.error("Error submitting form: ", error);
        }
    }
    const handleSubmit = async () => {
        const url = "https://arabex-server.herokuapp.com/add_items/:id";
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-cat_id': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify(state),
            });

            const jsonResponse = await response.json();
            setState(prevState => ({
                ...prevState,
                jsonResponse,
                ID: jsonResponse.id,
                images: ""
            }));

            alert(jsonResponse.success);
            handleImageUpload();

        } catch (error) {
            console.error("Error submitting form: ", error);
        }
    };

    const handleDelete = async () => {
        const { ID } = state;
        const url = `https://arabex-server.herokuapp.com/item_del/${ID}`;
        try {
            await fetch(url, {
                method: "DELETE",
                body: JSON.stringify({ ID })
            });
            console.log("Deleted successfully");
        } catch (error) {
            console.error("Error deleting item: ", error);
        }
    };

    const addNewAdmin = async () => {
        const { adminId, adminPassword } = state;
        const url = `https://arabex-server.herokuapp.com/add_admin/${adminId}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({ id: adminId, password: adminPassword })
            });

            const result = await response.json();
            alert(result.success);

        } catch (error) {
            console.error("Error adding new admin: ", error);
        }
    };

    const imgServerUrl = `https://arabex-server.herokuapp.com/load_image?img=${state.imageName}&&cat_id=${state.cat_id}`;

    return (
        <div className='row'>
            <div className="form-style-5">
                <p>Enter Name:</p>
                <input cat_id='text' name='name' onChange={handleChange} />

                <p>Enter Area:</p>
                <input cat_id='text' name='area' onChange={handleChange} />

                <p>Enter Location:</p>
                <input cat_id='text' name='location' onChange={handleChange} />

                <p>Enter Year:</p>
                <input name='year' cat_id='text' onChange={handleChange} />

                <Projectcat_idDropdown onSelect={handleProjectcat_idSelect} />

                <ImageUploader
                    onFileSelect={handleFileSelect}
                    imageName={state.imageName}
                    fileUrl={state.file_url}
                    isUploaded={state.isUploaded}
                    imgServerUrl={imgServerUrl}
                />

                <button cat_id="button" onClick={addProjectToApi}>Add Main Image and Info</button>
            </div>

            <div className="form-style-5">
                <AdminForm onChange={handleChange} onSubmit={addNewAdmin} onDelete={handleDelete} />
            </div>
        </div>
    );
};

export default Add;
