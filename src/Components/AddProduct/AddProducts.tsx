
import React from 'react';
import { FormEvent, useRef, useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom';
import { firebaseCollectionName, fs, storage, storageFolder } from '../../config/Config';
import { IProduct } from '../../Models/IProduct';
import { NavBar } from '../Navbar';

export function AddProducts() {

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const [selectFile, setSelectFile] = useState<File>();

  const [isDisabledSubmit, setIsDisabledSubmit] = useState<boolean>(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [progress, setProgress] = useState<number | null>(null);



  const setErrorMsg = (title: string) => {
    setSuccess('');
    setProgress(null);
    setError(title);
  }


  const setSuccessMsg = (title: string) => {
    setError('');
    setProgress(null);
    setSuccess(title);
    titleRef.current!.value = '';
    descriptionRef.current!.value = '';
    priceRef.current!.value = '';
  }




  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isDisabledSubmit == true) return;
    await setIsDisabledSubmit((prev) => true);
    const title = titleRef.current!.value;
    const description = descriptionRef.current!.value;
    const price = priceRef.current!.value;


    const uploadTask = storage.ref(`${storageFolder.imageFolder}/${selectFile?.name}`).put(selectFile as Blob);
    uploadTask.on('state_changed', snapshot => {
      const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);
    }, error => {
      setErrorMsg(`Img doesn't upload`);
    },
      () => {
        storage.ref(`${storageFolder.imageFolder}`).child(`${selectFile?.name}`).getDownloadURL()
          .then((url) => {
            const productJson = new IProduct(title, description, Number(price), url).toJson();
            fs.collection(`${firebaseCollectionName.products}`).add(productJson);
            setSuccessMsg(`Product (${title}) add !!!`);
            setIsDisabledSubmit(false);
          })
          .catch(err => {
            setErrorMsg('Img uploaded but not get url');
            console.log(err + ' ' + 'download url');
          });
      }

    )


  }



  return (
    <>
      <NavBar />
      <Container>
        <h1>ADD PRODUCTS</h1>
        <hr />
        <br />
        {error &&
          (
            <Alert variant="danger">{error}</Alert>
          )
        }
        {success &&
          (
            <Alert variant="success">{success} <Link to={'/'}>Home</Link></Alert>
          )
        }
        {
          progress != null &&
          (
            <Alert variant="info">It is Progress upload : {progress}</Alert>
          )
        }
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Title</Form.Label>
            <Form.Control ref={titleRef} type="text" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Product Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Product Price</Form.Label>
            <Form.Control ref={priceRef} type="number" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="upload">
            <Form.Label>Upload Product Image</Form.Label>
            <Form.Control onChange={(event) => setSelectFile((event!.target as HTMLInputElement)!.files![0])} type="file" required accept="image/png, image/jpeg" />
          </Form.Group>
          <Button disabled={isDisabledSubmit} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>

  )
}