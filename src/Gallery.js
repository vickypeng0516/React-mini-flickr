import * as React from 'react';
import Masonry from  'react-masonry-component';
import Photo from './Photo';

const masonryOption = {
    transitionDuration : 0
}

class Gallery extends React.Component {
    render(){
        const showAll = this.props.showAll;
        const keyword = this.props.keyword;
        // this.props.elements.map, react method
        // 建photo object对object做mapping映射
        const childElements = this.props.elements.map(function(elements){
           return (<Photo data={element} showAll={showAll} keyword={keyword} />
           );
        });
        return (
            //对 masonry初始化
            <Masonry className={'my-gallery-class'} 
            elementType = {'div'}
            options= {masonryOption} 
            disableImageLoaded={false}
            updateOnEachImageLoad={false}>
                {childElements}
            </Masonry>
        );
    }
}