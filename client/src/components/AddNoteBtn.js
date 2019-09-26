import React from "react";

class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        uploadedImage: ''
      };
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
      console.log('handle uploading-', this.state.file);
    }

    addNoteHandler = () => {
        console.log(this.state.file)
        fetch('/ocr/convert', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              image: this.state.uploadedImage
            })
        })
            .then(res => res.json())
            .then(res => this.props.setConvertedTextState(res.message))
            .catch(err => console.log(err))
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onload = (e) => {
        this.setState({
          uploadedImage: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    render() {
        
      let {uploadedImage} = this.state;
      let $imagePreview = null;
      if (uploadedImage) {
        $imagePreview = (<img src={uploadedImage} />);
      } else {
        $imagePreview = (<div className="previewText"></div>);
      }
  
      return (
        <div className="previewComponent">
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
            <button className="submitButton" 
              type="submit" 
              onClick={()=>this.addNoteHandler()}>Convert Notes</button>
              
          </form>
          <div className="imgPreview">
            {$imagePreview}
          </div>
        </div>
      )
    }
  }
    
export default ImageUpload;