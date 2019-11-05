import React from 'react'

const Stock = (props) => {
  return (
    <React.Fragment>
      <div className="card" onClick={() => props.handleClick(props.stock)}>
        <div className="card-body">
          <h5 className="card-title">
            {props.stock.name}
          </h5>
          <p className="card-text">
          {props.stock.ticker}: {props.stock.price}
          </p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Stock
