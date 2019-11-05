import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolio: [],
    sort: null,
    filter: null
  }

  componentDidMount() {
    this.fetchStocks();
  }

  render() {
    let displayStocks = this.state.stocks;
    if (this.state.filter !== null) {
      displayStocks = displayStocks.filter(stock => stock.type === this.state.filter)
    }

    let sortFn;
    switch (this.state.sort) {
      case 'Alphabetically':
        sortFn = (a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
        break;
      case 'Price':
        sortFn = (a, b) =>  a.price - b.price
        break;
      default:
    }

    displayStocks.sort(sortFn);

    return (
      <div>
        <SearchBar onFilter={this.filterStocks} onSort={this.sortStocks} sort={this.state.sort} filter={this.state.filter} />

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={displayStocks} onAddStock={this.addStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.portfolio} onRemoveStock={this.removeStock} />

            </div>
          </div>
      </div>
    );
  }

  fetchStocks = () => {
    fetch('http://localhost:3000/stocks')
    .then(resp => resp.json())
    .then(json => {
      this.setState({ stocks: json})
    })
  }

  addStock = stock => {
    this.setState(prevState => {
      if (!prevState.portfolio.includes(stock))
        prevState.portfolio.push(stock)

      return { 
        ...prevState.stocks,
        ...prevState.portfolio
      }
    })
  }

  removeStock = removeStock => {
    this.setState(prevState => {
      return { 
        ...prevState.stocks,
        portfolio: prevState.portfolio.filter(stock => removeStock !== stock)
      }
    })
  }

  sortStocks = e => {
    let sortValue = e.target.value
    this.setState(prevState => {
      return {
        ...prevState.stocks,
        ...prevState.portfolio,
        sort: sortValue
      }
    })
  }

  filterStocks = e => {
    let filterValue = e.target.value
    this.setState(prevState => {
      return {
        ...prevState.stocks,
        ...prevState.portfolio,
        filter: filterValue
      }
    })
  }

}

export default MainContainer;
