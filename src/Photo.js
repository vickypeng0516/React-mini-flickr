import React from 'react';
import './app.css';

class Photo extends React.Component {
    constructor(){
        super();
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.handlePinClick = this.handlePinClick.bind(this);

        this.state = {
            mounted : false,
            isHovering : false,
            pinned : false
        };
    }
    // if component 加载完成， setstate
    componentDidMount(){
        this.setState({ mounted : true});
    }
    // change mouse hover state
    handleMouseHover(){
        this.setState(this.toggleHoverState);
    }
    // flip hovering state
    toggleHoverState(state){
        return {
            isHovering : !state.isHovering
        };
    }

    handlePinClick(){
        var currentPinStatus = this.state.pinned;
        //如果还没有赋值，set pinned to true
        if(currentPinStatus == null){
            this.setState({
                pinned : true
            });
        }// else flip the state
        else{
            this.setState({pinned : !this.state.pinned});
        }
    }
    render(){
        var photo = this.props.data;
        if(photo && (this.props.showAll || this.state.pinned) &&
        (this.props.keyword == '' || photo.title.includes(this.props.keyword))){
            let id = photo.id;
            let source = photo.src;
            let title = `${photo.title}`;
            let tags = `${photo.tags}`;

            return (
                // HTML CODE
                <div className = "image-element-class grid-item">
                    <div class="a-card" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
                        <a href={source} key={id} target="_blank" className="imageBox">
                            <img src={source} alt={title} className="photoImage" />
                        </a>
                        <h3>{title}</h3>
                        <div class="a-card-tags">
                            Tags: {tags}
                        </div>
                        <div class="a-card-pin">
                            <img src={require("./pushpin-64.png")} class="a-card-pin-icon" 
                            style= {{display : (this.state.isHovering || this.state.pinned ? 'block' : 'none')}}
                            onClick={this.handlePinClick} />
                        </div>
                    </div>
                </div>

            );
        }else {
            return <div></div>;
        }
    }
};

export default Photo;