import { Skeleton } from 'antd'
import React from 'react'
import CardProductComponent from '../../../../components/CardProductComponent'

export default function SimilarProductsCompponents() {
  return (
    <Skeleton className="gkchWemBrr" loading={false} active paragraph={{ rows: 4 }}>
      <div className='FxxLXoJofl'>
      <CardProductComponent image={"album/product/product-1.jpg.webp"} />
      <CardProductComponent image={"album/product/product-1.jpg.webp"} />
      <CardProductComponent image={"album/product/product-1.jpg.webp"} />
      <CardProductComponent image={"album/product/product-1.jpg.webp"} />
      <CardProductComponent image={"album/product/product-1.jpg.webp"} />
      <CardProductComponent image={"album/product/product-1.jpg.webp"} />
      </div>
    </Skeleton>

  )
}
