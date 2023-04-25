const BestRated = () => {
    return(
      <div className="py-2 pl-1 pr-4 md:pl-4 md:pr-1 rounded-br-full md:rounded-br-none md:rounded-bl-full bg-[#D4AF37] absolute z-40 top-0 left-0 md:left-auto md:right-0 text-white text-sm" >Top rated</div>
    )
}

const LowestPrice = () => {
    return(
      <div className="py-1 px-2 bg-[#228B22] rounded absolute z-40 bottom-2 right-2 text-white text-sm">Lowest price</div>
    )
}

export {BestRated, LowestPrice}