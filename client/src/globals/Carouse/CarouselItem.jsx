
 const CarouselItem = (props) => {
    const {imageUrl} = props;
    return(
    <div>
        <img src={imageUrl} />
    </div>
    )
}

export default CarouselItem;