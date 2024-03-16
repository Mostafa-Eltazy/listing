import React from 'react'
import Skeleton from 'react-loading-skeleton'

interface Props {
    numberOfRows:number;
}
const GenericPlacholder = ({numberOfRows}:Props) => {
  return (
    <Skeleton count={numberOfRows}/>
  )
}

export default GenericPlacholder