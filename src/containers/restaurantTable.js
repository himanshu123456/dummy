import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, SortIndicator, SortDirection, InfiniteLoader } from 'react-virtualized';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import ActionGrade from 'material-ui/svg-icons/action/grade';
//import custom components
//import actions and configs
import { setReducer } from '../actions/index';

const columnWidth = [250, 240, 140, 120, 140, 160, 130];
let containerWidth = 0;

columnWidth.forEach(function(r) {
  containerWidth += r;
})


class RestaurantTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onLine: true,
      scrollTop: 0
    }
    this.cellRenderer = this.cellRenderer.bind(this);
    this.columnWidth = this.columnWidth.bind(this);
    this.isRowLoaded = this.isRowLoaded.bind(this);
    this.loadMoreRows = this.loadMoreRows.bind(this);
    this._onSectionRendered = this._onSectionRendered.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.restaurants == this.props.restaurants)
      return;
    this.props.setReducer({
      type: 'LOADER_HIDE'
    });
    this.state.isLoading = false
    if (nextProps.restaurants.error) {
      console.log("error");
      this.setState({
        onLine: false,
        isLoading: false
      });
      this.props.setReducer({
        type: 'SNACK',
        text: 'Network Error! Kindly check your network  :('
      });
      return;
    }
    this.state.onLine = true;
    if (nextProps.restaurants.isNew) {
      this.state.scrollTop = 0;
    }
  }

  isRowLoaded({index}) {
    return !!this.props.restaurants.restaurants[index];
  }

  loadMoreRows({startIndex, stopIndex}) {
    console.log("loade");
  }

  renderTitles() {
    return (
      <div style={{
        height: '3.2rem',
        width: containerWidth,
        display: 'flex',
        borderBottom: '1px solid #e0e0e0',
        boxSizing: 'border-box',
        boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
      }}>
      <div style={{
        width: columnWidth[0],
        textAlign: 'center',
        borderRight: '1px solid #e0e0e0',
        boxSizing: 'border-box',
      }}/>
      <div style={{
        width: columnWidth[1],
        textAlign: 'center',
        borderRight: '1px solid #e0e0e0',
        boxSizing: 'border-box',
        lineHeight: '3rem',
        fontSize: '1rem',
        fontWeight: 500
      }}>NAME</div>
      <FlatButton style={{
        width: columnWidth[2],
        textAlign: 'center',
        borderRight: '1px solid #e0e0e0',
        boxSizing: 'border-box',
        height: '3rem',
        lineHeight: '3rem',
        fontWeight: 500
      }}
      onTouchTap={() => {
        this.props.setReducer({
          type: 'QUERY_RESTAURANT_SORT',
          sort: 'cost',
          order: (this.props.sort && this.props.sort == 'cost') ? (this.props.order == 'desc' ? 'asc' : 'desc') : 'asc'
        });
      }}
      >AVG COST FOR TWO
      {this.props.sort && this.props.sort == 'cost'
        ? <div style={{
          top: '50%',
          position: 'absolute',
          right: '1px',
          transform: 'translateY(-50%)',
          lineHeight: 0
        }} ><SortIndicator sortDirection={this.props.order == 'asc' ? SortDirection.ASC : SortDirection.DESC}/></div>
        : ''}</FlatButton>
      <FlatButton style={{
        width: columnWidth[3],
        textAlign: 'center',
        borderRight: '1px solid #e0e0e0',
        boxSizing: 'border-box',
        height: '3rem',
        lineHeight: '3rem',
        fontWeight: 500
      }}
      onTouchTap={() => {
        this.props.setReducer({
          type: 'QUERY_RESTAURANT_SORT',
          sort: 'rating',
          order: (this.props.sort && this.props.sort == 'rating') ? (this.props.order == 'desc' ? 'asc' : 'desc') : 'asc'
        });
      }}
      >RATING
       {this.props.sort && this.props.sort == 'rating'
        ? <div style={{
          top: '50%',
          position: 'absolute',
          right: '1px',
          transform: 'translateY(-50%)',
          lineHeight: 0
        }} ><SortIndicator sortDirection={this.props.order == 'asc' ? SortDirection.ASC : SortDirection.DESC}/></div>
        : ''}
      </FlatButton>
      <div style={{
        width: columnWidth[4],
        textAlign: 'center',
        borderRight: '1px solid #e0e0e0',
        boxSizing: 'border-box',
        lineHeight: '3rem',
        fontSize: '1rem',
        fontWeight: 500
      }}>ADDRESS</div>
      <div style={{
        width: columnWidth[5],
        textAlign: 'center',
        borderRight: '1px solid #e0e0e0',
        boxSizing: 'border-box',
        lineHeight: '3rem',
        fontSize: '1rem',
        fontWeight: 500
      }}>CUISINES</div>
      <div style={{
        width: columnWidth[6],
        textAlign: 'center',
        lineHeight: '3rem',
        fontSize: '1rem',
        fontWeight: 500
      }}>LINK</div>
      </div>
    )
  }

  columnWidth({index}) {
    return columnWidth[index];
  }

  cellRenderer({columnIndex, key, rowIndex, style}) {
    if (columnIndex === 0) {
      return this._renderLeftSideCell({
        columnIndex,
        key,
        rowIndex,
        style
      })
    } else {
      return this._renderBodyCell({
        columnIndex,
        key,
        rowIndex,
        style
      })
    }
  }

  _renderLeftSideCell({columnIndex, key, rowIndex, style}) {
    return <div
      key={key}
      style={{
        ...style,
        borderRight: '1px solid #e0e0e0',
        borderBottom: '1px solid #e0e0e0',
        boxSizing: 'border-box',
        background: `url(${this.props.restaurants.restaurants[rowIndex][columnIndex] ? this.props.restaurants.restaurants[rowIndex][columnIndex] : './images/noimg.png'})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}/>
  }

  _renderBodyCell({columnIndex, key, rowIndex, style}) {
    let view;
    switch (columnIndex) {
      case 1:
        view = <div className='center' style={{
          fontSize: '2rem'
        }}>{this.props.restaurants.restaurants[rowIndex][columnIndex]}</div>
        break;
      case 2:
        view = <div className='center'  style={{
          fontSize: '2rem'
        }}>RS.{this.props.restaurants.restaurants[rowIndex][columnIndex]}</div>
        break;
      case 3:
        view = <div className='center' style={{
          fontSize: '2rem',
          display: 'flex'
        }}><ActionGrade color="gold"/><div>{this.props.restaurants.restaurants[rowIndex][columnIndex]}</div></div>
        break;
      case 4:
        view = <div className='center' style={{
          fontSize: '1.2rem'
        }}>{this.props.restaurants.restaurants[rowIndex][columnIndex]}</div>
        break;
      case 5:
        view = <div className='center' style={{
          fontSize: '1.2rem'
        }}>{this.props.restaurants.restaurants[rowIndex][columnIndex]}</div>
        break;
      case 6:
        view = <a className='center' href={this.props.restaurants.restaurants[rowIndex][columnIndex]} target="_blank">VISIT PAGE ></a>
        break;
    }
    return (
      <div
      key={key}
      style={{
        ...style,
        borderRight: '1px solid #e0e0e0',
        borderBottom: '1px solid #e0e0e0',
        overflow: 'auto',
        boxSizing: 'border-box',
        textAlign: 'center'
      }}
      >
          {view}
        </div>
    )
  }
  _onSectionRendered({columnStartIndex, columnStopIndex, rowStartIndex, rowStopIndex}) {
    const columnCount = 7;
    const startIndex = rowStartIndex * columnCount + columnStartIndex
    const stopIndex = rowStopIndex * columnCount + columnStopIndex

    console.log({
      startIndex: rowStartIndex,
      stopIndex: rowStopIndex
    });
    //100 is api limit
    if (!this.state.isLoading && rowStartIndex > this.props.restaurants.restaurants.length - 8 && this.props.restaurants.restaurants.length < 100) {
      console.log(this.props.restaurants.start);
      this.props.setReducer({
        type: 'QUERY_RESTAURANT_SKIP',
        start: this.props.restaurants.start + 20
      });
      this.setState({
        isLoading: true
      });
    }

    this._onRowsRendered({
      startIndex: rowStartIndex,
      stopIndex: rowStopIndex
    })
  }


  render() {
    return (
      <div style={{
        position: 'absolute',
        top: '5.6rem',
        bottom: '0.1rem',
        width: window.innerWidth < containerWidth ? window.innerWidth : containerWidth,
        overflowX: 'auto',
        left: '50%',
        transform: 'translateX(-50%)'
      }}>
      {this.renderTitles()}
      {this.props.restaurants.count != 0 ?
        <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={this.props.restaurants.restaurants.length}
        minimumBatchSize={13}
        >
      {({onRowsRendered, registerChild}) => {
          this._onRowsRendered = onRowsRendered
          return (
            <Grid
            autoContainerWidth={true}
            cellRenderer={this.cellRenderer}
            columnCount={this.props.restaurants.restaurants[0].length}
            columnWidth={this.columnWidth}
            height={window.innerHeight - 90}
            rowCount={this.props.restaurants.restaurants.length}
            ref={registerChild}
            rowHeight={130}
            onSectionRendered={this._onSectionRendered}
            width={containerWidth}
            scrollTop={this.state.scrollTop}
            onScroll={({scrollTop}) => {
              this.state.scrollTop = scrollTop;
            }}
            />
          )
        }}
      </InfiniteLoader>
        : 'NO RESULTS'}
      </div>
    )
  }
}

function mapStateToProps({restaurants}) {
  return {
    restaurants
  };
}

export default connect(mapStateToProps, {
  setReducer
})(RestaurantTable);
