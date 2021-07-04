import React from 'react';
import './RateButton.css';

// The RateButton component creates a like, dislike or neutral button for matching.
export default class RateButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentImage: props.imageSrc };
    }

    render() {
        return (
            <input
                className='rateButton'
                type='image'
                src={this.state.currentImage}
                onClick={this.props.onClick}
                onMouseOver={() => this.setState({ currentImage: this.props.selectedImageSrc })}
                onMouseOut={() => this.setState({ currentImage: this.props.imageSrc })}
                alt=''
            >
            </input>
        );
    }
}
