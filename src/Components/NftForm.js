import { useState } from 'react';
import { useGlobalContext } from '../context/appContext';
import Alert from './Alert';
import axios from 'axios';

export default function NftForm() {
  const { showAlert } = useGlobalContext;
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [values, setValues] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Other',
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
      reader.onerror = () => {
        console.error('Cannot read image file');
      };
    } else {
      setPreviewSource('');
    }
  };

  const uploadImage = async (base64EncodedImage) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { title, description, price, category } = values;
    try {
      await axios.post(
        'http://localhost:3001/nfts/',
        {
          image: base64EncodedImage,
          title,
          category,
          description,
          price,
          username: user.username,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccessMsg('NFT uploaded successfully');
      setFileInputState('');
      setPreviewSource('');
    } catch (err) {
      console.error(err);
      setErrMsg('NFT upload failed!');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error('Something went wrong');
    };
    setValues({ title: '', description: '', price: '', category: '' });
  };

  return (
    <>
      {showAlert && <Alert msg={errMsg} type="danger" />}
      <Alert msg={successMsg} type="success" />
      <form className="mt-14 w-full flex flex-col items-center md:mt-20 md:w-2/4 lg:w-2/6" onSubmit={onSubmit}>
        <label className="mb-3">
          <b>NFT image</b>
        </label>
        {previewSource && <img src={previewSource} alt="" className="mb-7 h-56 w-56" />}
        <input id="fileInput" type="file" name="image" onChange={handleFileInput} value={fileInputState} className="mb-3 h-10" required />
        <label>
          <b>NFT title</b>
        </label>
        <input
          type="text"
          placeholder="Enter NFT title"
          name="title"
          value={values.title}
          onChange={handleChange}
          className="pl-4 mb-7 h-10 w-full border outline-none rounded-md"
          required
        />

        <label>
          <b>NFT category</b>
        </label>
        <select onChange={handleChange} name="category" className="pl-4 mb-7 h-10 w-full border outline-none rounded-md">
          <option value="Other">Select NFT category</option>
          <option value="Memes">Memes</option>
          <option value="Funny">Funny</option>
          <option value="Renders">Renders</option>
          <option value="Other">Other</option>
        </select>

        <label>
          <b>NFT description</b>
        </label>
        <input
          type="text"
          name="description"
          value={values.description}
          onChange={handleChange}
          className="pl-4 mb-7 h-10 w-full border outline-none rounded-md"
          placeholder="Enter NFT description"
          required
        />
        <label>
          <b>NFT price</b>
        </label>
        <input
          type="number"
          name="price"
          value={values.price}
          onChange={handleChange}
          className="pl-4 mb-9 h-10 w-full border outline-none rounded-md"
          placeholder="Enter NFT price"
          required
        />
        <button type="submit" className="w-40 text-white bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          Create
        </button>
      </form>
    </>
  );
}
