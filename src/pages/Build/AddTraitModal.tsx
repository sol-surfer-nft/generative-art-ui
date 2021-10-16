// Write a functional react component that renders a reactstrap modal.
// The modal should have an input field and a button.
// When the button is clicked, the input field value should be added to the list of traits.
// The modal should be closed when the button is clicked.
// The modal should not be closed when the user clicks the backdrop.

import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import getCroppedImg, { generateDownload } from "./image-utils";
import { dataURLtoFile } from "./dataURLtoFile";
import Cropper from "react-easy-crop";

interface Props {
  isOpen: boolean
  toggle: any
  addTrait: (data: AddTraitData) => void
}

export interface AddTraitData {
  name: string
  rarity: number
  order?: number
  file?: any
}

const initialData = {
  name: "",
  rarity: 0,
  order: 0,
  file: null
}

export const AddTraitModal = ({
  isOpen,
  toggle,
  addTrait
}: Props) => {
  const [trait, setTrait] = useState<AddTraitData>(initialData);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);

  const [image, setImage] = useState<any>(null)

  const [imageFile, setImageFile] = useState<null | File>(null)

  // useEffect(() => {
  //   const getImage = async () => {
  //     // get image / convert it
  //     // let photoResult;
  //     // photoResult.src = "data:image/png;base64," + encodeImage(data.data.Body)
  //     let url = await imageToUrl();
  //     console.log('image url:', url)
  //     setImageFile(url);
  //   }

  //   if(image)
  //     getImage();
  // }, [image])

  useEffect(() => {
    if(!isOpen) {
      closeForm();
    }
  }, [isOpen])

  const onCropComplete = (croppedAreaPercentage: any, croppedAreaPixels: any) => {
		setCroppedArea(croppedAreaPixels);
	};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrait(prevTrait => ({
      ...prevTrait,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = () => {
    console.log('submitting form')
    setErrors(null)

    // validate trait data
    if(!trait.name)
      setErrors("Trait needs a name")
    else if(!trait.rarity)
      setErrors("Trait needs a rarity")
    else if(!image)
      setErrors("Trait needs an image file")
    
    if(errors) return;

    // add trait data
    addTrait({...trait, file: image });
  }

  const onSelectFile = (event: any) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(reader.result);
        console.log('reader result:', reader.result)
			});
		}
	};

  const onDownload = () => {
		if (!image) {
			setErrors("No image available to download")
      return; 
    }

		generateDownload(image, croppedArea);
	};

  const imageToUrl = async (fileType = "image/jpeg") => {
    let fileName = "cropped-image"
    const canvas = await getCroppedImg(image, croppedArea);
		const canvasDataUrl = canvas.toDataURL(fileType);
		const convertedUrlToFile = dataURLtoFile(
			canvasDataUrl,
			fileName + fileType.split("/")[1]
		);
		console.log(convertedUrlToFile);
    return convertedUrlToFile;
  }

  const closeForm = () => {
    setTrait(initialData);
    setErrors(null)
    setLoading(false)
    clearImage()
    toggle();
  }

  const clearImage = () => {
    setImage(null)
    setImageFile(null)
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Trait</ModalHeader>
      <ModalBody>
        {errors && <p className="error-text">{errors.toString()}</p>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Name</Label>
            <Input autoFocus type="text" name="name" id="add-trait-name" placeholder="Name of Trait" value={trait.name} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Rarity</Label>
            <Input type="number" name="rarity" id="add-trait-rarity" placeholder="Rarity of Trait" value={trait.rarity} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label>Order</Label>
            <Input type="number" name="order" id="add-trait-order" placeholder="Order of Trait" value={trait.order} onChange={handleChange} />
          </FormGroup>
          <FormGroup style={{marginTop: 20}}>
            <Label>Image File: </Label>
            <Input type="file" name="file" id="add-trait-file" placeholder="background.jpeg" value={trait.file} onChange={onSelectFile} accept="image/*" />
          </FormGroup>
          {image && (
            <div className="image-container" style={{padding: 20, marginTop: 20, marginBottom: 10}}>
              <img src={image.src} alt="image to be uploaded" height={300} width={300} />
            </div>
          )}
          {image && (
            <>
              <div className='cropper'>
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              <div className='slider'>
                <Input type="range" name="range" id="exampleRange" />
                {/* <Slider
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e, zoom) => setZoom(zoom)}
                  color='secondary'
                /> */}
              </div>
            </>
          )}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => handleSubmit()}>
          Add
        </Button>
        <Button color="secondary" onClick={closeForm}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
