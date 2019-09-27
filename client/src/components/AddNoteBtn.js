import React from "react";

class ImageUpload extends React.Component {

  addNoteHandler = e => {
    e.preventDefault();
    
    fetch('/ocr/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: this.props.uploadedImage
      })
    })
      .then(res => res.json())
      .then(res => this.props.setConvertedTextState(res.message))
      .catch(err => console.log(err))
  }

  _handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onload = (e) => {
        this.props.setImage(reader.result);
    }

    reader.readAsDataURL(file)
  }

  render() {

    let { uploadedImage } = this.props;
    let $imagePreview = null;
    if (uploadedImage) {
      $imagePreview = (<img src={uploadedImage} alt="imageInAddNotebBtn.js" />);
    } else {
      $imagePreview = (<div className="previewText"></div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={this._handleSubmit}>
          <input className="fileInput"
            type="file"
            onChange={this._handleImageChange} />
          <button className="submitButton"
            type="submit"
            onClick={this.addNoteHandler}>Convert Notes</button>

        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}

export default ImageUpload;